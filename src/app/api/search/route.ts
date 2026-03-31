import { NextResponse } from 'next/server';
import type { SearchParams, SearchResponse } from '@/lib/types';

/**
 * POST /api/search
 *
 * Accepts search parameters, invokes the AI synthesis layer,
 * and returns curated listings. In MVP this returns placeholder data;
 * wire up the real scraping layer here once Playwright is integrated.
 */
export async function POST(request: Request) {
  try {
    const params: SearchParams = await request.json();

    // ── Validate required fields ──────────────────────────────────────────
    if (!params.rentalType || !params.budget || !params.bedrooms) {
      return NextResponse.json(
        { error: 'Missing required search parameters' },
        { status: 400 }
      );
    }

    // ── TODO: Replace with real scraping + AI synthesis ───────────────────
    // 1. Run Playwright/Puppeteer scrapers against Inmuebles24, Lamudi, Vivanuncios
    // 2. Pass raw results to synthesizeSearchResults() from @/lib/anthropic
    // 3. Return the curated listings
    //
    // For MVP, redirect to results page with params in query string
    // (handled client-side in IntakeForm.tsx)

    const response: SearchResponse = {
      listings: [],
      total: 0,
      searchId: crypto.randomUUID(),
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[/api/search] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
