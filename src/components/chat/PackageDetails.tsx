'use client'

import { Package, TripDetails, useSimpleChat } from '@/contexts/SimpleChatContext'
import { useEffect, useCallback } from 'react'
import { FiPackage, FiMap, FiCalendar, FiDollarSign, FiInfo, FiCamera, FiThermometer, FiShield, FiClock, FiTruck } from 'react-icons/fi'

interface PackageDetailsProps {
  onClose: () => void
}

export default function PackageDetails({ onClose }: PackageDetailsProps) {
  const { activePackage, currentUser, otherUser, updatePackage } = useSimpleChat()

  const handleClose = useCallback((e: React.MouseEvent | KeyboardEvent) => {
    if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Escape') {
      return
    }
    onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleClose)
    return () => document.removeEventListener('keydown', handleClose)
  }, [handleClose])

  if (!activePackage) return null

  const isSender = currentUser?.role === 'sender'
  const travelerTrip = otherUser?.role === 'traveler' ? otherUser.activeTrip : null

  const renderTripMatch = (pkg: Package, trip?: TripDetails | null) => {
    if (!trip) return null

    const matchScore = calculateTripMatch(pkg, trip)
    const matchClass = matchScore > 80 ? 'bg-green-500' : matchScore > 50 ? 'bg-yellow-500' : 'bg-red-500'

    return (
      <div className="mt-4 p-4 rounded-lg bg-gray-800">
        <h3 className="text-lg font-semibold mb-2">Trip Match Analysis</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className={`h-2 flex-grow rounded ${matchClass}`} style={{ width: `${matchScore}%` }} />
          <span>{matchScore}% Match</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Route Match:</span>
            <span>{pkg.origin === trip.route.from && pkg.destination === trip.route.to ? '✅' : '❌'}</span>
          </div>
          <div className="flex justify-between">
            <span>Date Match:</span>
            <span>{isDateWithinRange(pkg.date, trip.dates) ? '✅' : '❌'}</span>
          </div>
          <div className="flex justify-between">
            <span>Weight Limit:</span>
            <span>{pkg.weight <= trip.preferences.maxWeight ? '✅' : '❌'}</span>
          </div>
          <div className="flex justify-between">
            <span>Available Capacity:</span>
            <span>{pkg.weight <= trip.capacity.available ? '✅' : '❌'}</span>
          </div>
        </div>
      </div>
    )
  }

  const calculateTripMatch = (pkg: Package, trip: TripDetails): number => {
    let score = 0

    // Route match (40%)
    if (pkg.origin === trip.route.from && pkg.destination === trip.route.to) {
      score += 40
    } else if (trip.route.stops?.includes(pkg.destination)) {
      score += 30
    }

    // Date match (30%)
    if (isDateWithinRange(pkg.date, trip.dates)) {
      score += 30
    }

    // Weight and capacity (20%)
    if (pkg.weight <= trip.preferences.maxWeight && pkg.weight <= trip.capacity.available) {
      score += 20
    } else if (pkg.weight <= trip.preferences.maxWeight) {
      score += 10
    }

    // Package type compatibility (10%)
    const packageType = pkg.category?.toLowerCase() || ''
    if (trip.preferences.acceptedTypes.some(type => packageType.includes(type.toLowerCase()))) {
      score += 10
    }

    return score
  }

  const isDateWithinRange = (date: string, tripDates: TripDetails['dates']) => {
    const packageDate = new Date(date)
    const departureDate = new Date(tripDates.departure)
    const arrivalDate = new Date(tripDates.arrival)
    const flexibilityMs = tripDates.flexibility * 24 * 60 * 60 * 1000

    return packageDate >= new Date(departureDate.getTime() - flexibilityMs) &&
           packageDate <= new Date(arrivalDate.getTime() + flexibilityMs)
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" 
      style={{ zIndex: 9999 }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gray-900 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
          aria-label="Close dialog"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pr-12">
          <h2 className="text-xl font-semibold mb-6">Package Details</h2>
          
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FiPackage className="text-blue-400" />
              <span className="font-medium">ID:</span>
              <span className="text-gray-300">{activePackage.id}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiMap className="text-green-400" />
              <span className="font-medium">Route:</span>
              <span className="text-gray-300">
                {activePackage.origin} → {activePackage.destination}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiCalendar className="text-purple-400" />
              <span className="font-medium">Delivery Date:</span>
              <span className="text-gray-300">{activePackage.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiDollarSign className="text-yellow-400" />
              <span className="font-medium">Price:</span>
              <span className="text-gray-300">${activePackage.price}</span>
            </div>
          </div>

          {/* Package Specifications */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400">Weight:</span>
                <div className="text-white">{activePackage.weight} kg</div>
              </div>
              <div>
                <span className="text-gray-400">Dimensions:</span>
                <div className="text-white">{activePackage.dimensions}</div>
              </div>
              <div>
                <span className="text-gray-400">Category:</span>
                <div className="text-white">{activePackage.category || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <div className="text-white capitalize">{activePackage.status.replace('_', ' ')}</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <FiShield className={activePackage.insurance ? 'text-green-400' : 'text-gray-500'} />
                <span>Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className={activePackage.priority ? 'text-green-400' : 'text-gray-500'} />
                <span>Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTruck className={activePackage.tracking ? 'text-green-400' : 'text-gray-500'} />
                <span>Tracking</span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {activePackage.requirements && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <div className="space-y-3">
                {activePackage.requirements.handling.length > 0 && (
                  <div>
                    <span className="text-gray-400">Handling:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {activePackage.requirements.handling.map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {activePackage.requirements.temperature && (
                  <div className="flex items-center gap-2">
                    <FiThermometer className="text-red-400" />
                    <span className="text-gray-400">Temperature:</span>
                    <span>
                      {activePackage.requirements.temperature.min}°C - {activePackage.requirements.temperature.max}°C
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className={activePackage.requirements.fragile ? 'text-yellow-400' : 'text-gray-500'}>
                      📦
                    </span>
                    <span>Fragile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={activePackage.requirements.hazardous ? 'text-red-400' : 'text-gray-500'}>
                      ⚠️
                    </span>
                    <span>Hazardous</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photos */}
          {activePackage.photos && activePackage.photos.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-3">Photos</h3>
              <div className="grid grid-cols-2 gap-2">
                {activePackage.photos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img src={photo} alt={`Package photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {activePackage.specialInstructions && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-3">Special Instructions</h3>
              <div className="bg-gray-800 p-3 rounded-lg">
                <FiInfo className="inline-block mr-2 text-blue-400" />
                {activePackage.specialInstructions}
              </div>
            </div>
          )}

          {/* Trip Match Analysis (only show for travelers) */}
          {!isSender && renderTripMatch(activePackage, travelerTrip)}

          {/* History Timeline */}
          {activePackage.history && activePackage.history.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-3">History</h3>
              <div className="space-y-4">
                {activePackage.history.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      {index < activePackage.history!.length - 1 && (
                        <div className="absolute top-2 left-1/2 w-px h-full -translate-x-1/2 bg-gray-700" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                      <div className="font-medium capitalize">{event.status.replace('_', ' ')}</div>
                      {event.location && (
                        <div className="text-sm text-gray-300">
                          <FiMap className="inline-block mr-1" /> {event.location}
                        </div>
                      )}
                      {event.note && (
                        <div className="text-sm text-gray-300 mt-1">{event.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
