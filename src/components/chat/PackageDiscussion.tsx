'use client'

import { motion } from 'framer-motion'
import { FiPackage, FiMapPin, FiCalendar, FiDollarSign } from 'react-icons/fi'

interface PackageDetailsProps {
  package: {
    id: string
    origin: string
    destination: string
    date: string
    price: number
    status: string
  }
}

export default function PackageDiscussion({ package: pkg }: PackageDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-4 mb-4"
    >
      <h3 className="text-white font-medium mb-3 flex items-center">
        <FiPackage className="w-5 h-5 mr-2" />
        Package Details
      </h3>
      <div className="space-y-2">
        <div className="flex items-center text-gray-300">
          <FiMapPin className="w-4 h-4 mr-2" />
          <span>{pkg.origin} → {pkg.destination}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span>{pkg.date}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <FiDollarSign className="w-4 h-4 mr-2" />
          <span>€{pkg.price}</span>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Accept Delivery
        </button>
        <button className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          Negotiate Price
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Quick Responses:
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-600">
          I can deliver this package
        </button>
        <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-600">
          When do you need it delivered?
        </button>
        <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-600">
          Can we discuss the price?
        </button>
      </div>
    </motion.div>
  )
}
