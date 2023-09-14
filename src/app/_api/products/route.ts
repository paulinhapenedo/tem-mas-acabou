import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { id, name } = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { data } = await supabase
    .from('products')
    .update({ name: name })
    .match({ id });

  return NextResponse.json(data);
}
