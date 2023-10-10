import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '~/ui/typography';

const IMAGE_URL = '/entei-error.png';
const IMAGE_SIZE = 200;

const strings = {
  title: 'Algo de errado não está certo!',
  description: `Sabemos que pode ser desconsertante estar aqui. Por isso, o Entei está
  aqui para te guiar em segurança para a página inicial.`,
  altImage: `Ilustração do Pokémon Entei em referência ao meme 'Tá tudo bem agora'`,
  button: `Clique aqui para redirecionar para a página inicial`,
};

export default function NotFound() {
  return (
    <div className="grid place-content-center md:place-items-center gap-16 h-[85dvh] max-w-prose m-auto">
      <div>
        <Typography.H1>{strings.title}</Typography.H1>
        <Typography.P>{strings.description}</Typography.P>
        <Image
          className="mx-auto my-4"
          src={IMAGE_URL}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          alt={strings.altImage}
        />
      </div>
      <Link className="text-foreground underline-offset-4 underline" href="/">
        {strings.button}
      </Link>
    </div>
  );
}
