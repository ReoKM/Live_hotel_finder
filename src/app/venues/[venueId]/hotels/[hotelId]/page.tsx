import { getVenueById } from '@/data/venues';
import { Metadata } from 'next';
import Link from 'next/link';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import Header from '@/components/Header';
import HotelDetailClient from './HotelDetailClient';

interface Props {
  params: { venueId: string; hotelId: string };
  searchParams: { checkin?: string; checkout?: string };
}

const TRANSPORT_ICON: Record<string, string> = { walk: '🚶', train: '🚃' };
const TRANSPORT_LABEL: Record<string, string> = { walk: '徒歩', train: '電車' };
const TRANSPORT_OPTION_ICON: Record<string, string> = { walk: '🚶', train: '🚃', bus: '🚌', taxi: '🚕' };
const TRANSPORT_OPTION_LABEL: Record<string, string> = { walk: '徒歩', train: '電車', bus: 'バス', taxi: 'タクシー' };

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(price);
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

  const nights = (() => {
    if (!checkin || !checkout) return 1;
    try {
      return Math.max(1, differenceInCalendarDays(parseISO(checkout), parseISO(checkin)));
    } catch {
      return 1;
    }
  })();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`;

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
          <p className="text-sm text-gray-500 mt-1">🚉 最寄り駅: {hotel.nearestStation}</p>

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

        {/* Room info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">客室情報</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs">部屋の広さ</p>
              <p className="font-bold text-gray-800">{hotel.roomSizeSqm}㎡〜</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">ベッドタイプ</p>
              <p className="font-bold text-gray-800">{hotel.bedType}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">チェックイン</p>
              <p className="font-bold text-gray-800">{hotel.checkInTime}〜</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">チェックアウト</p>
              <p className="font-bold text-gray-800">〜{hotel.checkOutTime}</p>
            </div>
          </div>
        </div>

        {/* Access / transport options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">{venue.name}までのアクセス</h3>
          <div className="space-y-2">
            {hotel.transportOptions.map((opt) => (
              <div
                key={opt.method}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{TRANSPORT_OPTION_ICON[opt.method]}</span>
                  <span className="text-sm font-medium text-gray-700">{TRANSPORT_OPTION_LABEL[opt.method]}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 tabular-nums">{opt.minutes}分</p>
                  <p className="text-xs text-gray-400 tabular-nums">{opt.cost === 0 ? '無料' : formatPrice(opt.cost)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price comparison + plan selector + bottom CTA (interactive) */}
        <HotelDetailClient hotel={hotel} nights={nights} />

        {/* Affiliate disclosure */}
        <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed mt-4">
          <p className="font-semibold mb-1">【アフィリエイト開示・価格免責】</p>
          <p>
            当ページには楽天トラベル・じゃらん・agodaへのアフィリエイトリンクが含まれています。
            リンクから予約された場合、当サイトに手数料が支払われる場合があります。
            表示価格はダミーデータです。実際の料金・空室状況・宿泊プランは各予約サイトにてご確認ください。
          </p>
        </div>
      </main>
    </div>
  );
}
