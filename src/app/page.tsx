import { redirect } from 'next/navigation';

import { createServerSupabaseClient } from './services/supabase-server';

export default async function Home() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
    return null;
  }

  return (
    <>
      <h1 className="text-slate-900 text-3xl">Tem, mas acabou</h1>
    </>
  );
}
