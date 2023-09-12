import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import RealtimeProducts from './realtime';

export default async function Products() {
  const { data } = await createServerComponentClient({
    cookies,
  })
    .from('products')
    .select();

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
