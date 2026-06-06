import { VenueData } from '@/types';

const tokyoDomeData: VenueData = {
  venue: {
    id: 'tokyo-dome',
    name: '東京ドーム',
    address: '東京都文京区後楽1-3-61',
    description: '日本を代表する多目的スタジアム。収容人数55,000人。',
  },
  hotels: [
    {
      id: 'tokyo-dome-hotel',
      name: '東京ドームホテル',
      address: '東京都文京区後楽1-3-61',
      stars: 4,
      rakutenId: '134541',
      jalanId: '320041',
      transport: 'walk',
      travelTimeMinutes: 3,
      dummyPrices: {
        rakuten: 22000,
        jalan: 21500,
      },
      amenities: ['無料Wi-Fi', 'レストラン', 'フィットネス', '駐車場'],
    },
    {
      id: 'hotel-sunroute-suidobashi',
      name: 'ホテルサンルート水道橋',
      address: '東京都文京区本郷1-27-4',
      stars: 3,
      rakutenId: '12345',
      jalanId: '67890',
      transport: 'walk',
      travelTimeMinutes: 8,
      dummyPrices: {
        rakuten: 9800,
        jalan: 9200,
      },
      amenities: ['無料Wi-Fi', '大浴場', 'コインランドリー'],
    },
    {
      id: 'hotel-metropolitan-marunouchi',
      name: 'ホテルメトロポリタン丸の内',
      address: '東京都千代田区丸の内1-8-1',
      stars: 4,
      rakutenId: '98765',
      jalanId: '54321',
      transport: 'train',
      travelTimeMinutes: 15,
      dummyPrices: {
        rakuten: 18000,
        jalan: 17200,
      },
      amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'スパ', '駐車場'],
    },
  ],
};

export default tokyoDomeData;
