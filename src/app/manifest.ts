import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tem, mas acabou',
    short_name: 'TMA',
    description:
      'Te ajudamos a cuidar da sua saúde e da sua geladeira, começando pelas suas listas de compras de mercado.',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#FECE10',
    theme_color: '#FECE10',
    icons: [
      {
        src: 'icon-maskable.png',
        sizes: '346x346',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
