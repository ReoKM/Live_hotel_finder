export type TransportMethod = 'walk' | 'train';
export type TravelTimeFilterValue = 10 | 20 | 'train' | null;
export type SortKey = 'price_asc' | 'price_desc' | 'distance_asc';

export interface HotelPrices {
  rakuten: number | null;
  jalan: number | null;
  agoda: number | null;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  stars: number;
  rating: number;
  reviewCount: number;
  rakutenId: string;
  jalanId: string;
  agodaId: string;
  transport: TransportMethod;
  travelTimeMinutes: number;
  dummyPrices: HotelPrices;
  amenities: string[];
  latitude: number;
  longitude: number;
}

export interface Venue {
  id: string;
  name: string;
  aliases: string[];
  address: string;
  prefecture: string;
  latitude: number;
  longitude: number;
}

export interface VenueData {
  venue: Venue;
  hotels: Hotel[];
}
