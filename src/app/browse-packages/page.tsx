'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMapPin,
  FiPackage,
  FiDollarSign,
  FiSliders,
  FiStar,
  FiClock,
  FiTruck,
  FiGrid,
  FiList,
  FiNavigation,
} from 'react-icons/fi';
import PackageCard from '@/components/packages/PackageCard';
import PackageListItem from '@/components/packages/PackageListItem';
import PackageDetailsModal from '@/components/packages/PackageDetailsModal';
// import { MOCK_PACKAGES } from '@/data/mockPackages';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isBefore, isAfter } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  getLocation,
  getCachedGeocode,
  calculateDistance,
} from '@/utils/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import {
  PACKAGES,
  SEARCH_SENDER_PACKAGE,
} from '../sender/dashboard/redux/packagesAction';
import { useDebounce } from '@/hooks/useDebounce';

interface Filters {
  size: string[];
  weight: {
    min: number;
    max: number;
  };
  price: {
    min: number;
    max: number;
  };
  category: string[];
  fragile: boolean;
  date: {
    start: Date | null;
    end: Date | null;
  };
}

const defaultFilters: Filters = {
  size: [],
  weight: {
    min: 0,
    max: 50,
  },
  price: {
    min: 0,
    max: 1000,
  },
  category: [],
  fragile: false,
  date: {
    start: null,
    end: null,
  },
};

export default function BrowsePackagesPage() {
  // use selector
  const { packages: MOCK_PACKAGES } = useSelector((state) => state.packages);
  console.log('packages from browse packages', MOCK_PACKAGES);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: PACKAGES });
  // }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date-newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPackage, setSelectedPackage] = useState<
    (typeof MOCK_PACKAGES)[0] | null
  >(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularLocations, setPopularLocations] = useState<string[]>([
    'New York',
    'London',
    'Paris',
    'Tokyo',
    'Sydney',
  ]);

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [packageDistances, setPackageDistances] = useState<Map<string, number>>(
    new Map()
  );
  const [isLoadingDistances, setIsLoadingDistances] = useState(false);

  // Load filters from URL params
  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   const loadedFilters: Partial<Filters> = {};

  //   if (params.has('search')) setSearchQuery(params.get('search') || '');
  //   if (params.has('sort')) setSortBy(params.get('sort') || 'date-newest');
  //   if (params.has('view'))
  //     setViewMode((params.get('view') || 'grid') as 'grid' | 'list');

  //   // Load array filters
  //   if (params.has('size'))
  //     loadedFilters.size = params.get('size')?.split(',') || [];
  //   if (params.has('category'))
  //     loadedFilters.category = params.get('category')?.split(',') || [];

  //   // Load range filters
  //   if (params.has('weight_min'))
  //     loadedFilters.weight = {
  //       min: Number(params.get('weight_min')),
  //       max: Number(params.get('weight_max')),
  //     };
  //   if (params.has('price_min'))
  //     loadedFilters.price = {
  //       min: Number(params.get('price_min')),
  //       max: Number(params.get('price_max')),
  //     };

  //   // Load date range
  //   if (params.has('date_start'))
  //     loadedFilters.date = {
  //       start: new Date(params.get('date_start')),
  //       end: new Date(params.get('date_end')),
  //     };

  //   // Load boolean filters
  //   if (params.has('fragile'))
  //     loadedFilters.fragile = params.get('fragile') === 'true';

  //   setFilters((prev) => ({ ...prev, ...loadedFilters }));
  // }, [searchParams]);

  // Update URL when filters change
  // useEffect(() => {
  //   const params = new URLSearchParams();

  //   if (searchQuery) params.set('search', searchQuery);
  //   if (sortBy !== 'date-newest') params.set('sort', sortBy);
  //   if (viewMode !== 'grid') params.set('view', viewMode);

  //   // Add array filters
  //   if (filters.size.length) params.set('size', filters.size.join(','));
  //   if (filters.category.length)
  //     params.set('category', filters.category.join(','));

  //   // Add range filters
  //   if (filters.weight.min > 0)
  //     params.set('weight_min', filters.weight.min.toString());
  //   if (filters.weight.max < 50)
  //     params.set('weight_max', filters.weight.max.toString());
  //   if (filters.price.min > 0)
  //     params.set('price_min', filters.price.min.toString());
  //   if (filters.price.max < 1000)
  //     params.set('price_max', filters.price.max.toString());

  //   // Add date range
  //   if (filters.date.start)
  //     params.set('date_start', filters.date.start.toISOString());
  //   if (filters.date.end)
  //     params.set('date_end', filters.date.end.toISOString());

  //   // Add boolean filters
  //   if (filters.fragile) params.set('fragile', 'true');

  //   router.push(`?${params.toString()}`, { scroll: false });
  // }, [filters, searchQuery, sortBy, viewMode, router]);

  // Get user's location on mount
  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const location = await getLocation();
  //       setUserLocation(location);
  //     } catch (error) {
  //       console.error('Failed to get user location:', error);
  //     }
  //   };
  //   fetchLocation();
  // }, []);

  // Calculate distances when user location is available
  // useEffect(() => {
  //   const calculateDistances = async () => {
  //     if (!userLocation) return;

  //     setIsLoadingDistances(true);
  //     const distances = new Map<string, number>();

  //     try {
  //       for (const pkg of MOCK_PACKAGES) {
  //         const fromCoords = await getCachedGeocode(pkg.origin);
  //         const toCoords = await getCachedGeocode(pkg.destination);

  //         // Calculate distance from user to pickup location
  //         const pickupDistance = calculateDistance(
  //           userLocation.latitude,
  //           userLocation.longitude,
  //           fromCoords.latitude,
  //           fromCoords.longitude
  //         );

  //         distances.set(pkg.id, pickupDistance);
  //       }

  //       setPackageDistances(distances);
  //     } catch (error) {
  //       console.error('Failed to calculate distances:', error);
  //     } finally {
  //       setIsLoadingDistances(false);
  //     }
  //   };

  //   if (sortBy === 'distance') {
  //     calculateDistances();
  //   }
  // }, [userLocation, sortBy]);

  // const sortOptions: SortOption[] = [
  //   { label: 'Newest First', value: 'date-newest', icon: FiClock },
  //   { label: 'Oldest First', value: 'date-oldest', icon: FiClock },
  //   { label: 'Price: Low to High', value: 'price-lowest', icon: FiDollarSign },
  //   { label: 'Price: High to Low', value: 'price-highest', icon: FiDollarSign },
  //   { label: 'Weight: Low to High', value: 'weight-lowest', icon: FiPackage },
  //   { label: 'Weight: High to Low', value: 'weight-highest', icon: FiPackage },
  //   { label: 'Distance: Nearest', value: 'distance', icon: FiTruck },
  // ];

  // const categories = [
  //   'Electronics',
  //   'Documents',
  //   'Clothing',
  //   'Art',
  //   'Books',
  //   'Food',
  //   'Medical',
  //   'Fragile',
  //   'Furniture',
  //   'Automotive',
  //   'Sports Equipment',
  //   'Musical Instruments',
  //   'Other',
  // ];

  // Save search to recent searches
  // const saveRecentSearch = useCallback((query: string) => {
  //   setRecentSearches((prev) => {
  //     const newSearches = [query, ...prev.filter((s) => s !== query)].slice(
  //       0,
  //       5
  //     );
  //     localStorage.setItem(
  //       'recentPackageSearches',
  //       JSON.stringify(newSearches)
  //     );
  //     return newSearches;
  //   });
  // }, []);

  // Load recent searches on mount
  // useEffect(() => {
  //   const saved = localStorage.getItem('recentPackageSearches');
  //   if (saved) {
  //     setRecentSearches(JSON.parse(saved));
  //   }
  // }, []);

  // const handleSearch = useCallback(
  //   (query: string) => {
  //     setSearchQuery(query);
  //     if (query.trim()) {
  //       saveRecentSearch(query.trim());
  //     }
  //   },
  //   [saveRecentSearch]
  // );

  // const filteredAndSortedPackages = MOCK_PACKAGES.filter((pkg) => {
  //   // Search query filter
  //   if (searchQuery) {
  //     const searchLower = searchQuery.toLowerCase();
  //     return (
  //       pkg.origin.toLowerCase().includes(searchLower) ||
  //       pkg.destination.toLowerCase().includes(searchLower) ||
  //       pkg.description.toLowerCase().includes(searchLower)
  //     );
  //   }

  //   // Apply filters
  //   if (filters.weight.min > 0 && pkg.weight < filters.weight.min) return false;
  //   if (filters.weight.max < 50 && pkg.weight > filters.weight.max)
  //     return false;
  //   if (filters.price.min > 0 && pkg.price < filters.price.min) return false;
  //   if (filters.price.max < 1000 && pkg.price > filters.price.max) return false;
  //   if (
  //     filters.category.length &&
  //     pkg.category &&
  //     !filters.category.includes(pkg.category)
  //   )
  //     return false;

  //   // Date filter
  //   if (filters.date.start && filters.date.end) {
  //     const packageDate = new Date(pkg.date);
  //     if (
  //       isBefore(packageDate, filters.date.start) ||
  //       isAfter(packageDate, filters.date.end)
  //     ) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }).sort((a, b) => {
  //   switch (sortBy) {
  //     case 'date-newest':
  //       return new Date(b.date).getTime() - new Date(a.date).getTime();
  //     case 'date-oldest':
  //       return new Date(a.date).getTime() - new Date(b.date).getTime();
  //     case 'price-lowest':
  //       return a.price - b.price;
  //     case 'price-highest':
  //       return b.price - a.price;
  //     case 'weight-lowest':
  //       return a.weight - b.weight;
  //     case 'weight-highest':
  //       return b.weight - a.weight;
  //     case 'distance':
  //       const distanceA = packageDistances.get(a.id) || Infinity;
  //       const distanceB = packageDistances.get(b.id) || Infinity;
  //       return distanceA - distanceB;
  //     default:
  //       return 0;
  //   }
  // });

  // elastic search implementation=============================================>
  useEffect(() => {
    if (!MOCK_PACKAGES.length) {
      dispatch({
        type: SEARCH_SENDER_PACKAGE,
        payload: {
          searchKeyword: '',
          startDate: '',
          endDate: '',
        },
      });
    }
  }, [dispatch]);

  // Debounce the search query
  const debouncedSearch = useDebounce(searchQuery, 700);
  console.log('debouncedSearch', debouncedSearch);
  // Handle search input change
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  // Dispatch action when debounced search value changes
  useEffect(() => {
    dispatch({
      type: SEARCH_SENDER_PACKAGE,
      payload: {
        searchKeyword: debouncedSearch,
        startDate: '',
        endDate: '',
      },
    });
  }, [debouncedSearch, dispatch]);

  // test filtered : to be removed
  const filteredAndSortedPackages = MOCK_PACKAGES.filter(
    (pkg) => pkg.sender?.id
  );

  // navigate to chat
  const handleChatClick = useCallback(
    (senderId: string) => {
      router.push(`/chat?user=${senderId}`);
    },
    [router]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            Find Packages That Need Delivery
          </h1>
          <p className="text-xl text-center text-gray-200 max-w-2xl mx-auto">
            Connect with senders and earn money by delivering packages along
            your travel route
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, category, or description..."
                value={searchQuery}
                // onChange={(e) => handleSearch(e.target.value)}
                onChange={handleSearchChange}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          {/* <div className="w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div> */}

          {/* Filter Button */}
          {/* <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSliders className="w-5 h-5" />
            <span>Filters</span>
          </button> */}
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-8"
            >
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Package Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Package Size
                    </label>
                    <div className="space-y-2">
                      {['Small', 'Medium', 'Large'].map((size) => (
                        <label
                          key={size}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={filters.size.includes(size)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  size: [...prev.size, size],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  size: prev.size.filter((s) => s !== size),
                                }));
                              }
                            }}
                            className="form-checkbox text-blue-500"
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Categories
                    </label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  category: [...prev.category, category],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  category: prev.category.filter(
                                    (c) => c !== category
                                  ),
                                }));
                              }
                            }}
                            className="form-checkbox text-blue-500"
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </div> */}

                  {/* Weight Range */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Weight Range (kg)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="number"
                          min="0"
                          value={filters.weight.min}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              weight: {
                                ...prev.weight,
                                min: Number(e.target.value),
                              },
                            }))
                          }
                          className="w-full bg-gray-700 px-3 py-2 rounded"
                          placeholder="Min"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          min="0"
                          value={filters.weight.max}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              weight: {
                                ...prev.weight,
                                max: Number(e.target.value),
                              },
                            }))
                          }
                          className="w-full bg-gray-700 px-3 py-2 rounded"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* Price Range */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Price Range ($)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="number"
                          min="0"
                          value={filters.price.min}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              price: {
                                ...prev.price,
                                min: Number(e.target.value),
                              },
                            }))
                          }
                          className="w-full bg-gray-700 px-3 py-2 rounded"
                          placeholder="Min"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          min="0"
                          value={filters.price.max}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              price: {
                                ...prev.price,
                                max: Number(e.target.value),
                              },
                            }))
                          }
                          className="w-full bg-gray-700 px-3 py-2 rounded"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* Date Filter */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Delivery Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="date"
                          value={
                            filters.date.start
                              ? filters.date.start.toISOString().split('T')[0]
                              : ''
                          }
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              date: {
                                ...prev.date,
                                start: e.target.value
                                  ? new Date(e.target.value)
                                  : null,
                              },
                            }))
                          }
                          className="w-full bg-gray-700 px-3 py-2 rounded"
                          placeholder="Start"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={
                            filters.date.end
                              ? filters.date.end.toISOString().split('T')[0]
                              : ''
                          }
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              date: {
                                ...prev.date,
                                end: e.target.value
                                  ? new Date(e.target.value)
                                  : null,
                              },
                            }))
                          }
                          className="w-full bg-gray-700 px-3 py-2 rounded"
                          placeholder="End"
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* Fragile */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Fragile
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.fragile}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              fragile: e.target.checked,
                            }))
                          }
                          className="form-checkbox text-blue-500"
                        />
                        <span>Fragile</span>
                      </label>
                    </div>
                  </div> */}
                </div>

                {/* Reset Filters Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-4">
          <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Location Status */}
        {sortBy === 'distance' && (
          <div className="mb-4 flex items-center text-sm">
            <FiNavigation className="mr-2" />
            {isLoadingDistances ? (
              <span className="text-gray-400">Calculating distances...</span>
            ) : userLocation ? (
              <span className="text-green-400">
                Using your current location
              </span>
            ) : (
              <span className="text-yellow-400">
                Enable location for distance-based sorting
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Found {filteredAndSortedPackages.length} packages matching your
            criteria
          </p>
        </div>

        {/* Package Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredAndSortedPackages.map((pkg) =>
            viewMode === 'grid' ? (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onViewDetails={() => setSelectedPackage(pkg)}
                onChatClick={handleChatClick}
              />
            ) : (
              <PackageListItem
                key={pkg.id}
                package={pkg}
                onViewDetails={() => setSelectedPackage(pkg)}
                distance={packageDistances.get(pkg.id)}
              />
            )
          )}
        </div>

        {/* No Results */}
        {filteredAndSortedPackages.length === 0 && (
          <div className="text-center py-12">
            <FiPackage className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No packages found</h3>
            <p className="text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Package Details Modal */}
        <AnimatePresence>
          {selectedPackage && (
            <PackageDetailsModal
              isOpen={!!selectedPackage}
              onClose={() => setSelectedPackage(null)}
              package={selectedPackage}
              distance={packageDistances.get(selectedPackage.id)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
