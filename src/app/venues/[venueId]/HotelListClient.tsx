'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import Header from '@/components/Header';
import HotelCard from '@/components/HotelCard';
import { VenueData, TravelTimeFilterValue, SortKey, HotelPrices } from '@/types';

interface Props {
  venueData: VenueData;
}

const DISPLAY_COUNT = 20;

const minPrice = (p: HotelPrices): number =>
  Math.min(...([p.rakuten, p.jalan, p.agoda].filter((x) => x !== null) as number[]));

const FILTER_OPTIONS: { label: string; value: TravelTimeFilterValue }[] = [
  { label: 'すべて', value: null },
  { label: '徒歩10分', value: 10 },
  { label: '徒歩20分', value: 20 },
  { label: '電車圏内', value: 'train' },
];

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: '安い順', value: 'price_asc' },
  { label: '高い順', value: 'price_desc' },
  { label: '近い順', value: 'distance_asc' },
];

function HotelListInner({ venueData }: Props) {
  const searchParams = useSearchParams();
  const checkin = searchParams.get('checkin') ?? '';
  const checkout = searchParams.get('checkout') ?? '';

  const nights = useMemo(() => {
    if (!checkin || !checkout) return 1;
    try {
      return Math.max(1, differenceInCalendarDays(parseISO(checkout), parseISO(checkin)));
    } catch {
      return 1;
    }
  }, [checkin, checkout]);

  const [filter, setFilter] = useState<TravelTimeFilterValue>(null);
  const [sort, setSort] = useState<SortKey>('price_asc');
  const [displayCount, setDisplayCount] = useState(DISPLAY_COUNT);

  const { venue, hotels } = venueData;

  const filtered = useMemo(() => {
    let result = hotels.filter((h) => {
      if (filter === 10) return h.transport === 'walk' && h.travelTimeMinutes <= 10;
      if (filter === 20) return h.transport === 'walk' && h.travelTimeMinutes <= 20;
      if (filter === 'train') return h.transport === 'train';
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'price_asc') return minPrice(a.dummyPrices) - minPrice(b.dummyPrices);
      if (sort === 'price_desc') return minPrice(b.dummyPrices) - minPrice(a.dummyPrices);
      if (sort === 'distance_asc') return a.travelTimeMinutes - b.travelTimeMinutes;
      return 0;
    });

    return result;
  }, [hotels, filter, sort]);

  const displayed = filtered.slice(0, displayCount);
  const remaining = filtered.length - displayCount;

  const dateQuery =
    checkin && checkout ? `?checkin=${checkin}&checkout=${checkout}` : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Venue hero */}
      <div className="bg-gradient-to-r from-violet-950 to-indigo-900 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Link href="/" className="text-violet-300 text-xs hover:text-white transition-colors">
              トップ
            </Link>
            <span className="text-violet-500 text-xs">›</span>
            <span className="text-white text-xs font-medium">{venue.name}</span>
          </div>
          <h2 className="text-white text-2xl sm:text-3xl font-extrabold">{venue.name}周辺のホテル</h2>
          <p className="text-violet-300 text-sm mt-1">{venue.address}</p>
          {nights > 1 && (
            <span className="inline-block mt-2 text-xs text-violet-100 bg-violet-800/60 px-2 py-0.5 rounded-full">
              {nights}泊
            </span>
          )}
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-none">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => {
                  setFilter(opt.value);
                  setDisplayCount(DISPLAY_COUNT);
                }}
                className={`flex-none px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  filter === opt.value
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setDisplayCount(DISPLAY_COUNT);
            }}
            className="flex-none text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-400 bg-white cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-violet-600">{filtered.length}</span>件のホテルが見つかりました
          </p>
        </div>

        {displayed.length > 0 ? (
          <>
            <div className="space-y-4">
              {displayed.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  nights={nights}
                  venueId={venue.id}
                  dateQuery={dateQuery}
                />
              ))}
            </div>

            {remaining > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setDisplayCount((c) => c + DISPLAY_COUNT)}
                  className="bg-white border border-violet-300 text-violet-700 hover:bg-violet-50 font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
                >
                  さらに{remaining}件のホテルを表示
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-4xl mb-3">😢</p>
            <p className="text-lg font-semibold text-gray-600">条件に合うホテルが見つかりませんでした</p>
            <p className="text-sm text-gray-400 mt-1">フィルターを変更してみてください</p>
            <button
              onClick={() => setFilter(null)}
              className="mt-4 text-sm text-violet-500 hover:text-violet-700 underline"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-8 py-6 px-4 text-center">
        <p className="text-xs text-gray-400 mb-1">
          ※ 当サイトは楽天トラベル・じゃらん・agodaのアフィリエイトプログラムに参加しています。
        </p>
        <p className="text-xs text-gray-400">
          ※ 表示価格はダミーデータです。実際の価格は各予約サイトでご確認ください。
        </p>
        <p className="text-xs text-gray-300 mt-2">© 2024 Live Hotel Finder</p>
      </footer>
    </div>
  );
}

export default function HotelListClient({ venueData }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">読み込み中...</p></div>}>
      <HotelListInner venueData={venueData} />
    </Suspense>
  );
}
