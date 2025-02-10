'use client';

// imports
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TripCard from '@/components/trips/TripCard';
import { FiSearch, FiSliders, FiCalendar } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TRAVELER_PACKAGE, TRIPS } from '../traveler/redux/tripsAction';
// import { MOCK_TRIPS } from '@/data/mockTrips';

type SortOption = 'rating' | 'price' | 'date';
type FilterOption = 'all' | 'small' | 'medium' | 'large';

export default function BrowseTrips() {
  // use selector: browse trips
  const { trips: MOCK_TRIPS } = useSelector((state) => state.trips);
  console.log('browse trips ===>', MOCK_TRIPS);

  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: TRIPS });
  // }, []);

  // make use of elastic search trips url
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

  // const debouncedSearch = useDebounce(searchQuery, 300);

  const handleChatClick = useCallback(
    (travelerId: string) => {
      router.push(`/chat?user=${travelerId}`);
    },
    [router]
  );

  // const filteredAndSortedTrips = useMemo(() => {
  //   return MOCK_TRIPS.filter((trip) => {
  //     const matchesSearch =
  //       !debouncedSearch ||
  //       trip.route.from.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  //       trip.route.to.toLowerCase().includes(debouncedSearch.toLowerCase());

  //     const matchesSize =
  //       sizeFilter === 'all' || trip.capacity.size.toLowerCase() === sizeFilter;

  //     const matchesDate =
  //       !dateRange.start ||
  //       !dateRange.end ||
  //       (new Date(trip.schedule.departureDate) >= new Date(dateRange.start) &&
  //         new Date(trip.schedule.departureDate) <= new Date(dateRange.end));

  //     return matchesSearch && matchesSize && matchesDate;
  //   }).sort((a, b) => {
  //     switch (sortBy) {
  //       case 'price':
  //         return a.pricing.basePrice - b.pricing.basePrice;
  //       case 'date':
  //         return (
  //           new Date(a.schedule.departureDate).getTime() -
  //           new Date(b.schedule.departureDate).getTime()
  //         );
  //       default:
  //         return b.traveler.rating - a.traveler.rating;
  //     }
  //   });
  // }, [debouncedSearch, sortBy, sizeFilter, dateRange]);

  // handle search using elastic search
  // Debounce the search query
  const debouncedSearch = useDebounce(searchQuery, 700);
  // Handle search input change
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  // Dispatch action when debounced search value changes
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

  // handle search based on date range
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Browse Trips</h1>
            <p className="text-gray-400 mt-2">
              {MOCK_TRIPS.length} trips available
            </p>
          </div>
          <Link
            href="/post-trip"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post a Trip
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  onChange={handleSearchChange}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-gray-400" />
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

            {/* Size Filter */}
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

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TRIPS.map((trip) => (
            <TripCard key={trip.id} trip={trip} onChatClick={handleChatClick} />
          ))}
        </div>

        {/* Empty State */}
        {MOCK_TRIPS.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No trips found matching your criteria
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSizeFilter('all');
                setDateRange({ start: '', end: '' });
              }}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
