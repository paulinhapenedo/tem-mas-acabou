'use client';

import { useEffect, useState } from 'react';

import { Database } from '~/types/supabase';
import { createSupabaseBrowserClient } from '~/utils/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface RealtimeProductProps {
  productFromServer: Product;
}

export default function RealtimeProduct({
  productFromServer,
}: RealtimeProductProps) {
  const [product, setProduct] = useState(productFromServer);

  useEffect(() => {
    const channel = createSupabaseBrowserClient
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
      createSupabaseBrowserClient.removeChannel(channel);
    };
  }, [product, setProduct]);

  return (
    <div>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}
