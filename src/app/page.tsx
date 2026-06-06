'use client';

import { useState, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import tokyoDomeData from '@/data/hotels';
import HotelCard from '@/components/HotelCard';
import DateRangePicker from '@/components/DateRangePicker';
import TravelTimeFilter from '@/components/TravelTimeFilter';
import type { TravelTimeFilter as TravelTimeFilterType } from '@/types';

export default function Home() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [travelTimeFilter, setTravelTimeFilter] = useState<TravelTimeFilterType>(null);

  const { venue, hotels } = tokyoDomeData;

  const filteredHotels = useMemo(() => {
    if (!travelTimeFilter) return hotels;
    return hotels.filter((h) => h.travelTimeMinutes <= travelTimeFilter);
  }, [hotels, travelTimeFilter]);

  const nights = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return 1;
    return Math.max(1, differenceInCalendarDays(dateRange.to, dateRange.from));
  }, [dateRange]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">🏟️</span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold leading-tight">Live Hotel Finder</h1>
            <p className="text-indigo-300 text-xs">ライブ会場周辺のホテル価格比較</p>
          </div>
        </div>
      </header>

      {/* Search hero */}
      <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Venue label */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
            <span className="bg-indigo-500/70 border border-indigo-400 text-indigo-100 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider">
              会場
            </span>
            <h2 className="text-white text-xl sm:text-2xl font-extrabold">{venue.name}</h2>
            <span className="text-indigo-300 text-sm hidden sm:block">{venue.address}</span>
          </div>
          <p className="text-indigo-300 text-sm sm:hidden mb-4">{venue.address}</p>

          {/* Filters card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 sm:items-end">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  宿泊日
                </label>
                <DateRangePicker onRangeChange={setDateRange} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  移動時間
                </label>
                <TravelTimeFilter value={travelTimeFilter} onChange={setTravelTimeFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-7">
        {/* Result count bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 font-bold text-lg">{filteredHotels.length}</span>
            <span className="text-gray-600 text-sm font-medium">件のホテルが見つかりました</span>
            {nights > 1 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {nights}泊
              </span>
            )}
          </div>
          {travelTimeFilter && (
            <span className="text-xs text-indigo-500 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
              移動 {travelTimeFilter}分以内で絞り込み中
            </span>
          )}
        </div>

        {/* Hotel list */}
        <div className="space-y-4">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} nights={nights} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-4xl mb-3">😢</p>
              <p className="text-lg font-semibold text-gray-600">
                条件に合うホテルが見つかりませんでした
              </p>
              <p className="text-sm text-gray-400 mt-1">
                移動時間のフィルターを緩めてみてください
              </p>
              <button
                onClick={() => setTravelTimeFilter(null)}
                className="mt-4 text-sm text-indigo-500 hover:text-indigo-700 underline"
              >
                フィルターをリセット
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-8 py-6 px-4 text-center">
        <p className="text-xs text-gray-400">
          © 2024 Live Hotel Finder ・ 表示価格はダミーデータです。実際の価格は各予約サイトでご確認ください。
        </p>
      </footer>
    </div>
  );
}
