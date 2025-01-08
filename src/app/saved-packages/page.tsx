import { useState, useEffect } from 'react'
import { useSavedPackages } from '@/contexts/SavedPackagesContext'
import { useNotification } from '@/contexts/NotificationContext'
import PackageCard from '@/components/packages/PackageCard'
import PackageDetailsModal from '@/components/packages/PackageDetailsModal'
import { FiBookmark, FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SavedPackagesContent from '@/components/saved-packages/SavedPackagesContent'

interface Package {
  id: string
  sender: {
    id: string
    name: string
    rating: number
    verification: {
      email: boolean
      phone: boolean
      government: boolean
    }
    completedDeliveries: number
  }
  route: {
    from: string
    to: string
    flexibility: number
  }
  schedule: {
    pickupDate: string
    deliveryDate: string
  }
  package: {
    size: string
    weight: number
    category: string
    description: string
  }
  requirements: {
    fragile: boolean
    hazardous: boolean
    temperature?: {
      min: number
      max: number
    }
  }
  pricing: {
    basePrice: number
    insurancePrice: number
  }
  distance?: number
}

// Mock data for testing
const MOCK_PACKAGES: Package[] = [
  {
    id: '1',
    sender: {
      id: 'sender1',
      name: 'John Doe',
      rating: 4.5,
      verification: {
        email: true,
        phone: true,
        government: true
      },
      completedDeliveries: 25
    },
    route: {
      from: 'New York, NY',
      to: 'Los Angeles, CA',
      flexibility: 3
    },
    schedule: {
      pickupDate: '2024-01-01',
      deliveryDate: '2024-01-05'
    },
    package: {
      size: 'Medium',
      weight: 5,
      category: 'Electronics',
      description: 'Laptop and accessories'
    },
    requirements: {
      fragile: true,
      hazardous: false
    },
    pricing: {
      basePrice: 150,
      insurancePrice: 20
    }
  },
  {
    id: '2',
    sender: {
      id: 'sender2',
      name: 'Jane Smith',
      rating: 4.8,
      verification: {
        email: true,
        phone: true,
        government: true
      },
      completedDeliveries: 42
    },
    route: {
      from: 'Chicago, IL',
      to: 'Miami, FL',
      flexibility: 2
    },
    schedule: {
      pickupDate: '2024-01-03',
      deliveryDate: '2024-01-06'
    },
    package: {
      size: 'Large',
      weight: 10,
      category: 'Furniture',
      description: 'Antique chair'
    },
    requirements: {
      fragile: true,
      hazardous: false,
      temperature: {
        min: 15,
        max: 25
      }
    },
    pricing: {
      basePrice: 200,
      insurancePrice: 50
    }
  }
]

export default function SavedPackagesPage() {
  return <SavedPackagesContent />
}
