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
import { useTranslations } from 'next-intl';
import SkeletonLoader from '@/components/packages/PackageSkeletonLoader';
import { Satellite } from 'lucide-react';

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
  const { packages: SENDER_PACKAGES, loading: packagesAreLoading } =
    useSelector((state) => state.packages);

  const dispatch = useDispatch();
  const t = useTranslations('BrowsePackages');

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
    (typeof SENDER_PACKAGES)[0] | null
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
    new Map(),
  );

  const [isLoadingDistances, setIsLoadingDistances] = useState(false);

  useEffect(() => {
    if (!SENDER_PACKAGES.length) {
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

  const debouncedSearch = useDebounce(searchQuery, 700);
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

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

  const filteredAndSortedPackages = SENDER_PACKAGES.filter(
    (pkg) => pkg.sender?.id,
  );

  const handleChatClick = useCallback(
    (senderId: string, senderPkgId: string) => {
      router.push(`/chat?user=${senderId}&senderPkgId=${senderPkgId}`);
    },
    [router],
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            {/* Find Packages That Need Delivery */}
            {t('title')}
          </h1>
          <p className="text-xl text-center text-gray-200 max-w-2xl mx-auto">
            {/* Connect with senders and earn money by delivering packages along
            your travel route */}
            {t('description')}
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
                onChange={handleSearchChange}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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

        {packagesAreLoading ? (
          <>
            <div className="flex flex-col gap-4 items-center justify-center py-[88px]">
              <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-b-gray-300 animate-spin"></div>
              <div className="text-lg font-bold">Loading Packages....</div>
            </div>
          </>
        ) : filteredAndSortedPackages.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">
                {t('found')} {filteredAndSortedPackages.length}{' '}
                {t('packagesMatchingCriteria')}
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
                    t={t}
                  />
                ) : (
                  <PackageListItem
                    key={pkg.id}
                    package={pkg}
                    onViewDetails={() => setSelectedPackage(pkg)}
                    distance={packageDistances.get(pkg.id)}
                  />
                ),
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FiPackage className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t('noPackagesFound')}
            </h3>
            <p className="text-gray-400">{t('noPackagesFoundDescription')}</p>
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
              onChatClick={handleChatClick}
              t={t}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
