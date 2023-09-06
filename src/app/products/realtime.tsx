'use client';

import { useEffect, useState } from 'react';

import { Database } from '~/types/supabase';
import { createSupabaseBrowserClient } from '~/utils/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductsFromServer {
  productsFromServer: Product[];
}

export default function RealtimeProducts({
  productsFromServer,
}: ProductsFromServer) {
  const [products, setProducts] = useState(productsFromServer);

  useEffect(() => {
    const channel = createSupabaseBrowserClient
      .channel('realtime products')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'products',
        },
        (payload: { new: Product }) => {
          setProducts([...products, payload.new]);
        },
      )
      .subscribe();

    return () => {
      createSupabaseBrowserClient.removeChannel(channel);
    };
  }, [products, setProducts]);

  return (
    <div>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
