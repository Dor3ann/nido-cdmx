import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { Listing } from '@/types/listing';

const SYSTEM_PROMPT =
  'You are a housing search agent for Mexico City. Generate realistic 2026 rental listings matching the criteria. Return ONLY a valid JSON array, no extra text or markdown.';

function buildUserMessage(criteria: Record<string, unknown>): string {
  const lines = ['Search criteria:'];

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
    lines.push('- Neighborhoods: any area in CDMX');
  }

  if (criteria.bedrooms) lines.push(`- Bedrooms: ${criteria.bedrooms}`);
  if (criteria.furnished && criteria.furnished !== 'either') lines.push(`- Furnished: ${criteria.furnished}`);
  if (criteria.pets && criteria.pets !== 'either') lines.push(`- Pets allowed: ${criteria.pets}`);
  if (criteria.moveIn) lines.push(`- Move-in date: ${criteria.moveIn}`);
  if (criteria.notes) lines.push(`- Additional notes: ${criteria.notes}`);

  lines.push('');
  lines.push('Return exactly 8 listings as a JSON array. Each object must have these exact fields:');
  lines.push(
    'id (unique string), title (string), colonia (string), price (number), currency ("MXN" or "USD"), ' +
    'bedrooms (number where 0 = studio, or the string "studio"), bathrooms (number), sqMeters (number), ' +
    'furnished (boolean), petsAllowed (boolean), description (string, 2-3 sentences), ' +
    'images (empty array []), ' +
    'source (one of: "Inmuebles24", "Lamudi", "Vivanuncios", "Facebook Marketplace", "Nidō Sublets"), ' +
    'sourceUrl (string "#"), matchScore (integer 0-100, higher = better match for the criteria), ' +
    'postedAt (ISO 8601 date string).'
  );
  const language = criteria.locale === 'es' ? 'Spanish' : 'English';
  lines.push(
    `Vary the sources and colonias. If neighborhoods were specified, most listings should be in those areas. ` +
    `Mix furnished/unfurnished realistically. Set matchScore based on how closely each listing fits the criteria. ` +
    `Write all titles and descriptions in ${language}.`
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
    console.warn('[/api/search] ANTHROPIC_API_KEY not set — returning empty listings');
    return NextResponse.json({ listings: [] }, { status: 200 });
  }

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserMessage(criteria) }],
    });

    const rawText = (message.content[0] as { type: string; text: string }).text.trim();
    // Strip markdown code fences if Claude wraps the response despite instructions
    const jsonText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    const listings: Listing[] = JSON.parse(jsonText);

    if (!Array.isArray(listings)) {
      throw new Error('Claude returned non-array response');
    }

    return NextResponse.json({ listings });
  } catch (error) {
    console.error('[/api/search] Claude error:', error);
    return NextResponse.json({ listings: [] }, { status: 200 });
  }
}
