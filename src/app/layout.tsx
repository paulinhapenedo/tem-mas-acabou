import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

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
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
