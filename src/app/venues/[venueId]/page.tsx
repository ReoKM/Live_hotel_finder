import { getVenueById } from '@/data/venues';
import { Metadata } from 'next';
import HotelListClient from './HotelListClient';

interface Props {
  params: { venueId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getVenueById(params.venueId);
  return {
    title: `${data?.venue.name ?? ''}周辺ホテル 最安値比較 | Live Hotel Finder`,
    description: `${data?.venue.name ?? ''}近くのホテルを楽天トラベル・じゃらん・agodaで一括比較。`,
  };
}

export default function VenuePage({ params }: Props) {
  const data = getVenueById(params.venueId);
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">会場が見つかりません</p>
      </div>
    );
  }
  return <HotelListClient venueData={data} />;
}
