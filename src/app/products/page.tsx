import { createSupabaseBrowserClient } from '~/utils/supabase';

export default async function Products() {
  const { data } = await createSupabaseBrowserClient.from('products').select();
  return (
    <div>
      <h1>Products</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
