import Image from 'next/image';
import Link from 'next/link';

import { getUserDetails } from '~/services/supabase-server';
import { SignInForm } from '~/components/SignInForm';
import { UserMenu } from '~/components/UserMenu';
import { Separator } from '~/ui/separator';

export default async function NavBar() {
  const user = await getUserDetails();

  return (
    <div className="px-4 md:px-12 pb-8">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Pular para o conteúdo
      </a>
      <div className="flex flex-shrink-0 flex-nowrap align-center justify-between pt-6 mb-6">
        <Link href="/" title="Tem, mas acabou">
          <Image
            src="/icon-light.png"
            height="36"
            width="32"
            alt="Ícone de uma caixa de leite, o logo do Tem, mas acabou"
          />
        </Link>
        {!user && <SignInForm />}
        {!!user && (
          <>
            <UserMenu user={user} />
          </>
        )}
      </div>
      <Separator />
    </div>
  );
}
