import { Hotel } from '@/types';

interface Props {
  hotel: Hotel;
  nights: number;
}

const TRANSPORT_ICON: Record<string, string> = {
  walk: '🚶',
  train: '🚃',
};

const TRANSPORT_LABEL: Record<string, string> = {
  walk: '徒歩',
  train: '電車',
};

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-yellow-400 text-sm">
      {'★'.repeat(count)}
      <span className="text-gray-200">{'★'.repeat(5 - count)}</span>
    </span>
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function HotelCard({ hotel, nights }: Props) {
  const rakutenUrl = `https://travel.rakuten.co.jp/HOTEL/${hotel.rakutenId}/`;
  const jalanUrl = `https://www.jalan.net/yad${hotel.jalanId}/`;

  const rakutenCheaper = hotel.dummyPrices.rakuten < hotel.dummyPrices.jalan;
  const jalanCheaper = hotel.dummyPrices.jalan < hotel.dummyPrices.rakuten;
  const totalRakuten = hotel.dummyPrices.rakuten * nights;
  const totalJalan = hotel.dummyPrices.jalan * nights;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Hotel header */}
        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{hotel.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating count={hotel.stars} />
              <span className="text-xs text-gray-400">{hotel.stars}つ星</span>
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
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-indigo-100 shrink-0">
            <span className="text-base">{TRANSPORT_ICON[hotel.transport]}</span>
            <span>{TRANSPORT_LABEL[hotel.transport]}</span>
            <span className="font-bold text-indigo-800">{hotel.travelTimeMinutes}分</span>
          </div>
        </div>

        {/* Price comparison */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
          {/* Rakuten Travel */}
          <div
            className={`rounded-xl p-4 border-2 transition-all ${
              rakutenCheaper
                ? 'border-red-400 bg-red-50 shadow-sm'
                : 'border-red-100 bg-red-50/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-600 rounded-full" />
                <span className="text-xs font-bold text-red-700 tracking-wide">楽天トラベル</span>
              </div>
              {rakutenCheaper && (
                <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  最安値
                </span>
              )}
            </div>
            <p className="text-2xl font-extrabold text-gray-800 leading-none">
              {formatPrice(hotel.dummyPrices.rakuten)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              /泊{nights > 1 ? ` × ${nights}泊 = ${formatPrice(totalRakuten)}` : ''}
            </p>
            <a
              href={rakutenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              楽天トラベルで予約
            </a>
          </div>

          {/* Jalan */}
          <div
            className={`rounded-xl p-4 border-2 transition-all ${
              jalanCheaper
                ? 'border-orange-400 bg-orange-50 shadow-sm'
                : 'border-orange-100 bg-orange-50/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-xs font-bold text-orange-700 tracking-wide">じゃらん</span>
              </div>
              {jalanCheaper && (
                <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  最安値
                </span>
              )}
            </div>
            <p className="text-2xl font-extrabold text-gray-800 leading-none">
              {formatPrice(hotel.dummyPrices.jalan)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              /泊{nights > 1 ? ` × ${nights}泊 = ${formatPrice(totalJalan)}` : ''}
            </p>
            <a
              href={jalanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              じゃらんで予約
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 mt-3">
          ※ 表示価格はダミーデータです。実際の価格はサイトでご確認ください。
        </p>
      </div>
    </div>
  );
}
