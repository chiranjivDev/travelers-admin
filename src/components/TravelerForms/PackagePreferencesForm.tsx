'use client'

import React from 'react'
import Link from 'next/link'
import { FiAlertTriangle } from 'react-icons/fi'
import { PACKAGE_CATEGORIES } from '@/constants/packageCategories'
import { TravelerFormData } from './types'

interface PackagePreferencesFormProps {
  formData: TravelerFormData
  onUpdate: (data: Partial<TravelerFormData>) => void
}

export default function PackagePreferencesForm({ formData, onUpdate }: PackagePreferencesFormProps) {
  const handleCategoryChange = (categoryId: string) => {
    const currentItems = formData.packagePreferences?.acceptedItems || []
    const updatedItems = currentItems.includes(categoryId)
      ? currentItems.filter(id => id !== categoryId)
      : [...currentItems, categoryId]

    onUpdate({
      packagePreferences: {
        ...formData.packagePreferences,
        acceptedItems: updatedItems
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          What types of packages are you willing to transport?
        </h2>
        <p className="text-gray-600">
          Select the categories of items you're comfortable transporting. Make sure to review our{' '}
          <Link href="/restricted-items" className="text-blue-600 hover:text-blue-800">
            restricted items guide
          </Link>{' '}
          before making your selection.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please note that some items may require special permits or have restrictions in certain regions.
              Review local regulations before accepting packages.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PACKAGE_CATEGORIES.map((category) => {
          const Icon = category.icon
          const isSelected = formData.packagePreferences?.acceptedItems?.includes(category.id)

          return (
            <div
              key={category.id}
              className={`
                relative rounded-lg border p-4 cursor-pointer transition-all
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                }
              `}
              onClick={() => handleCategoryChange(category.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  p-2 rounded-lg
                  ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
