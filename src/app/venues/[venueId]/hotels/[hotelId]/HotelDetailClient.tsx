'use client';

import { useState } from 'react';
import { Hotel, HotelPrices } from '@/types';

interface Props {
  hotel: Hotel;
  nights: number;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(price);
}

function minPrice(p: HotelPrices): number | null {
  const values = [p.rakuten, p.jalan, p.agoda].filter((x): x is number => x !== null);
  return values.length > 0 ? Math.min(...values) : null;
}

function cheapestOtaName(p: HotelPrices): string {
  const min = minPrice(p);
  if (min === null) return '料金確認';
  if (p.rakuten === min) return '楽天トラベル';
  if (p.jalan === min) return 'じゃらん';
  return 'agoda';
}

function cheapestOtaUrl(p: HotelPrices, rakutenId: string, jalanId: string, agodaId: string): string {
  const min = minPrice(p);
  if (min === null || p.rakuten === min) return `https://travel.rakuten.co.jp/HOTEL/${rakutenId}/`;
  if (p.jalan === min) return `https://www.jalan.net/yad${jalanId}/`;
  return `https://www.agoda.com/hotel/${agodaId}/`;
}

export default function HotelDetailClient({ hotel, nights }: Props) {
  const [planId, setPlanId] = useState(hotel.plans[0]?.id ?? 'room-only');
  const plan = hotel.plans.find((p) => p.id === planId) ?? hotel.plans[0];

  const adjustedPrices: HotelPrices = {
    rakuten: hotel.dummyPrices.rakuten !== null ? hotel.dummyPrices.rakuten + plan.priceDiff : null,
    jalan: hotel.dummyPrices.jalan !== null ? hotel.dummyPrices.jalan + plan.priceDiff : null,
    agoda: hotel.dummyPrices.agoda !== null ? hotel.dummyPrices.agoda + plan.priceDiff : null,
  };

  const rakutenUrl = `https://travel.rakuten.co.jp/HOTEL/${hotel.rakutenId}/`;
  const jalanUrl = `https://www.jalan.net/yad${hotel.jalanId}/`;
  const agodaUrl = `https://www.agoda.com/hotel/${hotel.agodaId}/`;

  const bestOtaName = cheapestOtaName(adjustedPrices);
  const bestOtaUrl = cheapestOtaUrl(adjustedPrices, hotel.rakutenId, hotel.jalanId, hotel.agodaId);
  const bestPrice = minPrice(adjustedPrices);

  return (
    <>
      {/* Plan selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">宿泊プラン</h3>
        <div className="grid grid-cols-3 gap-2">
          {hotel.plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlanId(p.id)}
              className={`rounded-xl border-2 px-2 py-3 text-center transition-all ${
                planId === p.id
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              <p className="text-sm font-bold">{p.name}</p>
              <p className="text-xs mt-1 tabular-nums">
                {p.priceDiff > 0 ? `+${formatPrice(p.priceDiff)}` : '基本料金'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Price comparison */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">料金比較</h3>
        <div className="space-y-3">
          {/* Rakuten */}
          <div className={`bg-white rounded-xl shadow-sm border-2 p-5 ${
            cheapestOtaName(adjustedPrices) === '楽天トラベル' ? 'border-amber-400' : 'border-red-100'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full" />
                <span className="font-bold text-red-700">楽天トラベル</span>
                {hotel.otaRatings.rakuten !== null && (
                  <span className="text-xs text-amber-500 font-bold">★{hotel.otaRatings.rakuten.toFixed(1)}</span>
                )}
              </div>
              {cheapestOtaName(adjustedPrices) === '楽天トラベル' && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  最安値
                </span>
              )}
            </div>
            {adjustedPrices.rakuten !== null ? (
              <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                {formatPrice(adjustedPrices.rakuten)}<span className="text-base font-normal text-gray-500">/泊</span>
              </p>
            ) : (
              <p className="text-gray-400">料金を確認</p>
            )}
            {nights > 1 && adjustedPrices.rakuten !== null && (
              <p className="text-xs text-gray-400 mt-1">{nights}泊合計: {formatPrice(adjustedPrices.rakuten * nights)}</p>
            )}
            <a
              href={rakutenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              楽天トラベルで予約する →
            </a>
          </div>

          {/* Jalan */}
          <div className={`bg-white rounded-xl shadow-sm border-2 p-5 ${
            cheapestOtaName(adjustedPrices) === 'じゃらん' ? 'border-amber-400' : 'border-orange-100'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="font-bold text-orange-700">じゃらん</span>
                {hotel.otaRatings.jalan !== null && (
                  <span className="text-xs text-amber-500 font-bold">★{hotel.otaRatings.jalan.toFixed(1)}</span>
                )}
              </div>
              {cheapestOtaName(adjustedPrices) === 'じゃらん' && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  最安値
                </span>
              )}
            </div>
            {adjustedPrices.jalan !== null ? (
              <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                {formatPrice(adjustedPrices.jalan)}<span className="text-base font-normal text-gray-500">/泊</span>
              </p>
            ) : (
              <p className="text-gray-400">料金を確認</p>
            )}
            {nights > 1 && adjustedPrices.jalan !== null && (
              <p className="text-xs text-gray-400 mt-1">{nights}泊合計: {formatPrice(adjustedPrices.jalan * nights)}</p>
            )}
            <a
              href={jalanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              じゃらんで予約する →
            </a>
          </div>

          {/* Agoda */}
          <div className={`rounded-xl shadow-sm border-2 p-5 bg-[#EBF1FF] ${
            cheapestOtaName(adjustedPrices) === 'agoda' ? 'border-amber-400' : 'border-[#c5d8ff]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#5392F9] rounded-full" />
                <span className="font-bold text-[#5392F9]">agoda</span>
                {hotel.otaRatings.agoda !== null && (
                  <span className="text-xs text-amber-500 font-bold">★{hotel.otaRatings.agoda.toFixed(1)}</span>
                )}
              </div>
              {cheapestOtaName(adjustedPrices) === 'agoda' && (
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  最安値
                </span>
              )}
            </div>
            {adjustedPrices.agoda !== null ? (
              <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                {formatPrice(adjustedPrices.agoda)}<span className="text-base font-normal text-gray-500">/泊</span>
              </p>
            ) : (
              <p className="text-gray-400">料金を確認</p>
            )}
            {nights > 1 && adjustedPrices.agoda !== null && (
              <p className="text-xs text-gray-400 mt-1">{nights}泊合計: {formatPrice(adjustedPrices.agoda * nights)}</p>
            )}
            <a
              href={agodaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center bg-[#5392F9] hover:bg-[#3B73E0] text-white font-bold py-3 rounded-xl transition-colors"
            >
              agodaで予約する →
            </a>
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t shadow-2xl py-3 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">最安値（{plan.name}）</p>
            {bestPrice !== null ? (
              <p className="font-extrabold text-gray-900 tabular-nums text-lg leading-tight">
                {formatPrice(bestPrice)}<span className="text-xs font-normal text-gray-500">/泊</span>
              </p>
            ) : (
              <p className="font-bold text-gray-900 text-base">料金確認</p>
            )}
            <p className="text-xs text-gray-500">{bestOtaName}</p>
          </div>
          <a
            href={bestOtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 max-w-xs text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            今すぐ予約
          </a>
        </div>
      </div>
    </>
  );
}
