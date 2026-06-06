'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';

interface Props {
  onRangeChange: (range: DateRange | undefined) => void;
}

export default function DateRangePicker({ onRangeChange }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    onRangeChange(newRange);
    if (newRange?.from && newRange?.to) {
      setTimeout(() => setIsOpen(false), 200);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const today = new Date();

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2.5 bg-white hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors min-w-[300px]"
      >
        <span className="text-lg">📅</span>
        <div className="flex items-center gap-2 text-sm">
          <span className={range?.from ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
            {range?.from ? format(range.from, 'yyyy年M月d日') : 'チェックイン'}
          </span>
          <span className="text-gray-300 font-light">→</span>
          <span className={range?.to ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
            {range?.to ? format(range.to, 'yyyy年M月d日') : 'チェックアウト'}
          </span>
        </div>
        {range?.from && range?.to && (
          <span className="ml-auto text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
            {Math.ceil((range.to.getTime() - range.from.getTime()) / 86400000)}泊
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 calendar-popup">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            locale={ja}
            numberOfMonths={2}
            fromDate={today}
          />
          {range?.from && !range?.to && (
            <p className="text-center text-xs text-gray-400 mt-2">チェックアウト日を選択してください</p>
          )}
          {range?.from && range?.to && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => {
                  setRange(undefined);
                  onRangeChange(undefined);
                }}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                クリア
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
