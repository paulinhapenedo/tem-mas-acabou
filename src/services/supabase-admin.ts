/**
 * This file should concentrate all the Supabase admin operations
 * like webhooks and other integrations with third-parties.
 */

import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);
