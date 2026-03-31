import { NextResponse } from 'next/server';
import type { ConciergeLead } from '@/lib/types';

/**
 * POST /api/concierge
 *
 * Captures a concierge consultation lead.
 * Wire up Supabase / email notification once env vars are set.
 */
export async function POST(request: Request) {
  try {
    const lead: ConciergeLead = await request.json();

    // Validate
    if (!lead.name || !lead.email || !lead.timeline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Save to Supabase ──────────────────────────────────────────────────
    // const supabase = createServerSupabaseClient();
    // const { error } = await supabase.from('concierge_leads').insert({
    //   name: lead.name,
    //   email: lead.email,
    //   whatsapp: lead.whatsapp,
    //   timeline: lead.timeline,
    //   budget: lead.budget,
    //   notes: lead.notes,
    //   locale: lead.locale,
    // });
    // if (error) throw error;

    // ── TODO: Send notification email / Slack alert to team ───────────────

    return NextResponse.json({ message: 'Lead captured' }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/concierge] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
