import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '~/utils/supabase/server';

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data } = await supabase.auth.getSession();

  return NextResponse.json({
    authenticated: !!data.session,
    session: data.session,
  });
}
