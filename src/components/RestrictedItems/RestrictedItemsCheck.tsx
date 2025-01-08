'use client'

import React, { useState } from 'react';
import { FiAlertTriangle, FiCheck, FiX, FiPackage, FiShield, FiAlertOctagon } from 'react-icons/fi';

const RESTRICTED_CATEGORIES = [
  {
    title: 'Dangerous Materials',
    items: [
      { name: 'Weapons', icon: '🔫', description: 'Any type of weapons or ammunition' },
      { name: 'Explosives', icon: '💣', description: 'Fireworks, flares, or explosive materials' },
      { name: 'Flammable Materials', icon: '🔥', description: 'Gasoline, lighter fluid, matches' }
    ]
  },
  {
    title: 'Hazardous Substances',
    items: [
      { name: 'Toxic Substances', icon: '☠️', description: 'Poisons, chemicals, pesticides' },
      { name: 'Radioactive Materials', icon: '☢️', description: 'Any radioactive substances' },
      { name: 'Drugs', icon: '💊', description: 'Illegal drugs and controlled substances' }
    ]
  },
  {
    title: 'Living & Perishables',
    items: [
      { name: 'Live Animals', icon: '🐾', description: 'Any living creatures' },
      { name: 'Perishable Food', icon: '🍖', description: 'Fresh food that can spoil' }
    ]
  },
  {
    title: 'Valuables',
    items: [
      { name: 'Currency', icon: '💵', description: 'Large amounts of cash or bearer instruments' },
      { name: 'Valuable Documents', icon: '📄', description: 'Important original documents' }
    ]
  }
];

interface RestrictedItemsCheckProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function RestrictedItemsCheck({ onValidationChange }: RestrictedItemsCheckProps) {
  const [hasRestrictedItems, setHasRestrictedItems] = useState<boolean | null>(null);
  const [showList, setShowList] = useState(false);

  const handleResponse = (response: boolean) => {
    setHasRestrictedItems(response);
    setShowList(response);
    if (onValidationChange) {
      onValidationChange(!response);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4">
        <div className="flex items-start">
          <FiAlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-200">
              Restricted Items Check
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Does your package contain any restricted items?
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleResponse(true)}
          className={`flex-1 py-3 px-4 rounded-lg border ${
            hasRestrictedItems === true
              ? 'border-red-500 bg-red-500 bg-opacity-10 text-red-500'
              : 'border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center justify-center">
            <FiX className="h-5 w-5 mr-2" />
            Yes
          </div>
        </button>
        <button
          onClick={() => handleResponse(false)}
          className={`flex-1 py-3 px-4 rounded-lg border ${
            hasRestrictedItems === false
              ? 'border-green-500 bg-green-500 bg-opacity-10 text-green-500'
              : 'border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center justify-center">
            <FiCheck className="h-5 w-5 mr-2" />
            No
          </div>
        </button>
      </div>

      {showList && (
        <div className="mt-6">
          <div className="categories-grid">
            {RESTRICTED_CATEGORIES.map((category) => (
              <div key={category.title} className="category-section">
                <h4 className="category-header">{category.title}</h4>
                <div className="category-items">
                  {category.items.map((item) => (
                    <div key={item.name} className="category-item">
                      <div className="item-icon">
                        <span role="img" aria-label={item.name}>
                          {item.icon}
                        </span>
                      </div>
                      <div className="item-content">
                        <div className="item-title">{item.name}</div>
                        <div className="item-description">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-300 flex items-center">
              <FiAlertOctagon className="h-5 w-5 mr-2" />
              Please remove any restricted items before proceeding.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
