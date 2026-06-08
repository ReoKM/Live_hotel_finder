'use client';

import { TravelTimeFilterValue } from '@/types';

interface Props {
  value: TravelTimeFilterValue;
  onChange: (value: TravelTimeFilterValue) => void;
}

const options: { label: string; value: TravelTimeFilterValue }[] = [
  { label: 'すべて', value: null },
  { label: '徒歩10分', value: 10 },
  { label: '徒歩20分', value: 20 },
  { label: '電車圏内', value: 'train' },
];

export default function TravelTimeFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
            value === option.value
              ? 'bg-violet-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
