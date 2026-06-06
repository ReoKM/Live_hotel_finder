'use client';

import { TravelTimeFilter as TravelTimeFilterType } from '@/types';

interface Props {
  value: TravelTimeFilterType;
  onChange: (value: TravelTimeFilterType) => void;
}

const options: { label: string; value: TravelTimeFilterType }[] = [
  { label: 'すべて', value: null },
  { label: '10分以内', value: 10 },
  { label: '20分以内', value: 20 },
  { label: '30分以内', value: 30 },
];

export default function TravelTimeFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
            value === option.value
              ? 'bg-indigo-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
