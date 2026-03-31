import Anthropic from '@anthropic-ai/sdk';
import type { SearchParams, Listing, ListingSource } from './types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─── System prompt for housing search synthesis ────────────────────────────

function buildSystemPrompt(locale: 'en' | 'es'): string {
  const lang = locale === 'es' ? 'Spanish' : 'English';
  return `You are Nidō's AI housing search concierge for Mexico City (CDMX).
Your job is to synthesize rental listing data and return curated, relevant results.

Always respond in ${lang}.

When given search criteria and raw listing data:
1. Filter listings that genuinely match the criteria
2. Write a concise 2-sentence AI summary for each listing highlighting key pros and any caveats
3. Assign a match score (0-100) based on how well the listing fits all criteria
4. Normalize prices to ensure consistent formatting
5. Return results ranked by match score, then price (ascending)

Keep summaries factual, warm, and helpful. Do not invent information not present in the data.`;
}

// ─── Synthesize search results with Claude ────────────────────────────────

export async function synthesizeSearchResults(
  params: SearchParams,
  rawListings: Partial<Listing>[]
): Promise<Listing[]> {
  const prompt = `
Search criteria:
- Rental type: ${params.rentalType}
- Budget: ${params.budget} ${params.currency}/month
- Area: ${params.area || 'flexible'}
- Bedrooms: ${params.bedrooms}
- Amenities required: ${params.amenities.join(', ') || 'none specified'}
- Move-in date: ${params.moveInDate}

Raw listings to analyze (${rawListings.length} total):
${JSON.stringify(rawListings, null, 2)}

Please analyze these listings against the search criteria. For each listing that is a reasonable match:
1. Write an AI summary (2 sentences max)
2. Assign a match score (0-100)
3. Return the full listing data with these additions

Return a JSON array of matched listings with all original fields plus "aiSummary" (string) and "matchScore" (number).
Only include listings with a match score of 40 or above.
`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: buildSystemPrompt(params.locale),
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== 'text') return [];

  // Extract JSON from response
  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return [];

  try {
    return JSON.parse(jsonMatch[0]) as Listing[];
  } catch {
    return [];
  }
}

// ─── Generate neighborhood suggestions ────────────────────────────────────

export async function suggestNeighborhoods(
  params: Pick<SearchParams, 'budget' | 'currency' | 'rentalType' | 'amenities' | 'locale'>
): Promise<string[]> {
  const lang = params.locale === 'es' ? 'Spanish' : 'English';

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `Based on these criteria for a CDMX rental:
- Budget: ${params.budget} ${params.currency}/month
- Type: ${params.rentalType}
- Must-haves: ${params.amenities.join(', ') || 'flexible'}

Suggest 4-6 colonias in Mexico City that would be a good fit.
Respond in ${lang} with a JSON array of strings: ["Colonia Name - brief reason", ...]`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') return [];

  const jsonMatch = content.text.match(/\[[\s\S]*?\]/);
  if (!jsonMatch) return [];

  try {
    return JSON.parse(jsonMatch[0]) as string[];
  } catch {
    return [];
  }
}
