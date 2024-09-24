import { createSupabaseServerClient } from '~/utils/supabase/server';

import RealtimeProducts from './realtime';

export default async function Products() {
  const supabase = createSupabaseServerClient();

  const { data } = await supabase.from('products').select();

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
