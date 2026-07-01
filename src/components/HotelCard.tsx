'use client';

import Link from 'next/link';
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
  bus: '🚌',
  taxi: '🚕',
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

const OTA_CONFIG = {
  rakuten: { label: '楽天', cheapStyle: 'bg-amber-400 text-amber-900', plainStyle: 'bg-red-50 text-red-700 border border-red-100' },
  jalan: { label: 'じゃらん', cheapStyle: 'bg-amber-400 text-amber-900', plainStyle: 'bg-orange-50 text-orange-700 border border-orange-100' },
  agoda: { label: 'agoda', cheapStyle: 'bg-amber-400 text-amber-900', plainStyle: 'bg-[#EBF1FF] text-[#5392F9] border border-[#c5d8ff]' },
} as const;

export default function HotelCard({ hotel, nights, venueId, dateQuery }: Props) {
  const urls = {
    rakuten: `https://travel.rakuten.co.jp/HOTEL/${hotel.rakutenId}/`,
    jalan: `https://www.jalan.net/yad${hotel.jalanId}/`,
    agoda: `https://www.agoda.com/hotel/${hotel.agodaId}/`,
  } as const;

  const cheapest = cheapestOta(hotel.dummyPrices);
  const detailHref = `/venues/${venueId}/hotels/${hotel.id}${dateQuery}`;

  return (
    <div className="relative border-b border-gray-100 px-3 py-2.5 hover:bg-violet-50/40 transition-colors">
      {/* Cover link — enables Ctrl/Cmd+click and right-click "open in new tab" */}
      <Link href={detailHref} className="absolute inset-0 z-0" aria-label={hotel.name} />

      <div className="relative z-10 pointer-events-none flex flex-col sm:flex-row sm:items-center gap-2">
        {/* Left: name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-gray-800 text-sm leading-tight truncate max-w-[220px] sm:max-w-xs">
              {hotel.name}
            </h3>
            <span className="text-amber-500 text-xs font-bold shrink-0">★{hotel.rating.toFixed(1)}</span>
            <span className="text-gray-400 text-xs shrink-0">({hotel.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5 flex-wrap">
            <span className="shrink-0">🚉{hotel.nearestStation}</span>
            <span className="shrink-0">🛏️{hotel.roomSizeSqm}㎡</span>
            {hotel.transportOptions.map((opt) => (
              <span key={opt.method} className="shrink-0 text-violet-600 font-medium">
                {TRANSPORT_ICON[opt.method]}{opt.minutes}分{opt.cost > 0 ? `/${formatPrice(opt.cost)}` : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Right: price chips */}
        <div className="grid grid-cols-3 gap-1.5 pointer-events-auto shrink-0 sm:w-[300px]">
          {(['rakuten', 'jalan', 'agoda'] as const).map((ota) => {
            const price = hotel.dummyPrices[ota];
            const config = OTA_CONFIG[ota];
            const isCheapest = cheapest === ota && price !== null;
            return (
              <a
                key={ota}
                href={urls[ota]}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center rounded-lg px-1 py-1.5 leading-tight transition-all ${
                  isCheapest ? config.cheapStyle : config.plainStyle
                }`}
              >
                <span className="text-[10px] font-bold opacity-80">{config.label}</span>
                <span className="text-xs font-extrabold tabular-nums">
                  {price !== null ? formatPrice(price) : '-'}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {nights > 1 && (
        <p className="relative z-10 text-right text-[11px] text-gray-400 mt-1 sm:hidden">
          {nights}泊合計: {formatPrice(minPrice(hotel.dummyPrices) * nights)}〜
        </p>
      )}
    </div>
  );
}
