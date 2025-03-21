'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiCalendar,
  FiDownload,
  FiBarChart2,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi'
  const mockEarnings = {
  totalEarnings: 2850.00,
  pendingPayouts: 450.00,
  completedDeliveries: 24,
  averageRating: 4.8,
  monthlyStats: [
    { month: 'Jan', earnings: 850 },
    { month: 'Feb', earnings: 920 },
    { month: 'Mar', earnings: 1080 }
  ],
  recentTransactions: [
    {
      id: 1,
      date: '2024-01-15',
      amount: 150.00,
      type: 'earning',
      description: 'Package delivery - PKG-2024-001',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-10',
      amount: 200.00,
      type: 'payout',
      description: 'Weekly payout',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-05',
      amount: 180.00,
      type: 'earning',
      description: 'Package delivery - PKG-2024-002',
      status: 'pending'
    }
  ],
  performanceMetrics: {
    deliverySuccess: 98,
    onTimeDelivery: 95,
    customerSatisfaction: 92
  }
}

export default function EarningsDashboard() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Earnings',
            value: `$${mockEarnings.totalEarnings.toFixed(2)}`,
            icon: FiDollarSign,
            color: 'text-green-500',
            change: '+12%',
            changeType: 'positive'
          },
          {
            title: 'Pending Payouts',
            value: `$${mockEarnings.pendingPayouts.toFixed(2)}`,
            icon: FiTrendingUp,
            color: 'text-yellow-500',
            change: '$450.00',
            changeType: 'neutral'
          },
          {
            title: 'Completed Deliveries',
            value: mockEarnings.completedDeliveries,
            icon: FiPackage,
            color: 'text-blue-500',
            change: '+3',
            changeType: 'positive'
          },
          {
            title: 'Average Rating',
            value: mockEarnings.averageRating,
            icon: FiBarChart2,
            color: 'text-purple-500',
            change: '+0.2',
            changeType: 'positive'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full bg-gray-700/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.change && (
                <div className={`flex items-center text-sm
                  ${stat.changeType === 'positive' ? 'text-green-400' :
                    stat.changeType === 'negative' ? 'text-red-400' :
                    'text-gray-400'}`}
                >
                  {stat.changeType === 'positive' ? (
                    <FiArrowUp className="w-4 h-4 mr-1" />
                  ) : stat.changeType === 'negative' ? (
                    <FiArrowDown className="w-4 h-4 mr-1" />
                  ) : null}
                  {stat.change}
                </div>
              )}
            </div>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <motion.div
          className="bg-gray-800 rounded-xl p-6"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">Monthly Earnings</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <FiDownload className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {mockEarnings.monthlyStats.map((stat, index) => {
              const height = (stat.earnings / 1200) * 100                return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-600/50 rounded-t-lg transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-gray-400 text-sm mt-2">{stat.month}</div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="bg-gray-800 rounded-xl p-6"
          whileHover={{ y: -4 }}
        >
          <h3 className="text-lg font-medium text-white mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {Object.entries(mockEarnings.performanceMetrics).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </span>
                  <span className="text-white">{value}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="bg-gray-800 rounded-xl overflow-hidden"
        whileHover={{ y: -4 }}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Recent Transactions</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1
                    text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1
                    text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockEarnings.recentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${transaction.type === 'earning'
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-blue-900/50 text-blue-400'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={transaction.type === 'earning'
                      ? 'text-green-400'
                      : 'text-blue-400'
                    }>
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${transaction.status === 'completed'
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-yellow-900/50 text-yellow-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
