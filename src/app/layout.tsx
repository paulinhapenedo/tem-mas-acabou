import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import SupabaseProvider from './context/supabase-provider';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Tem, mas acabou',
  description:
    'Te ajudamos a cuidar da sua saúde e da sua geladeira, começando pelas suas listas de compras de mercado.',
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
          <main id="skip" className="px-4">
            {children}
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
