import Link from 'next/link';

import { createServerSupabaseClient } from '~/services/supabase-server';
import { SignInForm } from '../SignInForm';

import { SignOutButton } from './SignOutButton';

export default async function NavBar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex flex-shrink-0 flex-nowrap justify-end px-4 pt-6">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Pular para o conteúdo
      </a>
      {!user && <SignInForm />}
      {user && (
        <>
          <p>Olá, {user.email}</p>
          <Link href="/products">Produtos</Link>
          <SignOutButton />
        </>
      )}
    </nav>
  );
}
