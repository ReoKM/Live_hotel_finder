'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import Header from '@/components/Header';
import VenueSearch from '@/components/VenueSearch';
import DateRangePicker from '@/components/DateRangePicker';
import { VenueData } from '@/types';
import { allVenues } from '@/data/venues';

const POPULAR_VENUE_IDS = [
  'tokyo-dome',
  'yokohama-arena',
  'saitama-super-arena',
  'osaka-jo-hall',
  'paypay-dome',
];

export default function Home() {
  const router = useRouter();
  const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const popularVenues = POPULAR_VENUE_IDS.map((id) =>
    allVenues.find((v) => v.venue.id === id)
  ).filter(Boolean) as VenueData[];

  const handleSearch = () => {
    if (!selectedVenue) return;
    const params = new URLSearchParams();
    if (dateRange?.from) params.set('checkin', format(dateRange.from, 'yyyy-MM-dd'));
    if (dateRange?.to) params.set('checkout', format(dateRange.to, 'yyyy-MM-dd'));
    const query = params.toString();
    router.push(`/venues/${selectedVenue.venue.id}${query ? `?${query}` : ''}`);
  };

  const handleQuickSelect = (venueData: VenueData) => {
    const params = new URLSearchParams();
    if (dateRange?.from) params.set('checkin', format(dateRange.from, 'yyyy-MM-dd'));
    if (dateRange?.to) params.set('checkout', format(dateRange.to, 'yyyy-MM-dd'));
    const query = params.toString();
    router.push(`/venues/${venueData.venue.id}${query ? `?${query}` : ''}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-950 to-indigo-900 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-fuchsia-500/80 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            楽天 · じゃらん · agoda 一括比較
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
            ライブ・フェス遠征の
            <br />
            ホテルを最安値で予約
          </h2>
          <p className="text-violet-300 text-sm sm:text-base mb-8">
            会場を選ぶだけで、近くのホテルを3サイトで比較。面倒な検索は不要。
          </p>

          {/* Search card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl text-left">
            <div className="space-y-4">
              <div>
                <label htmlFor="venue-search-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  会場名
                </label>
                <VenueSearch onVenueSelect={setSelectedVenue} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  宿泊日
                </label>
                <DateRangePicker onRangeChange={setDateRange} />
              </div>

              <button
                onClick={handleSearch}
                disabled={!selectedVenue}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-base"
              >
                ホテルを検索 →
              </button>

              {!selectedVenue && (
                <p className="text-xs text-gray-400 text-center">
                  まず会場名を入力してください
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popular venues */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        <h3 className="text-lg font-bold text-gray-800 mb-4">人気の会場から探す</h3>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x">
          {popularVenues.map((venueData) => (
            <button
              key={venueData.venue.id}
              onClick={() => handleQuickSelect(venueData)}
              className="flex-none snap-start bg-white border border-gray-100 hover:border-violet-300 hover:shadow-md rounded-xl px-5 py-4 text-left transition-all min-w-[160px] group"
            >
              <span className="text-2xl block mb-2">🏟️</span>
              <p className="font-bold text-gray-800 text-sm leading-tight group-hover:text-violet-700 transition-colors">
                {venueData.venue.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">{venueData.venue.prefecture}</p>
            </button>
          ))}
        </div>

        {/* All venues list */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-800 mb-4">すべての対応会場</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allVenues.map((venueData) => (
              <button
                key={venueData.venue.id}
                onClick={() => handleQuickSelect(venueData)}
                className="bg-white border border-gray-100 hover:border-violet-300 hover:shadow-sm rounded-xl px-4 py-3 text-left transition-all group"
              >
                <p className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-violet-700 transition-colors">
                  {venueData.venue.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{venueData.venue.prefecture}</p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-8 py-6 px-4 text-center">
        <p className="text-xs text-gray-400 mb-1">
          ※ 当サイトは楽天トラベル・じゃらん・agodaのアフィリエイトプログラムに参加しています。
        </p>
        <p className="text-xs text-gray-400">
          ※ 表示価格はダミーデータです。実際の価格は各予約サイトでご確認ください。
        </p>
        <p className="text-xs text-gray-300 mt-2">© {new Date().getFullYear()} Live Hotel Finder</p>
      </footer>
    </div>
  );
}
