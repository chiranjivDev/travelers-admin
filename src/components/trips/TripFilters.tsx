'use client'

import { useState } from 'react'
import { FiSearch, FiSliders, FiCalendar, FiDollarSign, FiStar, FiPackage, FiMap } from 'react-icons/fi'

export interface FilterState {
  searchQuery: string
  dateRange: { start: string; end: string }
  priceRange: { min: number; max: number }
  sizeFilter: string
  minRating: number
  verificationRequired: boolean
  maxStops: number | null
  preferredLanguages: string[]
  packageTypes: string[]
}

interface TripFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClearFilters: () => void
  availableLanguages: string[]
}

export default function TripFilters({
  filters,
  onFilterChange,
  onClearFilters,
  availableLanguages
}: TripFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-8 transition-all">
      {/* Basic Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, traveler name..."
              value={filters.searchQuery}
              onChange={e => updateFilter('searchQuery', e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-2">
          <FiCalendar className="text-gray-400" />
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={e => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={e => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Range */}
        <div className="flex items-center space-x-2">
          <FiDollarSign className="text-gray-400" />
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange.min || ''}
            onChange={e => updateFilter('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
            className="w-20 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange.max || ''}
            onChange={e => updateFilter('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
            className="w-20 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Toggle Advanced Filters */}
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <FiSliders className="text-gray-400" />
          <span className="text-white">Advanced Filters</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-700">
          {/* Package Size */}
          <div className="space-y-2">
            <label className="text-gray-400 flex items-center space-x-2">
              <FiPackage />
              <span>Package Size</span>
            </label>
            <select
              value={filters.sizeFilter}
              onChange={e => updateFilter('sizeFilter', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Min Rating */}
          <div className="space-y-2">
            <label className="text-gray-400 flex items-center space-x-2">
              <FiStar />
              <span>Minimum Rating</span>
            </label>
            <select
              value={filters.minRating}
              onChange={e => updateFilter('minRating', Number(e.target.value))}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Any Rating</option>
              {[4.5, 4, 3.5, 3].map(rating => (
                <option key={rating} value={rating}>
                  {rating}+ Stars
                </option>
              ))}
            </select>
          </div>

          {/* Max Stops */}
          <div className="space-y-2">
            <label className="text-gray-400 flex items-center space-x-2">
              <FiMap />
              <span>Maximum Stops</span>
            </label>
            <select
              value={filters.maxStops ?? ''}
              onChange={e => updateFilter('maxStops', e.target.value ? Number(e.target.value) : null)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Number</option>
              {[0, 1, 2].map(stops => (
                <option key={stops} value={stops}>
                  {stops} {stops === 0 ? 'Stops' : stops === 1 ? 'Stop' : 'Stops'}
                </option>
              ))}
            </select>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <label className="text-gray-400">Preferred Languages</label>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    const newLangs = filters.preferredLanguages.includes(lang)
                      ? filters.preferredLanguages.filter(l => l !== lang)
                      : [...filters.preferredLanguages, lang]
                    updateFilter('preferredLanguages', newLangs)
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.preferredLanguages.includes(lang)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Package Types */}
          <div className="space-y-2">
            <label className="text-gray-400">Package Types</label>
            <div className="flex flex-wrap gap-2">
              {['Electronics', 'Documents', 'Fragile', 'Food', 'Other'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    const newTypes = filters.packageTypes.includes(type)
                      ? filters.packageTypes.filter(t => t !== type)
                      : [...filters.packageTypes, type]
                    updateFilter('packageTypes', newTypes)
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.packageTypes.includes(type)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div className="space-y-2">
            <label className="text-gray-400">Verification</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.verificationRequired}
                onChange={e => updateFilter('verificationRequired', e.target.checked)}
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white">Verified Travelers Only</span>
            </div>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(filters.searchQuery ||
        filters.dateRange.start ||
        filters.dateRange.end ||
        filters.priceRange.min ||
        filters.priceRange.max ||
        filters.sizeFilter !== 'all' ||
        filters.minRating > 0 ||
        filters.maxStops !== null ||
        filters.preferredLanguages.length > 0 ||
        filters.packageTypes.length > 0 ||
        filters.verificationRequired) && (
        <button
          onClick={onClearFilters}
          className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
