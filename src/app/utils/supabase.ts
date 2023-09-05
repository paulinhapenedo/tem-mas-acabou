import { cookies } from 'next/headers';
import {
  createServerComponentClient,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createSupabaseServerClient = () =>
  createServerComponentClient({
    cookies,
  });

export const createSupabaseBrowserClient = createPagesBrowserClient({
  supabaseUrl,
  supabaseKey: supabaseAnonKey,
});
