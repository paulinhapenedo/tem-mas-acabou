import { notFound } from 'next/navigation';

import { createSupabaseBrowserClient } from '~/utils/supabase';

import RealtimeProduct from './realtime';
interface SingleProductPageProps {
  params: {
    id: string;
  };
}

export default async function SingleProductPage({
  params: { id },
}: SingleProductPageProps) {
  const { data: product } = await createSupabaseBrowserClient
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
