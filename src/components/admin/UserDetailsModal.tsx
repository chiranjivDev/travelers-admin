'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiX, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiStar
} from 'react-icons/fi'

interface UserDetailsModalProps {
  user: any // Replace with proper user type
  isOpen: boolean
  onClose: () => void
}

export default function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'activity', label: 'Activity' },
    { id: 'verification', label: 'Verification' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">User Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium transition-colors relative
                      ${activeTab === tab.id
                        ? 'text-blue-400'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400">
                          <FiUser className="w-4 h-4 mr-2" />
                          <span className="text-sm">Full Name</span>
                        </div>
                        <p className="text-white">{user.name}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400">
                          <FiMail className="w-4 h-4 mr-2" />
                          <span className="text-sm">Email</span>
                        </div>
                        <p className="text-white">{user.email}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400">
                          <FiPhone className="w-4 h-4 mr-2" />
                          <span className="text-sm">Phone</span>
                        </div>
                        <p className="text-white">{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400">
                          <FiMapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">Location</span>
                        </div>
                        <p className="text-white">{user.location || 'Not provided'}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-400 mb-2">
                          <FiPackage className="w-4 h-4 mr-2" />
                          <span className="text-sm">Deliveries</span>
                        </div>
                        <p className="text-2xl font-semibold text-white">
                          {user.completedDeliveries}
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-400 mb-2">
                          <FiDollarSign className="w-4 h-4 mr-2" />
                          <span className="text-sm">Revenue</span>
                        </div>
                        <p className="text-2xl font-semibold text-white">
                          ${user.totalRevenue || 0}
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-400 mb-2">
                          <FiStar className="w-4 h-4 mr-2" />
                          <span className="text-sm">Rating</span>
                        </div>
                        <p className="text-2xl font-semibold text-white">
                          {user.rating || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-4">
                    {/* Recent Activity */}
                    {[1, 2, 3].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg"
                      >
                        <div className="p-2 bg-gray-600 rounded-lg">
                          <FiPackage className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Package Delivered</p>
                          <p className="text-sm text-gray-400">
                            Successfully delivered package #1234 to New York
                          </p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'verification' && (
                  <div className="space-y-6">
                    {/* Verification Status */}
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">
                          Verification Status
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                          ${user.verified
                            ? 'bg-green-900/50 text-green-400'
                            : 'bg-yellow-900/50 text-yellow-400'
                          }`}
                        >
                          {user.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="space-y-4">
                        {/* ID Verification */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FiUser className="w-5 h-5 text-gray-400" />
                            <span className="text-white">ID Verification</span>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                            View Documents
                          </button>
                        </div>
                        {/* Add more verification items */}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-700 p-6 bg-gray-800">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
