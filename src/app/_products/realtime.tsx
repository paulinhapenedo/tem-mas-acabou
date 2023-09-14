'use client';

import { useEffect, useState } from 'react';

import { useSupabase } from '~/context/supabase-provider';

interface ProductsFromServer {
  productsFromServer: Product[];
}

export default function RealtimeProducts({
  productsFromServer,
}: ProductsFromServer) {
  const [products, setProducts] = useState(productsFromServer);
  const { supabase } = useSupabase();

  useEffect(() => {
    const channel = supabase
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
      supabase.removeChannel(channel);
    };
  }, [products, setProducts, supabase]);

  return (
    <div>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
