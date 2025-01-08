'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface AvatarProps {
  src: string | null
  alt: string
  size?: number
  className?: string
}

export default function Avatar({ src, alt, size = 40, className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (!src || imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-blue-500 text-white font-medium ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-sm">{initials}</span>
      </div>
    )
  }

  return (
    <div style={{ width: size, height: size }} className={className}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
