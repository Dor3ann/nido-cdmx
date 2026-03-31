import { NextResponse } from 'next/server';
import type { SubletFormData } from '@/lib/types';

/**
 * GET  /api/sublets  — fetch active sublet listings
 * POST /api/sublets  — create a new sublet listing
 *
 * Wire up Supabase once environment variables are configured:
 *   import { createServerSupabaseClient } from '@/lib/supabase';
 */
export async function GET() {
  try {
    // const supabase = createServerSupabaseClient();
    // const { data, error } = await supabase
    //   .from('sublets')
    //   .select('*')
    //   .gt('expires_at', new Date().toISOString())
    //   .order('is_boosted', { ascending: false })
    //   .order('created_at', { ascending: false });
    //
    // if (error) throw error;
    // return NextResponse.json({ sublets: data });

    return NextResponse.json({ sublets: [] });
  } catch (error) {
    console.error('[GET /api/sublets] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: SubletFormData & { locale: string } = await request.json();

    // Basic validation
    if (!body.colonia || !body.price || !body.contactValue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Insert into Supabase ───────────────────────────────────────────────
    // const supabase = createServerSupabaseClient();
    // const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days
    // const { data, error } = await supabase.from('sublets').insert({
    //   colonia: body.colonia,
    //   price: body.price,
    //   currency: body.currency,
    //   bedrooms: body.bedrooms,
    //   furnished_status: body.furnishedStatus,
    //   move_in_date: body.moveInDate,
    //   lease_end_date: body.leaseEndDate,
    //   description: body.description,
    //   contact_method: body.contactMethod,
    //   contact_value: body.contactValue,
    //   expires_at: expiresAt.toISOString(),
    //   is_boosted: false,
    // }).select().single();
    //
    // if (error) throw error;
    // return NextResponse.json({ sublet: data }, { status: 201 });

    return NextResponse.json(
      { message: 'Sublet created (Supabase not yet configured)', id: crypto.randomUUID() },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/sublets] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
