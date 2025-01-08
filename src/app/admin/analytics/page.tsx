'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { FiDownload, FiCalendar } from 'react-icons/fi'

// Mock data
const deliveryData = [
  { name: 'Jan', completed: 65, cancelled: 12, pending: 23 },
  { name: 'Feb', completed: 78, cancelled: 8, pending: 28 },
  { name: 'Mar', completed: 82, cancelled: 15, pending: 31 },
  { name: 'Apr', completed: 95, cancelled: 10, pending: 25 },
  { name: 'May', completed: 110, cancelled: 7, pending: 29 },
  { name: 'Jun', completed: 125, cancelled: 11, pending: 35 },
]

const revenueData = [
  { name: 'Jan', revenue: 12500 },
  { name: 'Feb', revenue: 15800 },
  { name: 'Mar', revenue: 14200 },
  { name: 'Apr', revenue: 18900 },
  { name: 'May', revenue: 22400 },
  { name: 'Jun', revenue: 25600 },
]

const userTypeData = [
  { name: 'Regular Users', value: 60 },
  { name: 'Travelers', value: 25 },
  { name: 'Business', value: 15 },
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor your platform's performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium flex items-center space-x-2"
          >
            <FiDownload className="w-5 h-5" />
            <span>Export Data</span>
          </motion.button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Trends */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Delivery Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  name="Completed"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stackId="1"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  name="Pending"
                />
                <Area
                  type="monotone"
                  dataKey="cancelled"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#EF4444"
                  name="Cancelled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Revenue"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">User Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#3B82F6" name="Completed" />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                <Bar dataKey="cancelled" fill="#EF4444" name="Cancelled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$125,430', change: '+12.5%' },
          { title: 'Active Users', value: '8,549', change: '+23.1%' },
          { title: 'Completed Deliveries', value: '3,245', change: '+18.7%' },
          { title: 'Average Rating', value: '4.8', change: '+0.3' },
        ].map((metric, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-gray-400 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold text-white mt-2">{metric.value}</p>
            <span className="text-green-400 text-sm font-medium">{metric.change}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
