import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import SupabaseProvider from '~/context/supabase-provider';
import NavBar from '~/components/NavBar';
import { Toaster } from '~/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#FECE10',
};

export const metadata: Metadata = {
  title: 'Tem, mas acabou',
  description:
    'Te ajudamos a cuidar da sua saúde e da sua geladeira, começando pelas suas listas de compras de mercado.',
  icons: [
    {
      rel: 'icon',
      url: '/icon-light.png',
      type: 'image/png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/icon-dark.png',
      type: 'image/png',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} font-sans`}>
        <SupabaseProvider>
          <NavBar />
          <main id="skip" className="px-4 md:px-12 pb-8">
            {children}
          </main>
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
