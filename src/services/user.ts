'use server';

import { createSupabaseServerClient } from '~/utils/supabase/server';

export async function getUserFromSession() {
  const supabase = createSupabaseServerClient();

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
  const supabase = createSupabaseServerClient();
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
