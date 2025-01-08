'use client'

import { motion } from 'framer-motion'
import { User, USERS } from '@/contexts/SimpleChatContext'

interface UserSelectorProps {
  onSelect: (user: User) => void
}

export default function UserSelector({ onSelect }: UserSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h2 className="text-xl font-semibold text-white mb-8">Select Your Role</h2>
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(USERS.SENDER)}
          className="flex flex-col items-center p-6 bg-blue-600 rounded-xl text-white hover:bg-blue-700"
        >
          <img
            src={USERS.SENDER.avatar}
            alt="Sender"
            className="w-16 h-16 rounded-full mb-4"
          />
          <span className="font-medium">Join as Sender</span>
          <span className="text-sm text-blue-200 mt-1">{USERS.SENDER.name}</span>
          <div className="mt-2 text-xs text-blue-200">
            <div>Rating: {USERS.SENDER.rating}★</div>
            <div>{USERS.SENDER.deliveryCount} Deliveries</div>
            <div>{USERS.SENDER.verificationLevel}</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(USERS.TRAVELER)}
          className="flex flex-col items-center p-6 bg-purple-600 rounded-xl text-white hover:bg-purple-700"
        >
          <img
            src={USERS.TRAVELER.avatar}
            alt="Traveler"
            className="w-16 h-16 rounded-full mb-4"
          />
          <span className="font-medium">Join as Traveler</span>
          <span className="text-sm text-purple-200 mt-1">{USERS.TRAVELER.name}</span>
          <div className="mt-2 text-xs text-purple-200">
            <div>Rating: {USERS.TRAVELER.rating}★</div>
            <div>{USERS.TRAVELER.deliveryCount} Deliveries</div>
            <div>{USERS.TRAVELER.verificationLevel}</div>
          </div>
        </motion.button>
      </div>
    </div>
  )
}
