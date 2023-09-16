import { createServerSupabaseClient } from '~/services/supabase-server';
import { SignInForm } from '../SignInForm';
import { UserMenu } from '../UserMenu';

export default async function NavBar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex flex-shrink-0 flex-nowrap justify-end px-4 md:px-12 pt-6 mb-6 lg:mb-0">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Pular para o conteúdo
      </a>
      {!user && <SignInForm />}
      {user && <UserMenu user={user} />}
    </nav>
  );
}
