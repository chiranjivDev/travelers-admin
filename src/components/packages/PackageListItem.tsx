'use client'

import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiPackage, FiDollarSign, FiStar, FiShield, FiClock, FiNavigation } from 'react-icons/fi'
import { format } from 'date-fns'
import { Package } from '@/data/mockPackages'

interface PackageListItemProps {
  package: Package
  onViewDetails: () => void
  distance?: number
}

export default function PackageListItem({ package: pkg, onViewDetails, distance }: PackageListItemProps) {
  const isUrgent = new Date(pkg.date) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      onClick={onViewDetails}
      className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-750 transition-colors"
    >
      {/* Sender Info */}
      <div className="flex-shrink-0 w-12">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {pkg.sender.name.charAt(0)}
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white truncate">{pkg.sender.name}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <FiStar className="text-yellow-400 mr-1" />
            <span>{pkg.sender.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-1 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <FiMapPin className="flex-shrink-0" />
            <span className="truncate">{pkg.origin}</span>
            <span className="mx-1">→</span>
            <span className="truncate">{pkg.destination}</span>
          </div>
          {distance !== undefined && (
            <div className="flex items-center gap-1">
              <FiNavigation className="flex-shrink-0" />
              <span>{distance.toFixed(1)} km</span>
            </div>
          )}
        </div>
      </div>

      {/* Package Details */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <div className="text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FiPackage className="flex-shrink-0" />
            <span>{pkg.dimensions} • {pkg.weight}kg</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FiCalendar className="flex-shrink-0" />
            <span>{format(new Date(pkg.date), 'MMM d')}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center text-green-400">
            <FiDollarSign className="flex-shrink-0" />
            <span className="font-semibold">${pkg.price}</span>
          </div>
          {isUrgent && (
            <div className="flex items-center text-orange-400 text-sm mt-1">
              <FiClock className="mr-1" />
              <span>Urgent</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
