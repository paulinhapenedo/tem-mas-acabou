import type { Database as DB } from './supabase';

declare global {
  type Database = DB;
  type Product = DB['public']['Tables']['products']['Row'];
}
