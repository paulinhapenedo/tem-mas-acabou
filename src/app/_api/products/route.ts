import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '~/services/supabase-server';

export async function PUT(request: Request) {
  const { id, name } = await request.json();

  const supabase = createSupabaseServerClient();

  const { data } = await supabase
    .from('products')
    .update({ name: name })
    .match({ id });

  return NextResponse.json(data);
}
