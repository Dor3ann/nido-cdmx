import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { Listing } from '@/types/listing';

// Allow up to 60 seconds for the web search to complete (Vercel limit)
export const maxDuration = 60;

// Curated apartment interior photos from Unsplash (free to use)
const APARTMENT_PHOTOS = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&w=800&h=500&fit=crop',
];

const SYSTEM_PROMPT =
  'You are a real estate search agent for Mexico City (CDMX). ' +
  'Use your web search tool to find REAL, currently listed rental apartments on ' +
  'Inmuebles24 (inmuebles24.com), Lamudi (lamudi.com.mx), and Vivanuncios (vivanuncios.com.mx). ' +
  'Search in Spanish — use terms like "departamento en renta [colonia]", "estudio en renta [colonia]". ' +
  'CRITICAL: After searching, your ENTIRE final response must be ONLY a raw JSON array. ' +
  'Do NOT write any introductory text, explanations, or prose before or after the array. ' +
  'Do NOT wrap in markdown code fences. Start your response with [ and end with ].';

function buildUserMessage(criteria: Record<string, unknown>): string {
  const lines = ['Search for REAL rental listings matching these criteria:'];

  if (criteria.rentalType) lines.push(`- Rental type: ${criteria.rentalType}`);

  if (criteria.budgetMin || criteria.budgetMax) {
    const cur = criteria.currency ?? 'MXN';
    const min = criteria.budgetMin ? `${cur} ${Number(criteria.budgetMin).toLocaleString()}` : 'any';
    const max = criteria.budgetMax ? `${cur} ${Number(criteria.budgetMax).toLocaleString()}` : 'any';
    lines.push(`- Budget: ${min} – ${max}/month`);
  }

  const hoods = criteria.neighborhoods as string[] | undefined;
  if (hoods && hoods.length > 0) {
    lines.push(`- Neighborhoods: ${hoods.join(', ')}`);
  } else {
    lines.push('- Neighborhoods: anywhere in CDMX');
  }

  if (criteria.bedrooms) lines.push(`- Bedrooms: ${criteria.bedrooms}`);
  if (criteria.furnished && criteria.furnished !== 'either') lines.push(`- Furnished: ${criteria.furnished}`);
  if (criteria.pets && criteria.pets !== 'either') lines.push(`- Pets: ${criteria.pets}`);
  if (criteria.moveIn) lines.push(`- Move-in: ${criteria.moveIn}`);
  if (criteria.notes) lines.push(`- Notes: ${criteria.notes}`);

  const language = criteria.locale === 'es' ? 'Spanish' : 'English';

  lines.push('');
  lines.push(
    'Search Inmuebles24, Lamudi, and Vivanuncios. ' +
    'Return up to 8 real listings as a JSON array. ' +
    'If you find fewer than 8 real ones, fill remaining spots with the closest matches. ' +
    `Write all titles and descriptions in ${language}.`
  );
  lines.push('');
  lines.push('Each object must have these exact fields:');
  lines.push(
    'id (unique string), title (string), colonia (string), price (number), ' +
    'currency ("MXN" or "USD"), bedrooms (number, 0 = studio), bathrooms (number), ' +
    'sqMeters (number — estimate if not listed), furnished (boolean — infer from listing), ' +
    'petsAllowed (boolean — infer from listing), description (2-3 sentence summary), ' +
    'images ([]), ' +
    'source ("Inmuebles24" | "Lamudi" | "Vivanuncios" | "Facebook Marketplace" | "Nidō Sublets"), ' +
    'sourceUrl (the actual listing URL — this is critical, use the real URL), ' +
    'matchScore (0-100 based on how well it matches the criteria), ' +
    'postedAt (ISO date string, today).'
  );

  return lines.join('\n');
}

export async function POST(request: Request) {
  let criteria: Record<string, unknown> = {};

  try {
    criteria = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[/api/search] ANTHROPIC_API_KEY not set');
    return NextResponse.json({ listings: [] });
  }

  try {
    const client = new Anthropic({ apiKey });

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: buildUserMessage(criteria) },
    ];

    let rawText = '';

    // Agentic loop — Claude may search multiple times before returning the JSON
    for (let i = 0; i < 8; i++) {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8096,
        tools: [{ type: 'web_search_20250305', name: 'web_search' } as never],
        system: SYSTEM_PROMPT,
        messages,
      });

      if (response.stop_reason === 'end_turn') {
        rawText = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('');
        break;
      }

      if (response.stop_reason === 'tool_use') {
        // Add Claude's turn (which includes tool_use blocks) to the conversation
        messages.push({ role: 'assistant', content: response.content });

        // For Anthropic's server-side web_search tool, we don't execute the search —
        // Anthropic handles it. We just acknowledge each tool_use block and continue.
        const toolUses = response.content.filter(
          (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
        );

        if (toolUses.length > 0) {
          messages.push({
            role: 'user',
            content: toolUses.map((b) => ({
              type: 'tool_result' as const,
              tool_use_id: b.id,
              content: 'Search executed.',
            })),
          });
        }
      } else {
        break;
      }
    }

    if (!rawText) {
      throw new Error('No text response from Claude after search');
    }

    // If the response is prose (not JSON), do one more turn to force JSON output
    const trimmed = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) {
      messages.push({ role: 'assistant', content: rawText });
      messages.push({
        role: 'user',
        content:
          'Output ONLY the JSON array of listings now. No prose, no markdown, no explanation. ' +
          'Start with [ and end with ]. Nothing else.',
      });
      const forceResponse = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 8096,
        system: SYSTEM_PROMPT,
        messages,
      });
      rawText = forceResponse.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
    }

    // Try to extract a JSON array — Claude sometimes wraps it in prose or code fences
    let jsonText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    if (!jsonText.startsWith('[')) {
      const match = jsonText.match(/\[[\s\S]*\]/);
      if (match) {
        jsonText = match[0];
      }
    }
    const listings = JSON.parse(jsonText) as Listing[];

    if (!Array.isArray(listings)) {
      throw new Error('Expected JSON array');
    }

    // Assign apartment photos (one per listing, cycling through pool)
    const withPhotos = listings.map((listing, i) => ({
      ...listing,
      images: [APARTMENT_PHOTOS[i % APARTMENT_PHOTOS.length]],
    }));

    return NextResponse.json({ listings: withPhotos });
  } catch (error) {
    console.error('[/api/search] Error:', error);
    return NextResponse.json({ listings: [] });
  }
}
