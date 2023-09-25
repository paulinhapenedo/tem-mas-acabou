import { redirect } from 'next/navigation';

import { createServerSupabaseClient } from '~/services/supabase-server';
import { Typography } from '~/ui/typography';

export default async function Home() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
  }

  return (
    <>
      <Typography.H1>Bem vinda!</Typography.H1>
    </>
  );
}
