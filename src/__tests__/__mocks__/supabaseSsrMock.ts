import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export function createBrowserClient() {
  return supabase;
}
export function createSupabaseServerClient() {
  return supabase;
}
export function createServerClient() {
  return supabase;
}
