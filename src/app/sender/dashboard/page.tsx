'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import StatCard from '@/components/dashboard/StatCard'
import LineChart from '@/components/dashboard/charts/LineChart'
import DonutChart from '@/components/dashboard/charts/DonutChart'
import { 
  FiPackage, 
  FiSearch, 
  FiTruck, 
  FiDollarSign, 
  FiStar,
  FiFilter,
  FiRefreshCw,
  FiBookmark
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data for demonstration
const mockPackages = [
  {
    id: 1,
    name: 'Electronics Package',
    status: 'In Transit',
    origin: 'Amsterdam',
    destination: 'Paris',
    traveler: 'John Smith',
    date: '2024-01-15',
    tracking: 'TRK123456'
  },
  {
    id: 2,
    name: 'Gift Package',
    status: 'Pending',
    origin: 'Rotterdam',
    destination: 'Berlin',
    traveler: 'Pending Match',
    date: '2024-01-20',
    tracking: 'TRK789012'
  }
]

const mockStats = {
  activePackages: 2,
  deliveredPackages: 15,
  totalSpent: 450,
  averageRating: 4.8
}

// Mock chart data
const spendingData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [350, 450, 320, 480, 410, 520],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true
    }
  ]
}

const packageStatusData = {
  labels: ['In Transit', 'Delivered', 'Pending', 'Cancelled'],
  datasets: [{
    data: [4, 8, 2, 1],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ],
    borderColor: [
      'rgb(59, 130, 246)',
      'rgb(34, 197, 94)',
      'rgb(245, 158, 11)',
      'rgb(239, 68, 68)'
    ],
    borderWidth: 1
  }]
}

const savedPackages = [
  {
    id: 1,
    name: 'Saved Package 1',
    status: 'In Transit',
    origin: 'Amsterdam',
    destination: 'Paris',
    traveler: 'John Smith',
    date: '2024-01-15',
    tracking: 'TRK123456'
  },
  {
    id: 2,
    name: 'Saved Package 2',
    status: 'Pending',
    origin: 'Rotterdam',
    destination: 'Berlin',
    traveler: 'Pending Match',
    date: '2024-01-20',
    tracking: 'TRK789012'
  }
]

const dashboardSections = [
  {
    title: 'My Packages',
    icon: FiPackage,
    path: '/sender/packages'
  },
  {
    title: 'Saved Packages',
    icon: FiBookmark,
    path: '/saved-packages',
    badge: savedPackages?.length || 0
  },
  {
    title: 'Active Deliveries',
    icon: FiTruck,
    path: '/sender/deliveries'
  },
  {
    title: 'Payment History',
    icon: FiDollarSign,
    path: '/sender/payments'
  }
]

export default function SenderDashboard() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <DashboardLayout
      title="Sender Dashboard"
      description="Track and manage your packages"
    >
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search packages..."
              className="bg-gray-900 text-white text-sm rounded-lg pl-10 pr-4 py-2 w-64 border border-gray-700 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-900 text-white text-sm rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className={`p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        >
          <FiRefreshCw className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Packages"
          value={mockStats.activePackages}
          icon={FiPackage}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Delivered"
          value={mockStats.deliveredPackages}
          icon={FiTruck}
          description="This month"
        />
        <StatCard
          title="Total Spent"
          value={`€${mockStats.totalSpent}`}
          icon={FiDollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Average Rating"
          value={mockStats.averageRating}
          icon={FiStar}
          description="From 15 reviews"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart
          data={spendingData}
          title="Spending Overview"
          height={300}
        />
        <DonutChart
          data={packageStatusData}
          title="Package Status Distribution"
          height={300}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-blue-600 rounded-xl text-white flex items-center justify-center space-x-3 hover:bg-blue-700 transition-colors"
        >
          <FiPackage className="w-6 h-6" />
          <span className="font-medium">Send a Package</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-purple-600 rounded-xl text-white flex items-center justify-center space-x-3 hover:bg-purple-700 transition-colors"
        >
          <FiSearch className="w-6 h-6" />
          <span className="font-medium">Track Packages</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-green-600 rounded-xl text-white flex items-center justify-center space-x-3 hover:bg-green-700 transition-colors"
        >
          <FiTruck className="w-6 h-6" />
          <span className="font-medium">Find Travelers</span>
        </motion.button>
      </div>

      {/* Recent Packages Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Recent Packages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Package</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Route</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Traveler</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Date</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-white">{pkg.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">
                      {pkg.origin} → {pkg.destination}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">{pkg.traveler}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pkg.status === 'In Transit' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">{pkg.date}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-mono text-gray-300">{pkg.tracking}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved Packages Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Saved Packages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Package</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Route</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Traveler</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Date</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {savedPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-white">{pkg.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">
                      {pkg.origin} → {pkg.destination}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">{pkg.traveler}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pkg.status === 'In Transit' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">{pkg.date}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-mono text-gray-300">{pkg.tracking}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Package Details
              </h3>
              {/* Add package details content here */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}
