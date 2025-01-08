'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiPackage, 
  FiClock, 
  FiCheck, 
  FiAlertTriangle,
  FiEye,
  FiMessageSquare,
  FiFlag
} from 'react-icons/fi'
import Modal from './Modal'

// Mock data - Replace with real data from API
const mockDeliveries = [
  {
    id: 1,
    trackingId: 'DEL-2024-001',
    sender: 'John Doe',
    traveler: 'Alice Smith',
    status: 'in-progress',
    origin: 'New York, USA',
    destination: 'London, UK',
    price: 150.00,
    created: '2024-01-15',
    estimatedDelivery: '2024-01-20',
    items: [
      { name: 'Electronics', quantity: 1, declared_value: 500 }
    ],
    notes: 'Handle with care',
    flagged: false
  },
  {
    id: 2,
    trackingId: 'DEL-2024-002',
    sender: 'Jane Smith',
    traveler: 'Bob Johnson',
    status: 'pending',
    origin: 'Paris, France',
    destination: 'Berlin, Germany',
    price: 80.00,
    created: '2024-01-16',
    estimatedDelivery: '2024-01-22',
    items: [
      { name: 'Documents', quantity: 1, declared_value: 100 }
    ],
    notes: 'Urgent delivery',
    flagged: true
  },
  // Add more mock deliveries...
]

type DeliveryStatus = 'pending' | 'in-progress' | 'completed' | 'disputed'

export default function DeliveryManagement() {
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | 'all'>('all')
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400'
      case 'in-progress':
        return 'bg-blue-900/50 text-blue-400'
      case 'completed':
        return 'bg-green-900/50 text-green-400'
      case 'disputed':
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
            title: 'Total Deliveries',
            value: mockDeliveries.length,
            icon: FiPackage,
            color: 'text-blue-500'
          },
          {
            title: 'Pending',
            value: mockDeliveries.filter(d => d.status === 'pending').length,
            icon: FiClock,
            color: 'text-yellow-500'
          },
          {
            title: 'Completed',
            value: mockDeliveries.filter(d => d.status === 'completed').length,
            icon: FiCheck,
            color: 'text-green-500'
          },
          {
            title: 'Flagged',
            value: mockDeliveries.filter(d => d.flagged).length,
            icon: FiAlertTriangle,
            color: 'text-red-500'
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

      {/* Filters */}
      <div className="flex space-x-4">
        {['all', 'pending', 'in-progress', 'completed', 'disputed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as DeliveryStatus | 'all')}
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

      {/* Deliveries Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockDeliveries
                .filter(delivery => statusFilter === 'all' || delivery.status === statusFilter)
                .map((delivery) => (
                  <tr 
                    key={delivery.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {delivery.flagged && (
                          <FiFlag className="w-4 h-4 text-red-400 mr-2" />
                        )}
                        <span className="text-white">{delivery.trackingId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-white">{delivery.origin}</div>
                        <div className="text-gray-400">{delivery.destination}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-white">S: {delivery.sender}</div>
                        <div className="text-gray-400">T: {delivery.traveler}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${getStatusColor(delivery.status)}`}
                      >
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      ${delivery.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={() => {
                            setSelectedDelivery(delivery)
                            setShowDetails(true)
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FiEye className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FiMessageSquare className="w-5 h-5" />
                        </motion.button>
                        {delivery.flagged && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <FiAlertTriangle className="w-5 h-5" />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <Modal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          title={`Delivery Details - ${selectedDelivery.trackingId}`}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Origin</p>
                <p className="text-white">{selectedDelivery.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Destination</p>
                <p className="text-white">{selectedDelivery.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sender</p>
                <p className="text-white">{selectedDelivery.sender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Traveler</p>
                <p className="text-white">{selectedDelivery.traveler}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white">
                  {new Date(selectedDelivery.created).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Estimated Delivery</p>
                <p className="text-white">
                  {new Date(selectedDelivery.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Items</p>
              <div className="bg-gray-700/50 rounded-lg p-4">
                {selectedDelivery.items.map((item: any, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-white">
                      ${item.declared_value.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {selectedDelivery.notes && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Notes</p>
                <p className="text-white bg-gray-700/50 rounded-lg p-4">
                  {selectedDelivery.notes}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
