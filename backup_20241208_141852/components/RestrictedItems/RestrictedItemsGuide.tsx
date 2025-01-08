'use client'

import React, { useState } from 'react';
import { FiAlertTriangle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const RESTRICTED_CATEGORIES = [
  {
    name: 'Dangerous Goods',
    items: [
      {
        name: 'Explosives',
        examples: 'Fireworks, ammunition, flares',
        reason: 'Risk of explosion during transport'
      },
      {
        name: 'Flammable Materials',
        examples: 'Gasoline, lighter fluid, matches',
        reason: 'Fire hazard during transport'
      },
      {
        name: 'Toxic Substances',
        examples: 'Pesticides, chemicals, poisons',
        reason: 'Health risk to handlers and other packages'
      }
    ]
  },
  {
    name: 'Controlled Substances',
    items: [
      {
        name: 'Illegal Drugs',
        examples: 'Narcotics, unauthorized medications',
        reason: 'Legal restrictions and liability'
      },
      {
        name: 'Alcohol',
        examples: 'Wine, spirits, beer',
        reason: 'Requires special licensing and handling'
      },
      {
        name: 'Tobacco',
        examples: 'Cigarettes, cigars, vaping products',
        reason: 'Subject to customs regulations'
      }
    ]
  },
  {
    name: 'Perishables',
    items: [
      {
        name: 'Fresh Food',
        examples: 'Meat, dairy, produce',
        reason: 'Risk of spoilage during transit'
      },
      {
        name: 'Live Plants',
        examples: 'Seeds, flowers, saplings',
        reason: 'May not survive transit conditions'
      },
      {
        name: 'Live Animals',
        examples: 'Pets, insects, fish',
        reason: 'Requires special care and permits'
      }
    ]
  },
  {
    name: 'Valuables',
    items: [
      {
        name: 'Currency',
        examples: 'Cash, coins, bearer bonds',
        reason: 'High theft risk and insurance limitations'
      },
      {
        name: 'Jewelry',
        examples: 'Precious metals, gems, watches',
        reason: 'Value exceeds standard insurance coverage'
      },
      {
        name: 'Important Documents',
        examples: 'Passports, certificates, contracts',
        reason: 'Risk of loss and irreplaceability'
      }
    ]
  }
];

export default function RestrictedItemsGuide() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4">
        <div className="flex items-start">
          <FiAlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-200">
              Restricted Items Guide
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              The following items are not allowed for safety and legal reasons
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {RESTRICTED_CATEGORIES.map((category) => (
          <div key={category.name} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-700"
              onClick={() => toggleCategory(category.name)}
            >
              <span className="text-gray-200 font-medium">{category.name}</span>
              {expandedCategory === category.name ? (
                <FiChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedCategory === category.name && (
              <div className="px-4 py-3 bg-gray-900 space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <h4 className="text-gray-200 font-medium">{item.name}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Examples:</p>
                        <p className="text-sm text-gray-300">{item.examples}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Reason:</p>
                        <p className="text-sm text-gray-300">{item.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-400">
          This list is not exhaustive. If you&apos;re unsure about an item,
          please contact customer support for clarification. Attempting to ship
          restricted items may result in package rejection and possible legal
          consequences.
        </p>
      </div>
    </div>
  );
}
