import { redirect } from 'next/navigation';

import { PageWrapper } from '~/components/PageWrapper';
import { createServerSupabaseClient } from '~/services/supabase-server';
import { Button } from '~/ui/button';
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
    <PageWrapper title="Bem vinda!" subtitle="O que deseja fazer?">
      <section className="py-4 lg:px-4 lg:col-start-3 lg:col-span-4">
        <Typography.H3>Últimas listas criadas</Typography.H3>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>09/10/2023 - Hortifruti</li>
          <li>23/09/2023 - Mercado</li>
          <li>10/09/2023 - Hortifruti</li>
        </ul>
        <Button className="w-full">Ver</Button>
      </section>
      <section className="py-4 lg:px-4 lg:col-span-4 lg:col-start-8">
        <Typography.H3>Últimos produtos</Typography.H3>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Suco de laranja Oba 1L</li>
          <li>Batata asterix</li>
          <li>Tomate italiano</li>
        </ul>
        <Button className="w-full">Ver</Button>
      </section>
    </PageWrapper>
  );
}
