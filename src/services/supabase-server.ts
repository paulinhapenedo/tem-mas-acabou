/**
 * Creates the server-side client for Supabase using cookies
 * that are set in the middleware.
 */

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();

  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export async function getUserDetails(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('profiles')
      .select('username, name, avatar_url, id')
      .eq('id', id)
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
}
