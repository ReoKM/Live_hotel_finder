'use client';

import { useState, useRef, useEffect } from 'react';
import { searchVenuesByQuery } from '@/data/venues';
import { VenueData } from '@/types';

interface Props {
  onVenueSelect: (venue: VenueData | null) => void;
}

export default function VenueSearch({ onVenueSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VenueData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isJustSelectedRef = useRef(false);

  useEffect(() => {
    if (query.trim()) {
      const found = searchVenuesByQuery(query);
      setResults(found);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (venueData: VenueData) => {
    isJustSelectedRef.current = true;
    setQuery(venueData.venue.name);
    setIsOpen(false);
    onVenueSelect(venueData);
  };

  const handleChange = (value: string) => {
    if (isJustSelectedRef.current) {
      isJustSelectedRef.current = false;
      onVenueSelect(null);
    }
    setQuery(value);
    setIsOpen(value.trim().length > 0);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onVenueSelect(null);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🏟️</span>
        <input
          id="venue-search-input"
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="例：東京ドーム、さいたまスーパーアリーナ..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-colors bg-white text-gray-800 placeholder-gray-400"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="会場をクリア"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 z-30 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {results.map((venueData) => (
            <button
              key={venueData.venue.id}
              role="option"
              aria-selected={false}
              onClick={() => handleSelect(venueData)}
              className="w-full px-4 py-3 flex items-start gap-3 hover:bg-violet-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
            >
              <span className="text-xl mt-0.5">🏟️</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{venueData.venue.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{venueData.venue.prefecture} · {venueData.venue.address}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
