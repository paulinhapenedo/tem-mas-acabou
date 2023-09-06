import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '~/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createSupabaseBrowserClient = createPagesBrowserClient<Database>({
  supabaseUrl,
  supabaseKey: supabaseAnonKey,
});
