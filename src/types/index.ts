export type TransportMethod = 'walk' | 'train';

export type TravelTimeFilter = 10 | 20 | 30 | null;

export interface HotelPrices {
  rakuten: number;
  jalan: number;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  stars: number;
  rakutenId: string;
  jalanId: string;
  transport: TransportMethod;
  travelTimeMinutes: number;
  dummyPrices: HotelPrices;
  amenities: string[];
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  description: string;
}

export interface VenueData {
  venue: Venue;
  hotels: Hotel[];
}
