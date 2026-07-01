import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-violet-950 to-indigo-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <Link href="/">
          <span className="text-2xl">🏟️</span>
        </Link>
        <Link href="/" className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-bold leading-tight">Live Hotel Finder</h1>
          <p className="text-violet-300 text-xs">ライブ会場周辺のホテル価格比較</p>
        </Link>
      </div>
    </header>
  );
}
