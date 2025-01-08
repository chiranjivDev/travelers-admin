'use client'

import { motion } from 'framer-motion'
import { 
  FiUsers, 
  FiPackage, 
  FiDollarSign, 
  FiAlertCircle,
  FiTruck,
  FiMap
} from 'react-icons/fi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// Mock data - Replace with real data from API
const deliveryData = [
  { name: 'Jan', deliveries: 400, revenue: 2400, disputes: 24 },
  { name: 'Feb', deliveries: 300, revenue: 1398, disputes: 22 },
  { name: 'Mar', deliveries: 200, revenue: 9800, disputes: 18 },
  { name: 'Apr', deliveries: 278, revenue: 3908, disputes: 20 },
  { name: 'May', deliveries: 189, revenue: 4800, disputes: 15 },
  { name: 'Jun', deliveries: 239, revenue: 3800, disputes: 17 },
]

const regions = [
  { name: 'North America', activeUsers: 1234, deliveries: 567, revenue: 45678 },
  { name: 'Europe', activeUsers: 2345, deliveries: 890, revenue: 78901 },
  { name: 'Asia', activeUsers: 3456, deliveries: 1234, revenue: 90123 },
]

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Active Deliveries',
            value: '1,234',
            change: '+12.5%',
            icon: FiTruck,
            color: 'text-blue-500'
          },
          {
            title: 'Total Revenue',
            value: '$45,678',
            change: '+8.2%',
            icon: FiDollarSign,
            color: 'text-green-500'
          },
          {
            title: 'Open Disputes',
            value: '23',
            change: '-5.1%',
            icon: FiAlertCircle,
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
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full bg-gray-700/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delivery Trends Chart */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Delivery Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="deliveries" 
                stroke="#3B82F6" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="disputes" 
                stroke="#EF4444" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Regional Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <div 
              key={index}
              className="bg-gray-700/50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">{region.name}</h4>
                <FiMap className="text-gray-400 w-5 h-5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-lg font-medium text-white">
                    {region.activeUsers.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Deliveries</p>
                  <p className="text-lg font-medium text-white">
                    {region.deliveries.toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="text-lg font-medium text-white">
                    ${region.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
