import { getVenueById } from '@/data/venues';
import { Metadata } from 'next';
import Link from 'next/link';
import { HotelPrices } from '@/types';
import Header from '@/components/Header';

interface Props {
  params: { venueId: string; hotelId: string };
  searchParams: { checkin?: string; checkout?: string };
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getVenueById(params.venueId);
  const hotel = data?.hotels.find((h) => h.id === params.hotelId);
  if (!data || !hotel) {
    return { title: 'ホテル詳細 | Live Hotel Finder' };
  }
  return {
    title: `${hotel.name} | ${data.venue.name}から${hotel.travelTimeMinutes}分 | Live Hotel Finder`,
    description: `${hotel.name}の楽天トラベル・じゃらん・agoda料金を比較。${data.venue.name}から${hotel.travelTimeMinutes}分。`,
  };
}

export default function HotelDetailPage({ params, searchParams }: Props) {
  const data = getVenueById(params.venueId);
  const hotel = data?.hotels.find((h) => h.id === params.hotelId);

  if (!data || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">ホテルが見つかりません</p>
      </div>
    );
  }

  const { venue } = data;
  const { checkin, checkout } = searchParams;
  const dateQuery = (() => {
    if (!checkin || !checkout) return '';
    const p = new URLSearchParams();
    p.set('checkin', checkin);
    p.set('checkout', checkout);
    return `?${p.toString()}`;
  })();

  const rakutenUrl = `https://travel.rakuten.co.jp/HOTEL/${hotel.rakutenId}/`;
  const jalanUrl = `https://www.jalan.net/yad${hotel.jalanId}/`;
  const agodaUrl = `https://www.agoda.com/hotel/${hotel.agodaId}/`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`;

  const bestOtaName = cheapestOtaName(hotel.dummyPrices);
  const bestOtaUrl = cheapestOtaUrl(hotel.dummyPrices, hotel.rakutenId, hotel.jalanId, hotel.agodaId);
  const bestPrice = minPrice(hotel.dummyPrices);

  const TRANSPORT_ICON: Record<string, string> = { walk: '🚶', train: '🚃' };
  const TRANSPORT_LABEL: Record<string, string> = { walk: '徒歩', train: '電車' };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Content with bottom padding for fixed bar */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 pb-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-violet-600 transition-colors">トップ</Link>
          <span>›</span>
          <Link href={`/venues/${venue.id}${dateQuery}`} className="hover:text-violet-600 transition-colors">
            {venue.name}
          </Link>
          <span>›</span>
          <span className="text-gray-600">{hotel.name}</span>
        </nav>

        {/* Hotel name & rating */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">{hotel.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400">{'★'.repeat(hotel.stars)}</span>
                <span className="text-amber-500 font-bold text-sm">★{hotel.rating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">{hotel.reviewCount.toLocaleString()}件</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-violet-50 text-violet-700 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-violet-200 shrink-0">
              <span>{TRANSPORT_ICON[hotel.transport]}</span>
              <span>{TRANSPORT_LABEL[hotel.transport]}</span>
              <span className="font-bold">{hotel.travelTimeMinutes}分</span>
            </div>
          </div>

          {/* Address */}
          <p className="text-sm text-gray-600 mt-3">{hotel.address}</p>

          {/* Google Maps link */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>📍</span>
            <span>Google マップで見る</span>
          </a>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
            {hotel.amenities.map((amenity) => (
              <span
                key={amenity}
                className="text-xs bg-violet-50 border border-violet-100 text-violet-700 px-2 py-0.5 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Price comparison */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">料金比較</h3>
          <div className="space-y-3">
            {/* Rakuten */}
            <div className={`bg-white rounded-xl shadow-sm border-2 p-5 ${
              cheapestOtaName(hotel.dummyPrices) === '楽天トラベル' ? 'border-amber-400' : 'border-red-100'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full" />
                  <span className="font-bold text-red-700">楽天トラベル</span>
                </div>
                {cheapestOtaName(hotel.dummyPrices) === '楽天トラベル' && (
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    最安値
                  </span>
                )}
              </div>
              {hotel.dummyPrices.rakuten !== null ? (
                <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                  {formatPrice(hotel.dummyPrices.rakuten)}<span className="text-base font-normal text-gray-500">/泊</span>
                </p>
              ) : (
                <p className="text-gray-400">料金を確認</p>
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
              cheapestOtaName(hotel.dummyPrices) === 'じゃらん' ? 'border-amber-400' : 'border-orange-100'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="font-bold text-orange-700">じゃらん</span>
                </div>
                {cheapestOtaName(hotel.dummyPrices) === 'じゃらん' && (
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    最安値
                  </span>
                )}
              </div>
              {hotel.dummyPrices.jalan !== null ? (
                <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                  {formatPrice(hotel.dummyPrices.jalan)}<span className="text-base font-normal text-gray-500">/泊</span>
                </p>
              ) : (
                <p className="text-gray-400">料金を確認</p>
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
              cheapestOtaName(hotel.dummyPrices) === 'agoda' ? 'border-amber-400' : 'border-[#c5d8ff]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#5392F9] rounded-full" />
                  <span className="font-bold text-[#5392F9]">agoda</span>
                </div>
                {cheapestOtaName(hotel.dummyPrices) === 'agoda' && (
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    最安値
                  </span>
                )}
              </div>
              {hotel.dummyPrices.agoda !== null ? (
                <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                  {formatPrice(hotel.dummyPrices.agoda)}<span className="text-base font-normal text-gray-500">/泊</span>
                </p>
              ) : (
                <p className="text-gray-400">料金を確認</p>
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

        {/* Affiliate disclosure */}
        <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
          <p className="font-semibold mb-1">【アフィリエイト開示・価格免責】</p>
          <p>
            当ページには楽天トラベル・じゃらん・agodaへのアフィリエイトリンクが含まれています。
            リンクから予約された場合、当サイトに手数料が支払われる場合があります。
            表示価格はダミーデータです。実際の料金・空室状況は各予約サイトにてご確認ください。
          </p>
        </div>
      </main>

      {/* Fixed bottom CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t shadow-2xl py-3 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500">最安値</p>
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
    </div>
  );
}
