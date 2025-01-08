'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiClock,
  FiCheck,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus
} from 'react-icons/fi'
import Modal from '../admin/Modal'

// Mock data
const mockTrips = [
  {
    id: 1,
    status: 'upcoming',
    origin: 'New York, USA',
    destination: 'London, UK',
    departureDate: '2024-02-01',
    arrivalDate: '2024-02-02',
    capacity: {
      total: '20kg',
      available: '15kg'
    },
    pricePerKg: 15,
    packages: [
      {
        id: 1,
        trackingId: 'PKG-2024-001',
        sender: 'John Doe',
        weight: '5kg',
        price: 75.00,
        status: 'confirmed'
      }
    ],
    notes: 'Direct flight, can carry electronics and documents',
    transportMode: 'Flight',
    flightNumber: 'BA178'
  },
  {
    id: 2,
    status: 'in-progress',
    origin: 'Paris, France',
    destination: 'Berlin, Germany',
    departureDate: '2024-01-20',
    arrivalDate: '2024-01-21',
    capacity: {
      total: '15kg',
      available: '10kg'
    },
    pricePerKg: 12,
    packages: [
      {
        id: 2,
        trackingId: 'PKG-2024-002',
        sender: 'Jane Smith',
        weight: '5kg',
        price: 60.00,
        status: 'in-transit'
      }
    ],
    notes: 'Train journey, flexible with pickup/delivery times',
    transportMode: 'Train',
    trainNumber: 'TGV 6201'
  },
  // Add more mock trips...
]

type TripStatus = 'upcoming' | 'in-progress' | 'completed' | 'cancelled'

export default function TripManagement() {
  const [statusFilter, setStatusFilter] = useState<TripStatus | 'all'>('all')
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-900/50 text-blue-400'
      case 'in-progress':
        return 'bg-yellow-900/50 text-yellow-400'
      case 'completed':
        return 'bg-green-900/50 text-green-400'
      case 'cancelled':
        return 'bg-red-900/50 text-red-400'
      default:
        return 'bg-gray-900/50 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Trips',
            value: mockTrips.filter(t => t.status === 'in-progress').length,
            icon: FiMapPin,
            color: 'text-blue-500'
          },
          {
            title: 'Total Packages',
            value: mockTrips.reduce((acc, trip) => acc + trip.packages.length, 0),
            icon: FiPackage,
            color: 'text-yellow-500'
          },
          {
            title: 'Available Capacity',
            value: mockTrips
              .filter(t => t.status !== 'completed' && t.status !== 'cancelled')
              .reduce((acc, trip) => acc + parseInt(trip.capacity.available), 0) + 'kg',
            icon: FiClock,
            color: 'text-green-500'
          },
          {
            title: 'Potential Earnings',
            value: `$${mockTrips
              .filter(t => t.status !== 'completed' && t.status !== 'cancelled')
              .reduce((acc, trip) => {
                const availableKg = parseInt(trip.capacity.available)
                return acc + (availableKg * trip.pricePerKg)
              }, 0).toFixed(2)}`,
            icon: FiDollarSign,
            color: 'text-purple-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-700/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Trip Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg
            text-white font-medium flex items-center space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add New Trip</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {['all', 'upcoming', 'in-progress', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as TripStatus | 'all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${statusFilter === status 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTrips
          .filter(trip => statusFilter === 'all' || trip.status === statusFilter)
          .map((trip) => (
            <motion.div
              key={trip.id}
              className="bg-gray-800 rounded-xl p-6 space-y-4"
              whileHover={{ y: -4 }}
            >
              {/* Trip Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${getStatusColor(trip.status)}`}
                  >
                    {trip.status}
                  </span>
                  <span className="text-gray-400">{trip.transportMode}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => {
                      setSelectedTrip(trip)
                      setShowDetails(true)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FiEye className="w-5 h-5" />
                  </motion.button>
                  {trip.status === 'upcoming' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {/* Route */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  <span>{trip.origin}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  <span>{trip.destination}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Departure</p>
                  <div className="flex items-center mt-1">
                    <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-white">
                      {new Date(trip.departureDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Arrival</p>
                  <div className="flex items-center mt-1">
                    <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-white">
                      {new Date(trip.arrivalDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Capacity and Price */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
                <div>
                  <p className="text-sm text-gray-400">Capacity</p>
                  <div className="flex items-center mt-1">
                    <FiPackage className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-white">
                      {trip.capacity.available} / {trip.capacity.total}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Price per kg</p>
                  <div className="flex items-center mt-1">
                    <FiDollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-white">${trip.pricePerKg}</span>
                  </div>
                </div>
              </div>

              {/* Packages Summary */}
              <div className="pt-2 border-t border-gray-700">
                <p className="text-sm text-gray-400">Packages</p>
                <p className="text-white mt-1">
                  {trip.packages.length} package{trip.packages.length !== 1 ? 's' : ''} assigned
                </p>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <Modal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          title={`Trip Details - ${selectedTrip.origin} to ${selectedTrip.destination}`}
        >
          <div className="space-y-6">
            {/* Trip Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                  ${getStatusColor(selectedTrip.status)}`}
                >
                  {selectedTrip.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Transport Mode</p>
                <p className="text-white">{selectedTrip.transportMode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Origin</p>
                <p className="text-white">{selectedTrip.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Destination</p>
                <p className="text-white">{selectedTrip.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Departure</p>
                <p className="text-white">
                  {new Date(selectedTrip.departureDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Arrival</p>
                <p className="text-white">
                  {new Date(selectedTrip.arrivalDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Available Capacity</p>
                <p className="text-white">
                  {selectedTrip.capacity.available} / {selectedTrip.capacity.total}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Price per kg</p>
                <p className="text-white">${selectedTrip.pricePerKg}</p>
              </div>
            </div>

            {selectedTrip.notes && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Notes</p>
                <p className="text-white bg-gray-700/50 rounded-lg p-4">
                  {selectedTrip.notes}
                </p>
              </div>
            )}

            {/* Packages */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Assigned Packages</p>
              <div className="space-y-4">
                {selectedTrip.packages.map((pkg: any) => (
                  <div key={pkg.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-white font-medium">{pkg.trackingId}</span>
                        <p className="text-sm text-gray-400">From: {pkg.sender}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${getStatusColor(pkg.status)}`}
                      >
                        {pkg.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Weight: {pkg.weight}</span>
                      <span className="text-gray-300">Price: ${pkg.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedTrip.status === 'upcoming' && (
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg
                    text-white font-medium"
                >
                  Edit Trip
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg
                    text-white font-medium"
                >
                  Cancel Trip
                </motion.button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
