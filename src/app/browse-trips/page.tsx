'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TripCard from '@/components/trips/TripCard';
import { FiSearch, FiSliders, FiCalendar } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TRAVELER_PACKAGE, TRIPS } from '../traveler/redux/tripsAction';
import { useTranslations } from 'next-intl';

type SortOption = 'rating' | 'price' | 'date';
type FilterOption = 'all' | 'small' | 'medium' | 'large';

export default function BrowseTrips() {
  const { trips: MOCK_TRIPS, loading: tripsAreLoading } = useSelector(
    (state) => state.trips,
  );
  const t = useTranslations('BrowseTips');

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!MOCK_TRIPS.length) {
      dispatch({
        type: SEARCH_TRAVELER_PACKAGE,
        payload: {
          searchKeyword: '',
          startDate: '',
          endDate: '',
        },
      });
    }
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sizeFilter, setSizeFilter] = useState<FilterOption>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  const handleChatClick = useCallback(
    (travelerId: string, travelerPkgId: string) => {
      router.push(`/chat?user=${travelerId}&travelerPkgId=${travelerPkgId}`);
    },
    [router],
  );

  const debouncedSearch = useDebounce(searchQuery, 700);
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  useEffect(() => {
    dispatch({
      type: SEARCH_TRAVELER_PACKAGE,
      payload: {
        searchKeyword: debouncedSearch,
        startDate: '',
        endDate: '',
      },
    });
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (dateRange?.start && dateRange?.end) {
      dispatch({
        type: SEARCH_TRAVELER_PACKAGE,
        payload: {
          searchKeyword: debouncedSearch,
          startDate: dateRange.start,
          endDate: dateRange.end,
        },
      });
    }
  }, [dateRange.start, dateRange.end, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            <p className="text-gray-400 mt-2">
              {MOCK_TRIPS.length} {t('tripsAvailable')}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl  p-4 mb-8">
          <div className="grid grid-cols-2 sm:flex max-sm:flex-col max-sm:items-start w-full flex-wrap gap-4">
            <div className="flex-1 max-sm:col-span-2 max-sm:w-full min-w-[200px] ">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start max-sm:row-span-2 sm:items-center space-x-2">
              <FiCalendar className="text-gray-400" />
              <div className="flex items-center justify-center gap-3 flex-col sm:flex-row">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <FiSliders className="text-gray-400" />
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value as FilterOption)}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-700 text-white max-sm:mt-8 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>

        {tripsAreLoading ? (
          <>
            <div className="flex flex-col gap-4 items-center justify-center py-[88px]">
              <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-b-gray-300 animate-spin"></div>
              <div className="text-lg font-bold">Loading Trips....</div>
            </div>
          </>
        ) : (
          <>
            {MOCK_TRIPS.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_TRIPS.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onChatClick={handleChatClick}
                  />
                ))}
              </div>
            ) : (
              <>
                {MOCK_TRIPS.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-lg">
                      {t('noTripsFound')}
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSizeFilter('all');
                        setDateRange({ start: '', end: '' });
                      }}
                      className="mt-4 text-blue-400 hover:text-blue-300"
                    >
                      {t('clearAllFilters')}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
