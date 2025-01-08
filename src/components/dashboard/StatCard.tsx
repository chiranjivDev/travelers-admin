'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface StatCardProps {
  title: string
  value: string | number
  icon: IconType
  trend?: {
    value: number
    isPositive: boolean
  }
  description?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-gray-400 ml-1">vs last month</span>
            </p>
          )}
          {description && (
            <p className="text-sm text-gray-400 mt-2">{description}</p>
          )}
        </div>
        <div className="bg-blue-600/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </motion.div>
  )
}
