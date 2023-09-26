import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export function createPagesBrowserClient() {
  return supabase;
}
export function createServerComponentClient() {
  return supabase;
}
export function createRouteHandlerClient() {
  return supabase;
}
export function createMiddlewareClient() {
  return supabase;
}
