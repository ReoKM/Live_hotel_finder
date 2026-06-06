import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-day-picker/dist/style.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Live Hotel Finder | ライブ会場周辺のホテル価格比較',
  description: 'ライブや遠征の宿泊先を、会場からの移動時間と楽天トラベル・じゃらんの価格で一括比較',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>{children}</body>
    </html>
  );
}
