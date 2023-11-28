import { notFound } from 'next/navigation';

import { createSupabaseServerClient } from '~/services/supabase-server';

import RealtimeProduct from './realtime';
interface SingleProductPageProps {
  params: {
    id: string;
  };
}

export default async function SingleProductPage({
  params: { id },
}: SingleProductPageProps) {
  const supabase = createSupabaseServerClient();

  const { data: product } = await supabase
    .from('products')
    .select()
    .match({ id })
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>Single product page</h1>
      <RealtimeProduct productFromServer={product} />
    </div>
  );
}
