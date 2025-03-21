'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiClock,
  FiCheck,
  FiDollarSign,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMapPin,
} from 'react-icons/fi';
import Modal from '../admin/Modal';
const mockPackages = [
  {
    id: 1,
    trackingId: 'PKG-2024-001',
    status: 'pending',
    origin: 'New York, USA',
    destination: 'London, UK',
    price: 150.0,
    weight: 2.5,
    dimensions: '30x20x15',
    created: '2024-01-15',
    estimatedDelivery: '2024-01-25',
    traveler: null,
    description: 'Electronics and accessories',
    insurance: true,
    priority: 'standard',
  },
  {
    id: 2,
    trackingId: 'PKG-2024-002',
    status: 'in-transit',
    origin: 'Paris, France',
    destination: 'Berlin, Germany',
    price: 80.0,
    weight: 1.5,
    dimensions: '20x15x10',
    created: '2024-01-16',
    estimatedDelivery: '2024-01-20',
    traveler: {
      name: 'Alice Smith',
      rating: 4.8,
      trips: 45,
    },
    description: 'Documents and small items',
    insurance: false,
    priority: 'express',
  },
];

type PackageStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

export default function PackageManagement() {
  const [statusFilter, setStatusFilter] = useState<PackageStatus | 'all'>(
    'all',
  );
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400';
      case 'in-transit':
        return 'bg-blue-900/50 text-blue-400';
      case 'delivered':
        return 'bg-green-900/50 text-green-400';
      case 'cancelled':
        return 'bg-red-900/50 text-red-400';
      default:
        return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Packages',
            value: mockPackages.filter(
              (p) => p.status !== 'delivered' && p.status !== 'cancelled',
            ).length,
            icon: FiPackage,
            color: 'text-blue-500',
          },
          {
            title: 'In Transit',
            value: mockPackages.filter((p) => p.status === 'in-transit').length,
            icon: FiClock,
            color: 'text-yellow-500',
          },
          {
            title: 'Delivered',
            value: mockPackages.filter((p) => p.status === 'delivered').length,
            icon: FiCheck,
            color: 'text-green-500',
          },
          {
            title: 'Total Spent',
            value: `$${mockPackages.reduce((acc, pkg) => acc + pkg.price, 0).toFixed(2)}`,
            icon: FiDollarSign,
            color: 'text-purple-500',
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
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
        {['all', 'pending', 'in-transit', 'delivered', 'cancelled'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as PackageStatus | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ),
        )}
      </div>

      {/* Packages Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Package ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Traveler
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
              {mockPackages
                .filter(
                  (pkg) =>
                    statusFilter === 'all' || pkg.status === statusFilter,
                )
                .map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiPackage className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-white">{pkg.trackingId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-white flex items-center">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {pkg.origin}
                        </div>
                        <div className="text-gray-400 flex items-center">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {pkg.destination}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full
                        ${getStatusColor(pkg.status)}`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pkg.traveler ? (
                        <div className="text-sm">
                          <div className="text-white">{pkg.traveler.name}</div>
                          <div className="text-gray-400">
                            Rating: {pkg.traveler.rating} ⭐️
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      ${pkg.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setShowDetails(true);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FiEye className="w-5 h-5" />
                        </motion.button>
                        {pkg.status === 'pending' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FiEdit2 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <Modal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          title={`Package Details - ${selectedPackage.trackingId}`}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Origin</p>
                <p className="text-white">{selectedPackage.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Destination</p>
                <p className="text-white">{selectedPackage.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Weight</p>
                <p className="text-white">{selectedPackage.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Dimensions</p>
                <p className="text-white">{selectedPackage.dimensions} cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white">
                  {new Date(selectedPackage.created).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Estimated Delivery</p>
                <p className="text-white">
                  {new Date(
                    selectedPackage.estimatedDelivery,
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Priority</p>
                <p className="text-white capitalize">
                  {selectedPackage.priority}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Insurance</p>
                <p className="text-white">
                  {selectedPackage.insurance ? 'Yes' : 'No'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Description</p>
              <p className="text-white bg-gray-700/50 rounded-lg p-4">
                {selectedPackage.description}
              </p>
            </div>

            {selectedPackage.traveler && (
              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Traveler Information
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-white font-medium">
                    {selectedPackage.traveler.name}
                  </p>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>Rating: {selectedPackage.traveler.rating} ⭐️</p>
                    <p>Completed Trips: {selectedPackage.traveler.trips}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
