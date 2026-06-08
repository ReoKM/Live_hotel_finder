import { VenueData } from '@/types';

export const allVenues: VenueData[] = [
  {
    venue: { id: 'tokyo-dome', name: '東京ドーム', aliases: ['東京ドーム', '東ドーム'], address: '東京都文京区後楽1-3-61', prefecture: '東京都', latitude: 35.7057, longitude: 139.7519 },
    hotels: [
      { id: 'tokyo-dome-hotel', name: '東京ドームホテル', address: '東京都文京区後楽1-3-61', stars: 4, rating: 4.3, reviewCount: 2841, rakutenId: '134541', jalanId: '320041', agodaId: '47823', transport: 'walk', travelTimeMinutes: 3, dummyPrices: { rakuten: 22000, jalan: 21500, agoda: 20800 }, amenities: ['無料Wi-Fi', 'レストラン', 'フィットネス', '駐車場'], latitude: 35.7061, longitude: 139.7515 },
      { id: 'hotel-sunroute-suidobashi', name: 'ホテルサンルート水道橋', address: '東京都文京区本郷1-27-4', stars: 3, rating: 3.8, reviewCount: 1203, rakutenId: '12301', jalanId: '67801', agodaId: '11201', transport: 'walk', travelTimeMinutes: 8, dummyPrices: { rakuten: 9800, jalan: 9200, agoda: 8900 }, amenities: ['無料Wi-Fi', '大浴場', 'コインランドリー'], latitude: 35.7080, longitude: 139.7535 },
      { id: 'hotel-bellclassic-tokyo', name: 'ホテルベルクラシック東京', address: '東京都文京区水道1-3-23', stars: 3, rating: 3.6, reviewCount: 892, rakutenId: '12302', jalanId: '67802', agodaId: '11202', transport: 'walk', travelTimeMinutes: 12, dummyPrices: { rakuten: 8500, jalan: 7800, agoda: 7200 }, amenities: ['無料Wi-Fi', '朝食付きプランあり'], latitude: 35.7090, longitude: 139.7480 },
      { id: 'hotel-metropolitan-marunouchi', name: 'ホテルメトロポリタン丸の内', address: '東京都千代田区丸の内1-8-1', stars: 4, rating: 4.2, reviewCount: 3102, rakutenId: '98765', jalanId: '54321', agodaId: '88765', transport: 'train', travelTimeMinutes: 12, dummyPrices: { rakuten: 18000, jalan: 17200, agoda: 16500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'スパ', '駐車場'], latitude: 35.6811, longitude: 139.7660 },
      { id: 'prince-park-tower', name: 'ザ・プリンスパークタワー東京', address: '東京都港区芝公園4-8-1', stars: 5, rating: 4.5, reviewCount: 4521, rakutenId: '98766', jalanId: '54322', agodaId: '88766', transport: 'train', travelTimeMinutes: 20, dummyPrices: { rakuten: 32000, jalan: 30000, agoda: 28500 }, amenities: ['無料Wi-Fi', 'レストラン', 'スパ', 'プール', '駐車場'], latitude: 35.6561, longitude: 139.7476 },
    ],
  },
  {
    venue: { id: 'yokohama-arena', name: '横浜アリーナ', aliases: ['横浜アリーナ', '横アリ'], address: '神奈川県横浜市港北区新横浜3-10', prefecture: '神奈川県', latitude: 35.5098, longitude: 139.6135 },
    hotels: [
      { id: 'shinyokohama-prince', name: '新横浜プリンスホテル', address: '神奈川県横浜市港北区新横浜3-4', stars: 4, rating: 4.1, reviewCount: 5203, rakutenId: '20101', jalanId: '80101', agodaId: '30101', transport: 'walk', travelTimeMinutes: 3, dummyPrices: { rakuten: 15000, jalan: 14200, agoda: 13800 }, amenities: ['無料Wi-Fi', 'レストラン', 'プール', '駐車場'], latitude: 35.5100, longitude: 139.6127 },
      { id: 'dormy-inn-shinyokohama', name: 'ドーミーイン新横浜', address: '神奈川県横浜市港北区新横浜2-5-13', stars: 3, rating: 4.0, reviewCount: 2105, rakutenId: '20102', jalanId: '80102', agodaId: '30102', transport: 'walk', travelTimeMinutes: 7, dummyPrices: { rakuten: 7800, jalan: 7200, agoda: 6900 }, amenities: ['無料Wi-Fi', '天然温泉大浴場', '夜鳴きそば'], latitude: 35.5115, longitude: 139.6120 },
      { id: 'hotel-sunroute-shinyokohama', name: 'ホテルサンルート新横浜', address: '神奈川県横浜市港北区新横浜2-13-16', stars: 3, rating: 3.7, reviewCount: 1432, rakutenId: '20103', jalanId: '80103', agodaId: '30103', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 8200, jalan: 7800, agoda: 7500 }, amenities: ['無料Wi-Fi', 'レストラン'], latitude: 35.5120, longitude: 139.6140 },
      { id: 'yokohama-royal-park', name: '横浜ロイヤルパークホテル', address: '神奈川県横浜市西区みなとみらい2-2-1-3', stars: 5, rating: 4.4, reviewCount: 6012, rakutenId: '20104', jalanId: '80104', agodaId: '30104', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 22000, jalan: 21000, agoda: 19500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'スパ', 'フィットネス'], latitude: 35.4563, longitude: 139.6319 },
      { id: 'hotel-monterey-yokohama', name: 'ホテルモントレ横浜', address: '神奈川県横浜市中区山下町1-1', stars: 4, rating: 3.9, reviewCount: 2341, rakutenId: '20105', jalanId: '80105', agodaId: '30105', transport: 'train', travelTimeMinutes: 20, dummyPrices: { rakuten: 11000, jalan: 10500, agoda: 9800 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー'], latitude: 35.4437, longitude: 139.6523 },
    ],
  },
  {
    venue: { id: 'saitama-super-arena', name: 'さいたまスーパーアリーナ', aliases: ['さいたまスーパーアリーナ', 'たまアリ', 'SSA'], address: '埼玉県さいたま市中央区新都心8', prefecture: '埼玉県', latitude: 35.8952, longitude: 139.6313 },
    hotels: [
      { id: 'hotel-metropolitan-saitama', name: 'ホテルメトロポリタンさいたま新都心', address: '埼玉県さいたま市大宮区錦町682-2', stars: 4, rating: 4.0, reviewCount: 3421, rakutenId: '30101', jalanId: '90101', agodaId: '40101', transport: 'walk', travelTimeMinutes: 5, dummyPrices: { rakuten: 12000, jalan: 11500, agoda: 10800 }, amenities: ['無料Wi-Fi', 'レストラン', 'フィットネス'], latitude: 35.8968, longitude: 139.6311 },
      { id: 'brillante-musashino', name: 'ホテルブリランテ武蔵野', address: '埼玉県さいたま市中央区新都心7-2', stars: 3, rating: 3.8, reviewCount: 1823, rakutenId: '30102', jalanId: '90102', agodaId: '40102', transport: 'walk', travelTimeMinutes: 3, dummyPrices: { rakuten: 8500, jalan: 8000, agoda: 7500 }, amenities: ['無料Wi-Fi', 'レストラン', '駐車場'], latitude: 35.8960, longitude: 139.6320 },
      { id: 'daiwa-roynet-saitama', name: 'ダイワロイネットホテルさいたま新都心', address: '埼玉県さいたま市中央区新都心11-2', stars: 3, rating: 3.9, reviewCount: 2012, rakutenId: '30103', jalanId: '90103', agodaId: '40103', transport: 'walk', travelTimeMinutes: 8, dummyPrices: { rakuten: 9500, jalan: 9000, agoda: 8500 }, amenities: ['無料Wi-Fi', 'コインランドリー'], latitude: 35.8975, longitude: 139.6290 },
      { id: 'saitama-washington', name: 'さいたまワシントンホテル', address: '埼玉県さいたま市大宮区桜木町1-7-5', stars: 3, rating: 3.6, reviewCount: 1543, rakutenId: '30104', jalanId: '90104', agodaId: '40104', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 7200, jalan: 6800, agoda: 6500 }, amenities: ['無料Wi-Fi', 'レストラン'], latitude: 35.9020, longitude: 139.6237 },
      { id: 'comfort-hotel-omiya', name: 'コンフォートホテル大宮', address: '埼玉県さいたま市大宮区宮町1-86', stars: 3, rating: 3.5, reviewCount: 1102, rakutenId: '30105', jalanId: '90105', agodaId: '40105', transport: 'train', travelTimeMinutes: 12, dummyPrices: { rakuten: 6500, jalan: 6200, agoda: 5800 }, amenities: ['無料Wi-Fi', '朝食無料'], latitude: 35.9057, longitude: 139.6233 },
    ],
  },
  {
    venue: { id: 'k-arena-yokohama', name: 'Kアリーナ横浜', aliases: ['Kアリーナ横浜', 'Kアリーナ', 'Kアリ'], address: '神奈川県横浜市西区みなとみらい3-4-1', prefecture: '神奈川県', latitude: 35.4582, longitude: 139.6309 },
    hotels: [
      { id: 'intercontinental-yokohama-pier8', name: 'インターコンチネンタル横浜Pier8', address: '神奈川県横浜市西区みなとみらい1-1-1', stars: 5, rating: 4.6, reviewCount: 3201, rakutenId: '40101', jalanId: '10101', agodaId: '50101', transport: 'walk', travelTimeMinutes: 5, dummyPrices: { rakuten: 42000, jalan: 40000, agoda: 38500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'スパ', 'フィットネス', '駐車場'], latitude: 35.4600, longitude: 139.6297 },
      { id: 'dormy-inn-premium-mm', name: 'ドーミーイン PREMIUM 横浜みなとみらい', address: '神奈川県横浜市西区みなとみらい4-2-4', stars: 4, rating: 4.2, reviewCount: 4102, rakutenId: '40102', jalanId: '10102', agodaId: '50102', transport: 'walk', travelTimeMinutes: 12, dummyPrices: { rakuten: 15000, jalan: 14200, agoda: 13500 }, amenities: ['無料Wi-Fi', '天然温泉大浴場', '夜鳴きそば'], latitude: 35.4572, longitude: 139.6328 },
      { id: 'bay-sheraton-yokohama', name: '横浜ベイシェラトンホテル&タワーズ', address: '神奈川県横浜市西区高島2-2-1', stars: 5, rating: 4.4, reviewCount: 5823, rakutenId: '40103', jalanId: '10103', agodaId: '50103', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 28000, jalan: 27000, agoda: 25000 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'プール', 'スパ'], latitude: 35.4668, longitude: 139.6243 },
      { id: 'jal-city-kannai', name: 'ホテルJALシティ関内横浜', address: '神奈川県横浜市中区日本大通36', stars: 3, rating: 3.9, reviewCount: 2103, rakutenId: '40104', jalanId: '10104', agodaId: '50104', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 12000, jalan: 11500, agoda: 10800 }, amenities: ['無料Wi-Fi', 'レストラン', '駐車場'], latitude: 35.4442, longitude: 139.6431 },
      { id: 'daiwa-roynet-kannai', name: 'ダイワロイネットホテル横浜関内', address: '神奈川県横浜市中区相生町4-65-1', stars: 3, rating: 3.8, reviewCount: 1782, rakutenId: '40105', jalanId: '10105', agodaId: '50105', transport: 'train', travelTimeMinutes: 18, dummyPrices: { rakuten: 9800, jalan: 9200, agoda: 8800 }, amenities: ['無料Wi-Fi', 'コインランドリー'], latitude: 35.4451, longitude: 139.6432 },
    ],
  },
  {
    venue: { id: 'osaka-jo-hall', name: '大阪城ホール', aliases: ['大阪城ホール', '城ホ', 'じょーほ', '大城'], address: '大阪府大阪市中央区大阪城3-1', prefecture: '大阪府', latitude: 34.6869, longitude: 135.5252 },
    hotels: [
      { id: 'new-otani-osaka', name: 'ホテルニューオータニ大阪', address: '大阪府大阪市中央区城見1-4-1', stars: 5, rating: 4.3, reviewCount: 4821, rakutenId: '50101', jalanId: '20101', agodaId: '60101', transport: 'walk', travelTimeMinutes: 8, dummyPrices: { rakuten: 22000, jalan: 21000, agoda: 19500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'プール', 'スパ'], latitude: 34.6893, longitude: 135.5284 },
      { id: 'omo7-osaka', name: 'OMO7大阪 by 星野リゾート', address: '大阪府大阪市天王寺区大道4-1-24', stars: 4, rating: 4.2, reviewCount: 2103, rakutenId: '50102', jalanId: '20102', agodaId: '60102', transport: 'train', travelTimeMinutes: 10, dummyPrices: { rakuten: 14000, jalan: 13500, agoda: 12800 }, amenities: ['無料Wi-Fi', 'レストラン', '大浴場'], latitude: 34.6552, longitude: 135.5236 },
      { id: 'monterey-lasseur-osaka', name: 'ホテルモントレラスール大阪', address: '大阪府大阪市中央区東心斎橋2-2-22', stars: 4, rating: 3.9, reviewCount: 3201, rakutenId: '50103', jalanId: '20103', agodaId: '60103', transport: 'walk', travelTimeMinutes: 12, dummyPrices: { rakuten: 10500, jalan: 9800, agoda: 9200 }, amenities: ['無料Wi-Fi', 'レストラン'], latitude: 34.6695, longitude: 135.5079 },
      { id: 'dormy-inn-shinsaibashi', name: 'ドーミーイン心斎橋', address: '大阪府大阪市中央区西心斎橋1-9-12', stars: 3, rating: 4.0, reviewCount: 5012, rakutenId: '50104', jalanId: '20104', agodaId: '60104', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 9800, jalan: 9200, agoda: 8800 }, amenities: ['無料Wi-Fi', '天然温泉大浴場', '夜鳴きそば'], latitude: 34.6716, longitude: 135.4994 },
      { id: 'super-hotel-tennoji', name: 'スーパーホテル大阪・天王寺', address: '大阪府大阪市天王寺区大道2-5-23', stars: 3, rating: 3.7, reviewCount: 1823, rakutenId: '50105', jalanId: '20105', agodaId: '60105', transport: 'train', travelTimeMinutes: 20, dummyPrices: { rakuten: 6200, jalan: 5800, agoda: 5500 }, amenities: ['無料Wi-Fi', '天然温泉', '朝食無料'], latitude: 34.6554, longitude: 135.5108 },
    ],
  },
  {
    venue: { id: 'kyocera-dome', name: '京セラドーム大阪', aliases: ['京セラドーム大阪', '京セラ', 'みずほPayPayドーム大阪', 'オリックス'], address: '大阪府大阪市西区千代崎3-中2-1', prefecture: '大阪府', latitude: 34.6757, longitude: 135.4726 },
    hotels: [
      { id: 'ark-hotel-shinsaibashi', name: 'アークホテル大阪心斎橋', address: '大阪府大阪市中央区東心斎橋1-18-18', stars: 3, rating: 3.8, reviewCount: 2341, rakutenId: '60101', jalanId: '25101', agodaId: '70101', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 8800, jalan: 8200, agoda: 7800 }, amenities: ['無料Wi-Fi', 'コンビニ隣接'], latitude: 34.6716, longitude: 135.5073 },
      { id: 'hotel-monterey-osaka', name: 'ホテルモントレ大阪', address: '大阪府大阪市北区梅田3-3-45', stars: 4, rating: 4.1, reviewCount: 3102, rakutenId: '60102', jalanId: '25102', agodaId: '70102', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 11000, jalan: 10500, agoda: 9800 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー'], latitude: 34.7012, longitude: 135.4977 },
      { id: 'daiwa-roynet-kitahama', name: 'ダイワロイネットホテル大阪北浜', address: '大阪府大阪市中央区北浜2-1-21', stars: 3, rating: 3.9, reviewCount: 2012, rakutenId: '60103', jalanId: '25103', agodaId: '70103', transport: 'train', travelTimeMinutes: 12, dummyPrices: { rakuten: 9500, jalan: 9000, agoda: 8500 }, amenities: ['無料Wi-Fi', 'コインランドリー'], latitude: 34.6886, longitude: 135.5085 },
      { id: 'dormy-inn-osaka-umeda', name: 'ドーミーイン大阪梅田', address: '大阪府大阪市北区芝田2-4-5', stars: 3, rating: 4.1, reviewCount: 4523, rakutenId: '60104', jalanId: '25104', agodaId: '70104', transport: 'train', travelTimeMinutes: 18, dummyPrices: { rakuten: 8500, jalan: 8000, agoda: 7500 }, amenities: ['無料Wi-Fi', '天然温泉大浴場', '夜鳴きそば'], latitude: 34.7034, longitude: 135.4966 },
      { id: 'hotel-wing-namba', name: 'ホテルウィングインターナショナル大阪難波', address: '大阪府大阪市浪速区難波中1-12-8', stars: 3, rating: 3.7, reviewCount: 1543, rakutenId: '60105', jalanId: '25105', agodaId: '70105', transport: 'train', travelTimeMinutes: 20, dummyPrices: { rakuten: 7200, jalan: 6800, agoda: 6500 }, amenities: ['無料Wi-Fi', 'コインランドリー'], latitude: 34.6623, longitude: 135.5023 },
    ],
  },
  {
    venue: { id: 'vantelin-dome', name: 'バンテリンドームナゴヤ', aliases: ['バンテリンドームナゴヤ', 'ナゴドーム', 'バンテリン', 'ナゴヤドーム'], address: '愛知県名古屋市東区大幸南1-1-1', prefecture: '愛知県', latitude: 35.1850, longitude: 136.9479 },
    hotels: [
      { id: 'hotel-sunroute-nagoya', name: 'ホテルサンルートナゴヤ', address: '愛知県名古屋市中村区椿町15-22', stars: 3, rating: 3.7, reviewCount: 1823, rakutenId: '70101', jalanId: '35101', agodaId: '80101', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 8200, jalan: 7800, agoda: 7200 }, amenities: ['無料Wi-Fi', 'レストラン'], latitude: 35.1717, longitude: 136.8840 },
      { id: 'dormy-inn-nagoya', name: 'ドーミーイン名古屋', address: '愛知県名古屋市中区錦3-19-12', stars: 3, rating: 4.0, reviewCount: 3421, rakutenId: '70102', jalanId: '35102', agodaId: '80102', transport: 'train', travelTimeMinutes: 18, dummyPrices: { rakuten: 9500, jalan: 9000, agoda: 8500 }, amenities: ['無料Wi-Fi', '天然温泉大浴場', '夜鳴きそば'], latitude: 35.1750, longitude: 136.9039 },
      { id: 'nagoya-tokyu-hotel', name: '名古屋東急ホテル', address: '愛知県名古屋市中区栄4-6-8', stars: 4, rating: 4.1, reviewCount: 2891, rakutenId: '70103', jalanId: '35103', agodaId: '80103', transport: 'train', travelTimeMinutes: 20, dummyPrices: { rakuten: 12000, jalan: 11500, agoda: 10800 }, amenities: ['無料Wi-Fi', 'レストラン', 'フィットネス'], latitude: 35.1706, longitude: 136.9081 },
      { id: 'ana-crowne-nagoya', name: 'ANAクラウンプラザホテルグランコート名古屋', address: '愛知県名古屋市中区金山町1-1-1', stars: 4, rating: 4.2, reviewCount: 3201, rakutenId: '70104', jalanId: '35104', agodaId: '80104', transport: 'train', travelTimeMinutes: 22, dummyPrices: { rakuten: 15000, jalan: 14500, agoda: 13500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'スパ'], latitude: 35.1635, longitude: 136.8956 },
      { id: 'hilton-nagoya', name: 'ヒルトン名古屋', address: '愛知県名古屋市中区栄1-3-3', stars: 5, rating: 4.4, reviewCount: 4102, rakutenId: '70105', jalanId: '35105', agodaId: '80105', transport: 'train', travelTimeMinutes: 18, dummyPrices: { rakuten: 18000, jalan: 17000, agoda: 16000 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'フィットネス', 'スパ'], latitude: 35.1735, longitude: 136.9027 },
    ],
  },
  {
    venue: { id: 'nippon-budokan', name: '日本武道館', aliases: ['日本武道館', '武道館', 'ブドウカン'], address: '東京都千代田区北の丸公園2-3', prefecture: '東京都', latitude: 35.6940, longitude: 139.7498 },
    hotels: [
      { id: 'hotel-grand-arc', name: 'ホテルグランドアーク半蔵門', address: '東京都千代田区隼町3-1', stars: 4, rating: 4.1, reviewCount: 2103, rakutenId: '80101', jalanId: '45101', agodaId: '90101', transport: 'walk', travelTimeMinutes: 8, dummyPrices: { rakuten: 15000, jalan: 14500, agoda: 13800 }, amenities: ['無料Wi-Fi', 'レストラン', '駐車場'], latitude: 35.6896, longitude: 139.7453 },
      { id: 'palace-hotel-tokyo', name: 'パレスホテル東京', address: '東京都千代田区丸の内1-1-1', stars: 5, rating: 4.7, reviewCount: 6231, rakutenId: '80102', jalanId: '45102', agodaId: '90102', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 58000, jalan: 55000, agoda: 52000 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'スパ', 'フィットネス', 'プール'], latitude: 35.6876, longitude: 139.7616 },
      { id: 'kudan-kaikan-terrace', name: '九段会館テラス', address: '東京都千代田区九段南1-6-5', stars: 4, rating: 4.2, reviewCount: 1823, rakutenId: '80103', jalanId: '45103', agodaId: '90103', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 18000, jalan: 17000, agoda: 16000 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー'], latitude: 35.6948, longitude: 139.7507 },
      { id: 'akihabara-washington', name: '秋葉原ワシントンホテル', address: '東京都千代田区外神田1-8-3', stars: 3, rating: 3.8, reviewCount: 3201, rakutenId: '80104', jalanId: '45104', agodaId: '90104', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 9500, jalan: 8800, agoda: 8200 }, amenities: ['無料Wi-Fi', 'レストラン'], latitude: 35.6982, longitude: 139.7726 },
      { id: 'hotel-s-akihabara', name: 'ホテル・エス・アキバ', address: '東京都千代田区神田和泉町1-6-14', stars: 3, rating: 3.6, reviewCount: 1102, rakutenId: '80105', jalanId: '45105', agodaId: '90105', transport: 'train', travelTimeMinutes: 18, dummyPrices: { rakuten: 8000, jalan: 7500, agoda: 7000 }, amenities: ['無料Wi-Fi', 'コインランドリー'], latitude: 35.6964, longitude: 139.7730 },
    ],
  },
  {
    venue: { id: 'makuhari-messe', name: '幕張メッセ', aliases: ['幕張メッセ', '幕張', 'マクハリ', 'Makuhari'], address: '千葉県千葉市美浜区中瀬2-1', prefecture: '千葉県', latitude: 35.6485, longitude: 140.0326 },
    hotels: [
      { id: 'new-otani-makuhari', name: 'ホテルニューオータニ幕張', address: '千葉県千葉市美浜区若葉2-120-3', stars: 5, rating: 4.2, reviewCount: 5021, rakutenId: '90101', jalanId: '55101', agodaId: '10201', transport: 'walk', travelTimeMinutes: 5, dummyPrices: { rakuten: 15000, jalan: 14500, agoda: 13500 }, amenities: ['無料Wi-Fi', 'レストラン', 'プール', 'スパ', '駐車場'], latitude: 35.6490, longitude: 140.0345 },
      { id: 'ana-crown-makuhari', name: 'ANAクラウンプラザホテル千葉', address: '千葉県千葉市美浜区ひび野2-3', stars: 4, rating: 4.0, reviewCount: 3102, rakutenId: '90102', jalanId: '55102', agodaId: '10202', transport: 'walk', travelTimeMinutes: 3, dummyPrices: { rakuten: 12000, jalan: 11500, agoda: 10800 }, amenities: ['無料Wi-Fi', 'レストラン', 'フィットネス', '駐車場'], latitude: 35.6478, longitude: 140.0312 },
      { id: 'apa-makuhari', name: 'アパホテル幕張', address: '千葉県千葉市美浜区幸町1-1-3', stars: 3, rating: 3.7, reviewCount: 2341, rakutenId: '90103', jalanId: '55103', agodaId: '10203', transport: 'walk', travelTimeMinutes: 8, dummyPrices: { rakuten: 7500, jalan: 7000, agoda: 6500 }, amenities: ['無料Wi-Fi', '大浴場'], latitude: 35.6432, longitude: 140.0273 },
      { id: 'hotel-risol-makuhari', name: 'ホテルリソル幕張', address: '千葉県千葉市花見川区幕張町4-731-2', stars: 3, rating: 3.8, reviewCount: 1892, rakutenId: '90104', jalanId: '55104', agodaId: '10204', transport: 'walk', travelTimeMinutes: 10, dummyPrices: { rakuten: 8500, jalan: 8000, agoda: 7500 }, amenities: ['無料Wi-Fi', 'レストラン', 'コインランドリー'], latitude: 35.6534, longitude: 140.0290 },
      { id: 'toyo-inn-makuhari', name: '東横INN幕張本郷駅前', address: '千葉県千葉市花見川区幕張本郷2-14-1', stars: 3, rating: 3.5, reviewCount: 1203, rakutenId: '90105', jalanId: '55105', agodaId: '10205', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 5800, jalan: 5500, agoda: 5200 }, amenities: ['無料Wi-Fi', '朝食無料'], latitude: 35.6581, longitude: 140.0178 },
    ],
  },
  {
    venue: { id: 'paypay-dome', name: 'PayPayドーム', aliases: ['PayPayドーム', 'ペイペイドーム', '福岡ドーム', 'みずほPayPayドーム'], address: '福岡県福岡市中央区地行浜2-2-2', prefecture: '福岡県', latitude: 33.5961, longitude: 130.3621 },
    hotels: [
      { id: 'hilton-fukuoka-seahawk', name: 'ヒルトン福岡シーホーク', address: '福岡県福岡市中央区地行浜2-2-3', stars: 5, rating: 4.4, reviewCount: 8102, rakutenId: '10001', jalanId: '65001', agodaId: '11001', transport: 'walk', travelTimeMinutes: 3, dummyPrices: { rakuten: 22000, jalan: 21000, agoda: 19500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'プール', 'スパ', 'フィットネス'], latitude: 33.5955, longitude: 130.3612 },
      { id: 'monterey-fukuoka', name: 'ホテルモントレラスール福岡', address: '福岡県福岡市博多区博多駅前4-2-2', stars: 4, rating: 3.8, reviewCount: 3201, rakutenId: '10002', jalanId: '65002', agodaId: '11002', transport: 'train', travelTimeMinutes: 12, dummyPrices: { rakuten: 9500, jalan: 9000, agoda: 8500 }, amenities: ['無料Wi-Fi', 'レストラン'], latitude: 33.5897, longitude: 130.4225 },
      { id: 'new-otani-hakata', name: 'ホテルニューオータニ博多', address: '福岡県福岡市中央区渡辺通1-1-2', stars: 4, rating: 4.2, reviewCount: 4521, rakutenId: '10003', jalanId: '65003', agodaId: '11003', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 15000, jalan: 14500, agoda: 13500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'プール', 'スパ'], latitude: 33.5900, longitude: 130.3989 },
      { id: 'dormy-inn-hakata-gion', name: 'ドーミーイン博多祇園', address: '福岡県福岡市博多区祇園町9-1', stars: 3, rating: 4.0, reviewCount: 5823, rakutenId: '10004', jalanId: '65004', agodaId: '11004', transport: 'train', travelTimeMinutes: 18, dummyPrices: { rakuten: 9800, jalan: 9200, agoda: 8800 }, amenities: ['無料Wi-Fi', '天然温泉大浴場', '夜鳴きそば'], latitude: 33.5895, longitude: 130.4122 },
      { id: 'regal-royal-fukuoka', name: 'リーガロイヤルホテル福岡', address: '福岡県福岡市中央区天神2-4-16', stars: 4, rating: 4.1, reviewCount: 3892, rakutenId: '10005', jalanId: '65005', agodaId: '11005', transport: 'train', travelTimeMinutes: 15, dummyPrices: { rakuten: 12000, jalan: 11500, agoda: 10500 }, amenities: ['無料Wi-Fi', 'レストラン', 'バー', 'フィットネス'], latitude: 33.5907, longitude: 130.3987 },
    ],
  },
];

export const getVenueById = (id: string): VenueData | undefined =>
  allVenues.find((v) => v.venue.id === id);

export const searchVenuesByQuery = (query: string): VenueData[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allVenues.filter(
    (v) =>
      v.venue.name.toLowerCase().includes(q) ||
      v.venue.aliases.some((a) => a.toLowerCase().includes(q)) ||
      v.venue.prefecture.toLowerCase().includes(q)
  );
};
