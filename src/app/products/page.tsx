import { createSupabaseBrowserClient } from '~/utils/supabase';

import RealtimeProducts from './realtime';

export default async function Products() {
  const { data } = await createSupabaseBrowserClient.from('products').select();

  if (!data) {
    return (
      <div>
        <h1>Empty state</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      <RealtimeProducts productsFromServer={data} />
    </div>
  );
}
