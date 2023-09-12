'use client';

import { useRouter } from 'next/navigation';

import { useSupabase } from '~/context/supabase-provider';
import { cn } from '~/utils/tailwind';

export function SignInButton() {
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleSignIn = async () => {
    // TODO: create dropdown form and get inputted data
    const { data, error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_USERNAME || '',
      password: process.env.NEXT_PUBLIC_PWD || '',
    });

    if (data) {
      router.refresh();
    }

    if (error) {
      console.log({ error });
    }
  };

  return (
    <button
      className={cn(['bg-slate-400 text-slate-950'])}
      onClick={handleSignIn}
    >
      Login
    </button>
  );
}
