'use client';

import { useRouter } from 'next/navigation';
import { Hotel, HotelPrices } from '@/types';

interface Props {
  hotel: Hotel;
  nights: number;
  venueId: string;
  dateQuery: string;
}

const TRANSPORT_ICON: Record<string, string> = {
  walk: '🚶',
  train: '🚃',
};

const TRANSPORT_LABEL: Record<string, string> = {
  walk: '徒歩',
  train: '電車',
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(price);
}

function minPrice(p: HotelPrices): number {
  const values = [p.rakuten, p.jalan, p.agoda].filter((x): x is number => x !== null);
  return values.length > 0 ? Math.min(...values) : 0;
}

function cheapestOta(p: HotelPrices): 'rakuten' | 'jalan' | 'agoda' {
  const min = minPrice(p);
  if (p.rakuten === min) return 'rakuten';
  if (p.jalan === min) return 'jalan';
  return 'agoda';
}

function maxPrice(p: HotelPrices): number {
  const values = [p.rakuten, p.jalan, p.agoda].filter((x): x is number => x !== null);
  return values.length > 0 ? Math.max(...values) : 0;
}

export default function HotelCard({ hotel, nights, venueId, dateQuery }: Props) {
  const router = useRouter();
  const rakutenUrl = `https://travel.rakuten.co.jp/HOTEL/${hotel.rakutenId}/`;
  const jalanUrl = `https://www.jalan.net/yad${hotel.jalanId}/`;
  const agodaUrl = `https://www.agoda.com/hotel/${hotel.agodaId}/`;

  const cheapest = cheapestOta(hotel.dummyPrices);
  const diff = maxPrice(hotel.dummyPrices) - minPrice(hotel.dummyPrices);
  const showDiff = diff >= 500;

  const detailHref = `/venues/${venueId}/hotels/${hotel.id}${dateQuery}`;

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
      onClick={() => router.push(detailHref)}
    >
      <div className="p-5 sm:p-6">
        {/* Hotel header */}
        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{hotel.name}</h3>
              {hotel.stars > 0 && (
                <span className="text-yellow-400 text-sm">{'★'.repeat(hotel.stars)}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-amber-500 text-xs font-bold">★{hotel.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-xs">{hotel.reviewCount.toLocaleString()}件</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{hotel.address}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Travel time badge */}
          <div className="flex items-center gap-1.5 bg-violet-50 text-violet-700 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-violet-200 shrink-0">
            <span className="text-base">{TRANSPORT_ICON[hotel.transport]}</span>
            <span>{TRANSPORT_LABEL[hotel.transport]}</span>
            <span className="font-bold text-violet-800">{hotel.travelTimeMinutes}分</span>
          </div>
        </div>

        {/* Price comparison - 3 column grid */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-50">
          {/* Rakuten */}
          <div
            className={`rounded-xl p-3 border-2 transition-all ${
              cheapest === 'rakuten'
                ? 'border-amber-400 bg-red-50 shadow-sm'
                : 'border-red-100 bg-red-50/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-red-700 tracking-wide">楽天</span>
              {cheapest === 'rakuten' && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  最安
                </span>
              )}
            </div>
            {hotel.dummyPrices.rakuten !== null ? (
              <>
                <p className="text-lg font-extrabold text-gray-800 tabular-nums leading-none">
                  {formatPrice(hotel.dummyPrices.rakuten)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">/泊</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
            <a
              href={rakutenUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 block w-full text-center bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
            >
              楽天で予約 →
            </a>
          </div>

          {/* Jalan */}
          <div
            className={`rounded-xl p-3 border-2 transition-all ${
              cheapest === 'jalan'
                ? 'border-amber-400 bg-orange-50 shadow-sm'
                : 'border-orange-100 bg-orange-50/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-orange-700 tracking-wide">じゃらん</span>
              {cheapest === 'jalan' && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  最安
                </span>
              )}
            </div>
            {hotel.dummyPrices.jalan !== null ? (
              <>
                <p className="text-lg font-extrabold text-gray-800 tabular-nums leading-none">
                  {formatPrice(hotel.dummyPrices.jalan)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">/泊</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
            <a
              href={jalanUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
            >
              じゃらんで予約 →
            </a>
          </div>

          {/* Agoda */}
          <div
            className={`rounded-xl p-3 border-2 transition-all ${
              cheapest === 'agoda'
                ? 'border-amber-400 bg-[#EBF1FF] shadow-sm'
                : 'border-blue-100 bg-[#EBF1FF]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#5392F9] tracking-wide">agoda</span>
              {cheapest === 'agoda' && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  最安
                </span>
              )}
            </div>
            {hotel.dummyPrices.agoda !== null ? (
              <>
                <p className="text-lg font-extrabold text-gray-800 tabular-nums leading-none">
                  {formatPrice(hotel.dummyPrices.agoda)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">/泊</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">-</p>
            )}
            <a
              href={agodaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 block w-full text-center bg-[#5392F9] hover:bg-[#3B73E0] text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
            >
              agodaで予約 →
            </a>
          </div>
        </div>

        {showDiff && (
          <div className="mt-3 flex justify-center">
            <span className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
              他サイトより最大{formatPrice(diff)} お得
            </span>
          </div>
        )}

        {nights > 1 && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {nights}泊合計: {formatPrice(minPrice(hotel.dummyPrices) * nights)}〜
          </p>
        )}
      </div>
    </div>
  );
}
