'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import StatCard from '@/components/dashboard/StatCard'
import LineChart from '@/components/dashboard/charts/LineChart'
import DonutChart from '@/components/dashboard/charts/DonutChart'
import BarChart from '@/components/dashboard/charts/BarChart'
import { 
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiAlertCircle,
  FiShield,
  FiSearch,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data
const mockStats = {
  totalUsers: 15420,
  activeDeliveries: 845,
  monthlyRevenue: 28500,
  growthRate: 23,
  verificationPending: 12,
  reportedIssues: 5
}

const mockRecentUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'sender',
    status: 'active',
    joined: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'traveler',
    status: 'pending',
    joined: '2024-01-14'
  }
]

const mockRecentDeliveries = [
  {
    id: 1,
    packageId: 'PKG123',
    sender: 'Alice Brown',
    traveler: 'Bob Wilson',
    route: 'Amsterdam → Paris',
    status: 'in_transit',
    value: 150
  },
  {
    id: 2,
    packageId: 'PKG124',
    sender: 'Charlie Davis',
    traveler: 'Diana Evans',
    route: 'Rotterdam → Berlin',
    status: 'pending',
    value: 200
  }
]

// Mock chart data
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 28500],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true
    }
  ]
}

const userTypeData = {
  labels: ['Senders', 'Travelers', 'Both'],
  datasets: [{
    data: [8500, 5200, 1720],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(34, 197, 94, 0.8)'
    ],
    borderColor: [
      'rgb(59, 130, 246)',
      'rgb(139, 92, 246)',
      'rgb(34, 197, 94)'
    ],
    borderWidth: 1
  }]
}

const deliveriesData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Deliveries',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderColor: 'rgb(139, 92, 246)',
      borderWidth: 1
    }
  ]
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'users' | 'deliveries'>('overview')
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
      title="Admin Dashboard" 
      description="System overview and management"
    >
      {/* Top Actions */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveView('deliveries')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'deliveries'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Deliveries
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-900 text-white text-sm rounded-lg pl-10 pr-4 py-2 w-64 border border-gray-700 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
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
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value={mockStats.totalUsers.toLocaleString()}
                icon={FiUsers}
                trend={{ value: 15, isPositive: true }}
              />
              <StatCard
                title="Active Deliveries"
                value={mockStats.activeDeliveries}
                icon={FiPackage}
                description="Currently in transit"
              />
              <StatCard
                title="Monthly Revenue"
                value={`€${mockStats.monthlyRevenue.toLocaleString()}`}
                icon={FiDollarSign}
                trend={{ value: mockStats.growthRate, isPositive: true }}
              />
              <StatCard
                title="Growth Rate"
                value={`${mockStats.growthRate}%`}
                icon={FiTrendingUp}
                description="Month over month"
              />
              <StatCard
                title="Pending Verifications"
                value={mockStats.verificationPending}
                icon={FiShield}
                description="Require review"
              />
              <StatCard
                title="Reported Issues"
                value={mockStats.reportedIssues}
                icon={FiAlertCircle}
                description="Need attention"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <LineChart
                data={revenueData}
                title="Revenue Overview"
                height={300}
              />
              <DonutChart
                data={userTypeData}
                title="User Distribution"
                height={300}
              />
            </div>
            <div className="mb-8">
              <BarChart
                data={deliveriesData}
                title="Weekly Deliveries"
                height={300}
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Recent Users</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">User</th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Role</th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Status</th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {mockRecentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-700/50 transition-colors">
                          <td className="py-4 px-6">
                            <div>
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-300 capitalize">{user.role}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-300">{user.joined}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Deliveries */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold text-white">Recent Deliveries</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Package ID</th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Route</th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Status</th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {mockRecentDeliveries.map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-700/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="text-sm font-mono text-white">{delivery.packageId}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-300">{delivery.route}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              delivery.status === 'in_transit'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {delivery.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-300">€{delivery.value}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">User Management</h2>
            <div className="text-center text-gray-400 py-12">
              Full user management interface coming soon...
            </div>
          </motion.div>
        )}

        {activeView === 'deliveries' && (
          <motion.div
            key="deliveries"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Delivery Management</h2>
            <div className="text-center text-gray-400 py-12">
              Full delivery management interface coming soon...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}
