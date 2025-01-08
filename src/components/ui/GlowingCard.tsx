'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface GlowingCardProps {
  label: string
  value: string | number
  className?: string
}

const GlowingCard: React.FC<GlowingCardProps> = ({ label, value, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-lg overflow-hidden ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 blur-xl" />
      
      {/* Content */}
      <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">{label}</span>
          <span className="text-2xl font-bold text-emerald-400">
            {typeof value === 'number' ? `€${value.toFixed(2)}` : value}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default GlowingCard
