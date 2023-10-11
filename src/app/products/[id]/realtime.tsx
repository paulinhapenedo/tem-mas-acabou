'use client';

import { useEffect, useState } from 'react';

import { useSupabase } from '~/context/supabase-provider';
interface RealtimeProductProps {
  productFromServer: Product;
}

export default function RealtimeProduct({
  productFromServer,
}: RealtimeProductProps) {
  const [product, setProduct] = useState(productFromServer);
  const { supabase } = useSupabase();

  useEffect(() => {
    const channel = supabase
      .channel('realtime product')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${product.id}`,
        },
        (payload: { new: Product }) => {
          setProduct(payload.new);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [product, setProduct, supabase]);

  return (
    <div>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}
