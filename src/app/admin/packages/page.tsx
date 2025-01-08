'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
} from 'react-icons/fi'

// Mock data
const mockPackages = [
  {
    id: 'PKG001',
    title: 'Electronics Package',
    sender: 'John Doe',
    receiver: 'Jane Smith',
    status: 'In Transit',
    origin: 'New York',
    destination: 'Los Angeles',
    price: 149.99,
    created_at: '2024-12-20',
  },
  {
    id: 'PKG002',
    title: 'Clothing Items',
    sender: 'Mike Johnson',
    receiver: 'Sarah Wilson',
    status: 'Pending',
    origin: 'Chicago',
    destination: 'Miami',
    price: 79.99,
    created_at: '2024-12-19',
  },
  // Add more mock packages here
]

const statusColors = {
  'In Transit': 'bg-blue-500',
  'Pending': 'bg-yellow-500',
  'Delivered': 'bg-green-500',
  'Cancelled': 'bg-red-500',
}

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredPackages = mockPackages.filter(pkg => {
    const matchesSearch = 
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.receiver.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || pkg.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Package Management</h1>
          <p className="text-gray-400 mt-1">Manage and track all packages</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center space-x-2"
        >
          <FiPackage className="w-5 h-5" />
          <span>Add New Package</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="In Transit">In Transit</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Package ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Sender/Receiver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Route
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
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {pkg.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {pkg.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{pkg.sender}</div>
                    <div className="text-sm text-gray-400">{pkg.receiver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${statusColors[pkg.status]}`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{pkg.origin}</div>
                    <div className="text-sm text-gray-400">{pkg.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${pkg.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:text-blue-400"
                      >
                        <FiEye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:text-yellow-400"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:text-red-400"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
