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

export async function getUserFromSession() {
  const supabase = createServerSupabaseClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error('Error getting user from active session:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    // get user from active session
    const user = await getUserFromSession();

    const { data: userDetails } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id as string)
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
}
