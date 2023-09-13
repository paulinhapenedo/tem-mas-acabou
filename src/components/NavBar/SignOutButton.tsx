'use client';

import { useRouter } from 'next/navigation';

import { useSupabase } from '~/context/supabase-provider';
import { Button } from '~/ui/button';

export function SignOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      Encerrar sessão
    </Button>
  );
}
