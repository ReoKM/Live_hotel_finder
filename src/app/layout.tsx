import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-day-picker/dist/style.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ライブ・フェス会場近くのホテルを比較 | Live Hotel Finder',
  description: '楽天トラベル・じゃらん・agodaの料金を一画面で比較。ライブ遠征のホテル探しを時短。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>{children}</body>
    </html>
  );
}
