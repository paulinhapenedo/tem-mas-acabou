'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '~/ui/button';
import { Typography } from '~/ui/typography';

const IMAGE_URL = '/entei-error.png';
const IMAGE_SIZE = 200;

const strings = {
  title: 'Algo de errado não está certo!',
  description: `Sabemos que pode ser desconsertante estar aqui. Por isso, o Entei está
  aqui para te guiar em segurança para a página inicial.`,
  altImage: `Ilustração do Pokémon Entei em referência ao meme 'Tá tudo bem agora'`,
  button: `Clique aqui para atualizar a página`,
};

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
      <Button onClick={() => reset()}>{strings.button}</Button>
    </div>
  );
}
