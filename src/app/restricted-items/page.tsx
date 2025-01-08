'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiAlertTriangle, FiChevronDown, FiChevronUp, FiInfo, FiArrowLeft } from 'react-icons/fi';

// Categories of restricted items
const RESTRICTED_CATEGORIES = [
  {
    id: 'hazardous',
    title: 'Hazardous Chemicals',
    icon: '☢️',
    description: 'Dangerous chemicals and toxic substances',
    items: [
      { name: 'Acids', severity: 'high', description: 'All types of corrosive acids', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚗️' },
      { name: 'Mercury', severity: 'high', description: 'Any form of mercury', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚗️' },
      { name: 'Pesticides', severity: 'high', description: 'Any type of pest control chemicals', restrictions: 'Completely prohibited', countries: ['All'], icon: '☠️' },
      { name: 'Herbicides', severity: 'high', description: 'Any type of weed killers', restrictions: 'Completely prohibited', countries: ['All'], icon: '🌿' },
      { name: 'Fertilizers', severity: 'high', description: 'Containing ammonium nitrate', restrictions: 'Completely prohibited', countries: ['All'], icon: '🌱' },
      { name: 'Radioactive Materials', severity: 'high', description: 'Any radioactive substances', restrictions: 'Completely prohibited', countries: ['All'], icon: '☢️' },
      { name: 'Chlorine', severity: 'high', description: 'Any form of chlorine', restrictions: 'Completely prohibited', countries: ['All'], icon: '💧' },
      { name: 'Bleach', severity: 'high', description: 'Any type of bleaching agent', restrictions: 'Completely prohibited', countries: ['All'], icon: '🧪' },
      { name: 'Peroxides', severity: 'high', description: 'Any type of peroxide', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚗️' },
      { name: 'Cyanide', severity: 'high', description: 'Any cyanide compounds', restrictions: 'Completely prohibited', countries: ['All'], icon: '☠️' },
      { name: 'Asbestos', severity: 'high', description: 'Any form of asbestos', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚠️' },
      { name: 'Flammable Adhesives', severity: 'high', description: 'Any combustible glues', restrictions: 'Completely prohibited', countries: ['All'], icon: '🔥' },
      { name: 'Industrial Chemicals', severity: 'high', description: 'Any toxic industrial compounds', restrictions: 'Completely prohibited', countries: ['All'], icon: '🏭' },
      { name: 'Corrosive Cleaners', severity: 'high', description: 'Any corrosive cleaning agents', restrictions: 'Completely prohibited', countries: ['All'], icon: '🧹' },
      { name: 'Lithium Metal', severity: 'high', description: 'Non-compliant batteries', restrictions: 'Special handling required', countries: ['All'], icon: '🔋' }
    ]
  },
  {
    id: 'drugs',
    title: 'Drugs and Controlled Substances',
    icon: '💊',
    description: 'Illegal drugs and regulated medications',
    items: [
      { name: 'Narcotics', severity: 'high', description: 'Heroin, cocaine, methamphetamine', restrictions: 'Completely prohibited', countries: ['All'], icon: '💉' },
      { name: 'Marijuana', severity: 'high', description: 'Even where locally legal', restrictions: 'Completely prohibited', countries: ['All'], icon: '🌿' },
      { name: 'Synthetic Drugs', severity: 'high', description: 'Any synthetic cannabinoids', restrictions: 'Completely prohibited', countries: ['All'], icon: '🧪' },
      { name: 'Prescription Drugs', severity: 'high', description: 'Without valid documentation', restrictions: 'Documentation required', countries: ['All'], icon: '💊' },
      { name: 'Opioids', severity: 'high', description: 'Without valid prescription', restrictions: 'Completely prohibited', countries: ['All'], icon: '💊' },
      { name: 'OTC Medications', severity: 'medium', description: 'Large quantities', restrictions: 'Quantity limits apply', countries: ['All'], icon: '💊' },
      { name: 'Drug Paraphernalia', severity: 'high', description: 'Pipes, syringes, etc.', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚠️' },
      { name: 'Psilocybin', severity: 'high', description: 'Magic mushrooms', restrictions: 'Completely prohibited', countries: ['All'], icon: '🍄' },
      { name: 'Steroids', severity: 'high', description: 'Without prescription', restrictions: 'Completely prohibited', countries: ['All'], icon: '💪' },
      { name: 'Ayahuasca', severity: 'high', description: 'DMT containing substances', restrictions: 'Completely prohibited', countries: ['All'], icon: '🌿' },
      { name: 'Coca Leaves', severity: 'high', description: 'Any form of coca plant', restrictions: 'Completely prohibited', countries: ['All'], icon: '🌿' },
      { name: 'Ketamine', severity: 'high', description: 'Any form of ketamine', restrictions: 'Completely prohibited', countries: ['All'], icon: '💉' },
      { name: 'Ecstasy', severity: 'high', description: 'MDMA in any form', restrictions: 'Completely prohibited', countries: ['All'], icon: '💊' },
      { name: 'LSD', severity: 'high', description: 'Any form of LSD', restrictions: 'Completely prohibited', countries: ['All'], icon: '🎯' },
      { name: 'Fentanyl', severity: 'high', description: 'Any form of fentanyl', restrictions: 'Completely prohibited', countries: ['All'], icon: '💊' }
    ]
  },
  {
    id: 'biological',
    title: 'Biological and Environmental Hazards',
    icon: '🧬',
    description: 'Living organisms and biological materials',
    items: [
      { name: 'Live Animals', severity: 'high', description: 'Without documentation', restrictions: 'Special permits required', countries: ['All'], icon: '🐾' },
      { name: 'Animal Carcasses', severity: 'high', description: 'Dead animals or parts', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚠️' },
      { name: 'Insects', severity: 'high', description: 'Live insects of any kind', restrictions: 'Completely prohibited', countries: ['All'], icon: '🐜' },
      { name: 'Endangered Species', severity: 'high', description: 'Products from protected species', restrictions: 'Completely prohibited', countries: ['All'], icon: '🐯' },
      { name: 'Soil', severity: 'high', description: 'Any type of earth or soil', restrictions: 'Completely prohibited', countries: ['All'], icon: '🌱' },
      { name: 'Untreated Wood', severity: 'high', description: 'Non-processed wood products', restrictions: 'Special permits required', countries: ['All'], icon: '🪵' },
      { name: 'Pathogens', severity: 'high', description: 'Bacteria or viruses', restrictions: 'Completely prohibited', countries: ['All'], icon: '🦠' },
      { name: 'Fungi', severity: 'high', description: 'Live fungi or spores', restrictions: 'Completely prohibited', countries: ['All'], icon: '🍄' },
      { name: 'Medical Waste', severity: 'high', description: 'Any type of medical waste', restrictions: 'Completely prohibited', countries: ['All'], icon: '🏥' },
      { name: 'Human Remains', severity: 'high', description: 'Without proper permits', restrictions: 'Special authorization required', countries: ['All'], icon: '⚰️' },
      { name: 'Blood Products', severity: 'high', description: 'Blood or bodily fluids', restrictions: 'Completely prohibited', countries: ['All'], icon: '🩸' },
      { name: 'Sharps', severity: 'high', description: 'Needles, scalpels, etc.', restrictions: 'Completely prohibited', countries: ['All'], icon: '💉' },
      { name: 'GMOs', severity: 'high', description: 'Without proper permits', restrictions: 'Special permits required', countries: ['All'], icon: '🧬' },
      { name: 'Research Samples', severity: 'high', description: 'Biological research materials', restrictions: 'Special permits required', countries: ['All'], icon: '🔬' },
      { name: 'Raw Meat', severity: 'high', description: 'Unprocessed meat products', restrictions: 'Completely prohibited', countries: ['All'], icon: '🥩' }
    ]
  },
  {
    id: 'electronics',
    title: 'Electronics and Technology',
    icon: '🔌',
    description: 'Restricted electronic devices and components',
    items: [
      { name: 'Large Batteries', severity: 'medium', description: 'Over 100 Wh capacity', restrictions: 'Special handling required', countries: ['All'], icon: '🔋' },
      { name: 'Power Banks', severity: 'medium', description: 'Non-compliant units', restrictions: 'Capacity restrictions apply', countries: ['All'], icon: '🔋' },
      { name: 'Radio Equipment', severity: 'medium', description: 'Unregistered transmitters', restrictions: 'Registration required', countries: ['All'], icon: '📻' },
      { name: 'Large Drones', severity: 'high', description: 'Professional grade UAVs', restrictions: 'Special permits required', countries: ['Germany', 'Iran'], icon: '🚁' },
      { name: 'Laser Pointers', severity: 'medium', description: 'High-powered lasers', restrictions: 'Power restrictions apply', countries: ['All'], icon: '🔦' },
      { name: 'Shock Devices', severity: 'high', description: 'Electric shock equipment', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚡' },
      { name: 'Spy Equipment', severity: 'high', description: 'Hidden cameras, bugs', restrictions: 'Completely prohibited', countries: ['All'], icon: '🕵️' },
      { name: 'Military Electronics', severity: 'high', description: 'Military-grade devices', restrictions: 'Completely prohibited', countries: ['All'], icon: '🎖️' },
      { name: 'Signal Jammers', severity: 'high', description: 'Any jamming devices', restrictions: 'Completely prohibited', countries: ['All'], icon: '📡' },
      { name: 'Satellite Phones', severity: 'high', description: 'In restricted countries', restrictions: 'Country-specific restrictions', countries: ['Iran'], icon: '📱' }
    ]
  },
  {
    id: 'currency',
    title: 'Currency and Financial Instruments',
    icon: '💰',
    description: 'Restricted monetary and financial items',
    items: [
      { name: 'Large Cash Amounts', severity: 'high', description: 'Over $10,000 equivalent', restrictions: 'Declaration required', countries: ['All'], icon: '💵' },
      { name: 'Bearer Bonds', severity: 'high', description: 'Negotiable instruments', restrictions: 'Completely prohibited', countries: ['All'], icon: '📜' },
      { name: 'Counterfeit Currency', severity: 'high', description: 'Fake money or coins', restrictions: 'Completely prohibited', countries: ['All'], icon: '⚠️' },
      { name: 'Blank Checks', severity: 'high', description: 'Unsigned bank checks', restrictions: 'Completely prohibited', countries: ['All'], icon: '🏦' },
      { name: 'Money Orders', severity: 'high', description: 'Blank or endorsed', restrictions: 'Special declaration required', countries: ['All'], icon: '💳' }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agricultural Products',
    icon: '🌾',
    description: 'Plants, seeds, and agricultural items',
    items: [
      { name: 'Seeds', severity: 'medium', description: 'Agricultural seeds', restrictions: 'Import permits required', countries: ['All'], icon: '🌱' },
      { name: 'Live Plants', severity: 'medium', description: 'Any living plant', restrictions: 'Phytosanitary certificate required', countries: ['All'], icon: '🌿' },
      { name: 'Fresh Fruits', severity: 'medium', description: 'Unprocessed fruits', restrictions: 'Import restrictions apply', countries: ['All'], icon: '🍎' },
      { name: 'Fresh Vegetables', severity: 'medium', description: 'Unprocessed vegetables', restrictions: 'Import restrictions apply', countries: ['All'], icon: '🥬' },
      { name: 'Plant Products', severity: 'medium', description: 'Bark, leaves, roots', restrictions: 'Special permits required', countries: ['All'], icon: '🍂' }
    ]
  }
];

export default function RestrictedItemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Filter categories and items based on search query
  const filteredCategories = RESTRICTED_CATEGORIES.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/become-traveler"
            className="inline-flex items-center text-blue-400 hover:text-blue-500 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Traveler Registration
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Restricted Items Guide</h1>
          <div className="mt-2 text-lg text-gray-300">
            Complete list of items that cannot be transported through our service
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-300">Important Notice</h3>
              <div className="mt-2 text-sm text-red-200">
                <div>
                  Attempting to transport restricted items may result in:
                </div>
                <ul className="list-disc ml-5 mt-2">
                  <li>Legal consequences and fines</li>
                  <li>Immediate termination of service</li>
                  <li>Potential criminal charges</li>
                  <li>Confiscation of items</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restricted items..."
              className="w-full px-4 py-3 pl-10 pr-4 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search restricted items"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow">
              <button
                type="button"
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                aria-expanded={expandedCategory === category.id ? "true" : "false"}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                </div>
                {expandedCategory === category.id ? (
                  <FiChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedCategory === category.id && (
                <div className="px-6 pb-6 divide-y divide-gray-200">
                  {category.items.map((item) => (
                    <div key={item.name} className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl" aria-hidden="true">{item.icon}</span>
                          <div>
                            <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                          {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)} Risk
                        </span>
                      </div>

                      <div className="mt-3 ml-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <FiInfo className="flex-shrink-0" />
                          <span>{item.restrictions}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.countries.map((country) => (
                            <span
                              key={country}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
