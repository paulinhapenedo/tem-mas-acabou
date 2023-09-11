'use client';

import { useRouter } from 'next/navigation';

import { useSupabase } from '~/context/supabase-provider';
import { cn } from '~/utils/tailwind';

export function SignOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();

  return (
    <button
      className={cn(['bg-slate-400 text-slate-950'])}
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      Encerrar sessão
    </button>
  );
}
