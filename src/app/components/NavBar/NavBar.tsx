import Link from 'next/link';

import { createServerSupabaseClient } from '~/services/supabase-server';

import { SignOutButton } from './SignOutButton';

export default async function NavBar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Pular para o conteúdo
      </a>
      {!user && <Link href="/products">Sign in</Link>}
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
