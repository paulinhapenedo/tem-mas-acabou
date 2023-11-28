'use server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );

  return supabase;
};

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
