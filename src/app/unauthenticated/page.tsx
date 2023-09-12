import { redirect } from 'next/navigation';

import SignUpForm from '~/components/SignUpForm/SignUpForm';
import { createServerSupabaseClient } from '~/services/supabase-server';

export default async function Unauthenticated() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="grid place-content-center md:place-items-center h-[90dvh] gap-6 max-w-prose m-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold">Tem, mas acabou</h1>
      <h2 className="text-xl md:text-2xl md:text-center">
        Te ajudamos a cuidar da sua saúde e da sua geladeira, começando pelas
        suas listas de compras de mercado.
      </h2>

      <SignUpForm />
    </div>
  );
}
