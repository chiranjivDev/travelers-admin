'use client'

import { useState, useEffect } from 'react'
import { useSavedPackages } from '@/contexts/SavedPackagesContext'
import { useNotification } from '@/contexts/NotificationContext'
import PackageCard from '@/components/packages/PackageCard'
import PackageDetailsModal from '@/components/packages/PackageDetailsModal'
import { FiBookmark, FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

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

export default function SavedPackagesContent() {
  const { savedPackages } = useSavedPackages()
  const { showNotification } = useNotification()
  const [packages, setPackages] = useState<Package[]>([])
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSavedPackages = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use mock data and filter based on saved IDs
        const savedPackageData = MOCK_PACKAGES.filter(pkg => 
          savedPackages.includes(pkg.id)
        )
        setPackages(savedPackageData)
      } catch (error) {
        console.error('Error fetching saved packages:', error)
        setError('Failed to load saved packages. Please try again later.')
        showNotification('Failed to load saved packages', 'error', <FiAlertCircle />)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedPackages()
  }, [savedPackages, showNotification])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Saved Packages</h1>
        <div className="flex items-center text-gray-400">
          <FiBookmark className="mr-2" />
          <span>{savedPackages.length} saved</span>
        </div>
      </div>

      {error ? (
        <div className="text-center py-16">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Error</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-16">
          <FiBookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No saved packages</h3>
          <p className="text-gray-400">
            Packages you save will appear here for easy access
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map(pkg => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onViewDetails={() => {
                setSelectedPackage(pkg)
                setIsModalOpen(true)
              }}
            />
          ))}
        </motion.div>
      )}

      {selectedPackage && (
        <PackageDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedPackage(null)
          }}
          package={selectedPackage}
        />
      )}
    </div>
  )
}
