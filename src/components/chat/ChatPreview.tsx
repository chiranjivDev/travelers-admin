'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiMessageCircle, FiClock, FiStar } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatPreviewProps {
  userId: string
  userName: string
  userAvatar: string
  rating: number
  responseTime: string
  isOnline?: boolean
  lastActive?: string
  previewMessage?: string
}

export default function ChatPreview({
  userId,
  userName,
  userAvatar,
  rating,
  responseTime,
  isOnline = false,
  lastActive,
  previewMessage
}: ChatPreviewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  useEffect(() => {
    if (isVisible && !hasAnimatedIn) {
      setHasAnimatedIn(true)
    }
  }, [isVisible, hasAnimatedIn])

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-2 right-0 w-72 bg-gray-800 rounded-lg shadow-xl p-4 z-50"
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{userName}</h4>
                  <div className="flex items-center text-sm">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-yellow-400">{rating}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center text-gray-400">
                  <FiClock className="mr-1" />
                  <span>{responseTime}</span>
                </div>
                <div className="text-gray-400">
                  {isOnline ? (
                    <span className="text-green-400">Online now</span>
                  ) : (
                    lastActive && `Last seen ${lastActive}`
                  )}
                </div>
              </div>

              {/* Preview Message */}
              {previewMessage && (
                <div className="text-gray-300 text-sm mb-3">
                  {previewMessage}
                </div>
              )}

              {/* Start Chat Button */}
              <motion.div
                initial={hasAnimatedIn ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors">
                  <FiMessageCircle />
                  <span>Start Chat</span>
                </button>
              </motion.div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4 mt-3 text-sm">
                <button className="text-gray-400 hover:text-white transition-colors">
                  View Profile
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Block User
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
