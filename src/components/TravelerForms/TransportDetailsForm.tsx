'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TravelerFormData } from '@/app/become-traveler/page'
import { Tooltip } from '@/components/ui/Tooltip'
import { 
  FiX, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiInfo, 
  FiChevronDown, 
  FiChevronUp, 
  FiChevronRight,
  FiChevronLeft,
  FiCheck, 
  FiAlertCircle,
  FiStar,
  FiTruck,
  FiDollarSign,
  FiSearch,
  FiPackage,
  FiBox,
  FiShoppingBag,
  FiSmartphone,
  FiHome,
  FiBook,
  FiMusic,
  FiHeart,
  FiTool,
  FiMonitor,
  FiCamera,
  FiCoffee,
  FiGrid,
  FiActivity,
  FiBriefcase,
  FiWatch,
  FiSun,
  FiPrinter,
  FiCpu
} from 'react-icons/fi'
import { QUICK_SEARCH_ITEMS, PACKAGE_CATEGORIES, searchHelpers } from '@/constants/packageCategories'
import RestrictedItemsCheck from '../RestrictedItems/RestrictedItemsCheck'
import Link from 'next/link'
import { Select } from '@/components/ui/Select'
import { IconType } from 'react-icons'

// Types
type TransportStatus = 'allowed' | 'restricted' | 'prohibited';

interface TransportDetailsFormProps {
  formData: {
    transportCapacity?: {
      maxWeight?: string;
    };
    packagePreferences?: {
      acceptedItems?: string[];
    };
    handlingPreferences?: {
      [key: string]: boolean;
    };
  };
  onUpdateFormData: (data: any) => void;
}

interface CustomSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  onDropdownToggle?: (isOpen: boolean) => void;
}

const WEIGHT_OPTIONS = [
  { value: '5', label: 'Up to 5 kg', description: 'Small packages and documents' },
  { value: '10', label: 'Up to 10 kg', description: 'Medium-sized packages' },
  { value: '20', label: 'Up to 20 kg', description: 'Large packages' },
  { value: '50', label: 'Up to 50 kg', description: 'Very large shipments' },
  { value: '100', label: 'Up to 100 kg', description: 'Commercial shipments' }
];

interface PackagePreference {
  id: string;
  label: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  requirements: string[];
  subItems: string[];
  commonExamples?: string;
  restrictions?: string[];
  maxWeight?: string;
}

const PACKAGE_TYPES = [
  {
    category: 'Personal Items',
    icon: '👜',
    items: [
      {
        id: 'clothing',
        label: 'Clothing & Accessories',
        description: 'All types of wearable items',
        riskLevel: 'low',
        requirements: ['Clean items', 'Properly packed', 'No wet or damp items'],
        subItems: ['Casual wear', 'Formal wear', 'Children\'s clothing', 'Sportswear', 'Undergarments', 'Seasonal clothing'],
        commonExamples: 'T-shirts, jeans, dresses, suits, jackets',
        maxWeight: '20kg'
      },
      {
        id: 'electronics_personal',
        label: 'Personal Electronics',
        description: 'Small electronic devices and accessories',
        riskLevel: 'medium',
        requirements: ['Original packaging recommended', 'Declare value', 'No batteries over 100Wh'],
        subItems: ['Mobile phones', 'Tablets', 'Laptops', 'Cameras', 'Smartwatches', 'Power banks'],
        commonExamples: 'iPhone, iPad, MacBook, Samsung devices',
        restrictions: ['No damaged batteries', 'No recalled devices']
      }
    ]
  },
  {
    category: 'Electronics & Technology',
    icon: '📱',
    items: [
      {
        id: 'smartphones',
        label: 'Smartphones & Accessories',
        description: 'Mobile phones and related items',
        riskLevel: 'medium',
        requirements: ['Original packaging', 'Battery safety compliance', 'Value declaration'],
        subItems: ['Phones', 'Phone cases', 'Screen protectors', 'Charging cables', 'Power adapters']
      },
      {
        id: 'computers',
        label: 'Computers & Accessories',
        description: 'Laptops, tablets, and peripherals',
        riskLevel: 'medium',
        requirements: ['Original packaging recommended', 'Battery safety compliance'],
        subItems: ['Laptops', 'Tablets', 'Keyboards', 'Mouse devices', 'Laptop stands', 'Storage devices']
      },
      {
        id: 'photography',
        label: 'Photography Equipment',
        description: 'Cameras and accessories',
        riskLevel: 'medium',
        requirements: ['Proper protection', 'Value declaration'],
        subItems: ['Digital cameras', 'Camera lenses', 'Tripods', 'Camera bags', 'Memory cards']
      },
      {
        id: 'audio_video',
        label: 'Audio & Video Equipment',
        description: 'Sound and video devices',
        riskLevel: 'medium',
        requirements: ['Original packaging recommended', 'Proper protection'],
        subItems: ['Headphones', 'Earbuds', 'Portable speakers', 'Microphones', 'Action cameras']
      }
    ]
  },
  {
    category: 'Fashion & Accessories',
    icon: '👗',
    items: [
      {
        id: 'designer_fashion',
        label: 'Designer Fashion',
        description: 'High-end clothing and accessories',
        riskLevel: 'medium',
        requirements: ['Clean items', 'Proper packaging', 'Value declaration'],
        subItems: ['Designer clothing', 'Luxury bags', 'Designer shoes', 'Fashion accessories']
      },
      {
        id: 'jewelry',
        label: 'Jewelry & Watches',
        description: 'Precious items and timepieces',
        riskLevel: 'very_high',
        requirements: ['Secure packaging', 'Insurance required', 'Value declaration'],
        subItems: ['Fine jewelry', 'Watches', 'Precious stones', 'Fashion jewelry']
      },
      {
        id: 'accessories',
        label: 'Fashion Accessories',
        description: 'Various fashion items',
        riskLevel: 'low',
        requirements: ['Proper packaging'],
        subItems: ['Scarves', 'Belts', 'Hats', 'Hair accessories', 'Sunglasses']
      },
      {
        id: 'footwear',
        label: 'Footwear',
        description: 'All types of shoes',
        riskLevel: 'low',
        requirements: ['Clean items', 'Proper packaging'],
        subItems: ['Casual shoes', 'Formal shoes', 'Sports shoes', 'Boots', 'Sandals']
      }
    ]
  },
  {
    category: 'Home & Living',
    icon: '🏠',
    items: [
      {
        id: 'home_decor',
        label: 'Home Decor',
        description: 'Decorative items',
        riskLevel: 'medium',
        requirements: ['Careful packaging', 'Fragile items protection'],
        subItems: ['Picture frames', 'Vases', 'Wall art', 'Decorative objects', 'Small mirrors']
      },
      {
        id: 'kitchenware',
        label: 'Kitchen Items',
        description: 'Kitchen and dining items',
        riskLevel: 'medium',
        requirements: ['Proper protection', 'Clean items'],
        subItems: ['Utensils', 'Dishes', 'Small appliances', 'Kitchen tools', 'Storage containers']
      },
      {
        id: 'textiles',
        label: 'Home Textiles',
        description: 'Fabric items for home',
        riskLevel: 'low',
        requirements: ['Clean items', 'Protected from moisture'],
        subItems: ['Bedding', 'Towels', 'Curtains', 'Cushion covers', 'Table linens']
      }
    ]
  },
  {
    category: 'Sports & Leisure',
    icon: '⚽',
    items: [
      {
        id: 'sports_gear',
        label: 'Sports Equipment',
        description: 'Various sports items',
        riskLevel: 'medium',
        requirements: ['Proper protection', 'Size restrictions apply'],
        subItems: ['Sports accessories', 'Training equipment', 'Sports clothing', 'Protective gear']
      },
      {
        id: 'outdoor',
        label: 'Outdoor Equipment',
        description: 'Outdoor and camping gear',
        riskLevel: 'medium',
        requirements: ['Clean items', 'No fuel or hazardous materials'],
        subItems: ['Camping gear', 'Hiking equipment', 'Travel accessories', 'Outdoor tools']
      }
    ]
  },
  {
    category: 'Collectibles & Hobbies',
    icon: '🎨',
    items: [
      {
        id: 'collectibles',
        label: 'Collectible Items',
        description: 'Various collectibles',
        riskLevel: 'high',
        requirements: ['Secure packaging', 'Value declaration', 'Insurance recommended'],
        subItems: ['Trading cards', 'Stamps', 'Coins', 'Action figures', 'Model kits']
      },
      {
        id: 'art_supplies',
        label: 'Art & Craft Supplies',
        description: 'Non-hazardous art materials',
        riskLevel: 'medium',
        requirements: ['No flammable materials', 'Proper packaging'],
        subItems: ['Paint brushes', 'Canvas', 'Art tools', 'Craft materials', 'Drawing supplies']
      },
      {
        id: 'musical',
        label: 'Musical Items',
        description: 'Instruments and accessories',
        riskLevel: 'high',
        requirements: ['Hard case required', 'Special handling needed'],
        subItems: ['Small instruments', 'Music accessories', 'Sheet music', 'Instrument parts']
      }
    ]
  },
  {
    category: 'Business & Professional',
    icon: '💼',
    items: [
      {
        id: 'office',
        label: 'Office Supplies',
        description: 'Business materials',
        riskLevel: 'low',
        requirements: ['Proper packaging'],
        subItems: ['Stationery', 'Office tools', 'Business materials', 'Presentation items']
      },
      {
        id: 'professional_equipment',
        label: 'Professional Equipment',
        description: 'Business devices and tools',
        riskLevel: 'medium',
        requirements: ['Original packaging recommended', 'Value declaration'],
        subItems: ['Small business devices', 'Professional tools', 'Measuring instruments']
      }
    ]
  }
];

const HANDLING_SERVICES = [
  { 
    id: 'secure', 
    label: 'Secure & Careful Handling', 
    description: 'Extra care and security for valuable or delicate items' 
  },
  { 
    id: 'express', 
    label: 'Express Delivery', 
    description: 'Quick delivery upon arrival at destination' 
  }
];

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'low': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'very_high': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const getRiskLevelText = (level: string) => {
  switch (level) {
    case 'low': return 'Low Risk';
    case 'medium': return 'Medium Risk';
    case 'high': return 'High Risk';
    case 'very_high': return 'Very High Risk';
    default: return 'Unknown Risk';
  }
};

interface HandlingPreferences {
  [key: string]: boolean;
  acceptsShippedPackages: boolean;
  willPickup: boolean;
  willDeliver: boolean;
  meetAtAirport: boolean;
  acceptsFragile: boolean;
  acceptsValuable: boolean;
  acceptsUrgent: boolean;
}

// Add categories enum for better organization
enum ItemCategory {
  ELECTRONICS = 'Electronics',
  PERSONAL = 'Personal Items',
  MEDICAL = 'Medical',
  FOOD = 'Food & Beverages',
  DOCUMENTS = 'Documents',
  VALUABLES = 'Valuables',
  SPORTS = 'Sports Equipment'
}

// Add severity type and helper functions
type Severity = 'high' | 'medium' | 'low';

const getSeverityColor = (severity: Severity) => {
  switch (severity) {
    case 'high': return 'bg-red-50 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-green-50 text-green-700 border-green-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getSeverityIcon = (severity: Severity) => {
  switch (severity) {
    case 'high': return '⚠️';
    case 'medium': return '⚡';
    case 'low': return 'ℹ️';
    default: return '❔';
  }
};

// Update the interface for items
interface QuickSearchItem {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  requirements?: string[];
  notes?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

import { createPortal } from 'react-dom';

interface InfoIconProps {
  content: string;
}

const InfoIcon: React.FC<InfoIconProps & { children: React.ReactNode }> = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {content}
      </div>
    </div>
  );
};

const IconComponent: React.FC<{ icon: IconType; className?: string }> = ({ icon: Icon, className }) => {
  return <Icon className={className} />;
};

// Create the options for the dropdown
const CATEGORY_OPTIONS = PACKAGE_CATEGORIES.map(category => ({
  value: category.id,
  label: category.name,
  description: category.description
}));

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'package':
      return FiPackage;
    case 'box':
      return FiBox;
    case 'shopping-bag':
      return FiShoppingBag;
    case 'truck':
      return FiTruck;
    default:
      return FiBox;
  }
};

export default function TransportDetailsForm({ formData, onUpdateFormData }: TransportDetailsFormProps) {
  // Search and filtering state
  const [selectedCategory, setSelectedCategory] = useState<typeof PACKAGE_CATEGORIES[0] | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(QUICK_SEARCH_ITEMS);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  // Form UI state
  const [isPreferencesExpanded, setIsPreferencesExpanded] = useState(false);
  const [showWeightDropdown, setShowWeightDropdown] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedTransportStatus, setSelectedTransportStatus] = useState<TransportStatus | 'all'>('all');

  // Package preferences state
  const [isOpenToAll, setIsOpenToAll] = useState(false);
  const [isSelectiveItems, setIsSelectiveItems] = useState(false);
  const [isBasicOnly, setIsBasicOnly] = useState(false);

  // Responsibilities state
  const [responsibilities, setResponsibilities] = useState({
    verifyContents: false,
    noRestrictedItems: false,
    reportSuspicious: false,
    legalResponsibilities: false
  });

  // Check if all responsibilities are checked
  const allResponsibilitiesChecked = Object.values(responsibilities).every(value => value);

  // Handle responsibility changes
  const handleResponsibilityChange = (key: keyof typeof responsibilities) => {
    setResponsibilities(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Enhanced filtering logic
  const filterItems = (items: typeof QUICK_SEARCH_ITEMS, term: string, category?: typeof PACKAGE_CATEGORIES[0]): typeof QUICK_SEARCH_ITEMS => {
    let results = [...items];

    // Filter by category if selected
    if (category) {
      results = results.filter(item => {
        const itemCategory = item.categoryId.toLowerCase().trim();
        const categoryId = category.id.toLowerCase().trim();
        
        // Direct category match
        if (itemCategory === categoryId) return true;
        
        // Subcategory match
        if (category.subcategories) {
          return category.subcategories.some(sub => 
            item.subcategoryId === sub.id
          );
        }
        
        return false;
      });
    }

    // Filter by search term
    if (term) {
      const searchTermLower = term.toLowerCase().trim();
      results = results.filter(item => {
        // Basic fields
        if (item.name.toLowerCase().includes(searchTermLower)) return true;
        if (item.details.toLowerCase().includes(searchTermLower)) return true;
        
        // Additional fields
        if (item.searchTerms?.some(term => term.toLowerCase().includes(searchTermLower))) return true;
        if (item.commonNames?.some(name => name.toLowerCase().includes(searchTermLower))) return true;
        if (item.brands?.some(brand => brand.toLowerCase().includes(searchTermLower))) return true;
        
        // Requirements and warnings
        if (item.requirements.some(req => req.toLowerCase().includes(searchTermLower))) return true;
        if (item.warnings?.some(warning => warning.toLowerCase().includes(searchTermLower))) return true;
        
        return false;
      });
    }

    return results;
  };

  // Update filtered items when search term or category changes
  useEffect(() => {
    if (!isQuickSearchOpen) {
      // When quick search is closed, filter by selected category only
      if (selectedCategory) {
        const newFilteredItems = QUICK_SEARCH_ITEMS.filter(item => item.categoryId === selectedCategory.id);
        setFilteredItems(newFilteredItems);
      } else {
        setFilteredItems([]);
      }
    } else {
      // When quick search is open, use the complex filtering logic
      const category = PACKAGE_CATEGORIES.find(cat => cat.id === searchQuery);
      setSelectedCategory(category);
      const newFilteredItems = filterItems(QUICK_SEARCH_ITEMS, searchTerm, category);
      setFilteredItems(newFilteredItems);
    }
  }, [searchTerm, searchQuery, selectedCategory, isQuickSearchOpen]);

  // Event handlers
  const handleCategorySelect = (categoryId: string) => {
    setSearchQuery(categoryId);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleQuickSearchOpen = () => {
    setIsQuickSearchOpen(true);
    setSearchTerm('');
    setSearchQuery('');
    setSelectedCategory(undefined);
    setFilteredItems(QUICK_SEARCH_ITEMS);
  };

  const handleQuickSearchClose = () => {
    setIsQuickSearchOpen(false);
    setSearchTerm('');
    setSearchQuery('');
    setSelectedCategory(undefined);
  };

  const toggleWeightDropdown = () => {
    setShowWeightDropdown(!showWeightDropdown);
  };

  const togglePreferencesExpanded = () => {
    setIsPreferencesExpanded(!isPreferencesExpanded);
  };

  const handleCategoryExpand = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Helper functions
  const renderItemDetails = (item: typeof QUICK_SEARCH_ITEMS[0]) => {
    const category = PACKAGE_CATEGORIES.find(cat => cat.id === item.categoryId);
    const subcategory = category?.subcategories?.find(sub => sub.id === item.subcategoryId);

    return (
      <div>
        <h4 className="font-medium text-white">{item.name}</h4>
        <p className="text-sm text-gray-400">
          {category?.name} {subcategory && `› ${subcategory.name}`}
        </p>
        {item.description && (
          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
        )}
      </div>
    );
  };

  const handleItemSelect = (item: typeof QUICK_SEARCH_ITEMS[0]) => {
    const updatedPreferences = {
      ...formData.packagePreferences,
      acceptedItems: [...(formData.packagePreferences?.acceptedItems || []), item.id]
    };
    onUpdateFormData({
      packagePreferences: updatedPreferences
    });
    setIsQuickSearchOpen(false);
  };

  const handleBasicItemsSelection = () => {
    setIsOpenToAll(false);
    setIsSelectiveItems(false);
    setIsBasicOnly(true);
    
    const basicItems = PACKAGE_TYPES.flatMap(category => 
      category.items
        .filter(item => item.riskLevel === 'low')
        .map(item => item.id)
    );
    
    if (onUpdateFormData) {
      onUpdateFormData({
        packagePreferences: {
          ...formData.packagePreferences,
          acceptedItems: basicItems,
          flexibilityLevel: 'basic'
        }
      });
    }
  };

  return (
    <div>
      <div className="relative w-full">
        {/* Package Preferences Section */}
        <div className="bg-gray-900/20 backdrop-blur-sm rounded-2xl p-8">
          {/* Package Preferences Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Package Preferences
              </h3>
              <InfoIcon content="Configure what types of packages you can transport">
                <div className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FiInfo className="w-5 h-5" />
                </div>
              </InfoIcon>
            </div>
            <motion.button
              onClick={() => setIsQuickSearchOpen(!isQuickSearchOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm shadow-xl group"
            >
              <FiSearch className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm group-hover:text-blue-400 transition-colors">Quick Check All Items</span>
            </motion.button>
          </div>

          {/* Form Sections Container */}
          <div className="space-y-8">
            {/* Maximum Weight Capacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Maximum Weight Capacity</h4>
                <InfoIcon content="The maximum weight of packages you can transport" />
              </div>
              <div className="relative">
                <Select
                  value={formData.transportCapacity?.maxWeight || ''}
                  onChange={(value) => {
                    onUpdateFormData({
                      transportCapacity: {
                        ...formData.transportCapacity,
                        maxWeight: value
                      }
                    });
                  }}
                  placeholder="Select weight capacity"
                  options={WEIGHT_OPTIONS}
                  dropdownClassName="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                  optionClassName="px-4 py-3 text-left hover:bg-gray-700 text-white transition-all duration-300 cursor-pointer group"
                  containerClassName="w-full"
                />
              </div>
            </div>

            {/* Quick Preference Selection */}
            <motion.div
              whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)" }}
              className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
              style={{ position: 'relative', zIndex: showWeightDropdown ? 1 : 2 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <h4 className="text-lg font-medium text-white">Quick Preference Selection</h4>
                <InfoIcon content="Choose your package handling preferences">
                  <div className="text-gray-400 hover:text-blue-400 transition-colors">
                    <FiInfo className="w-4 h-4" />
                  </div>
                </InfoIcon>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Open to All Option */}
                <motion.div 
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200
                    ${isOpenToAll 
                      ? 'ring-2 ring-blue-500 bg-blue-900/20' 
                      : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpenToAll(true);
                    setIsSelectiveItems(false);
                    setIsBasicOnly(false);
                    const allItems = PACKAGE_TYPES.flatMap(category => 
                      category.items.map(item => item.id)
                    );
                    onUpdateFormData({
                      packagePreferences: {
                        ...formData.packagePreferences,
                        acceptedItems: allItems,
                        flexibilityLevel: 'all'
                      }
                    });
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <motion.div
                          animate={isOpenToAll ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          className={`w-4 h-4 rounded-full border-2 ${
                            isOpenToAll 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-500'
                          }`}
                        >
                          {isOpenToAll && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-full w-full flex items-center justify-center"
                            >
                              <FiCheck className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">Open to All Items</p>
                        <p className="text-sm text-gray-400 mt-1">Accept all allowed items within weight limit</p>
                        
                        <motion.div
                          initial={false}
                          animate={{ height: isOpenToAll ? 'auto' : 0, opacity: isOpenToAll ? 1 : 0 }}
                          className="overflow-hidden"
                        >
                          {isOpenToAll && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center space-x-2 text-blue-400">
                                <FiStar className="w-4 h-4" />
                                <span className="text-sm">Maximum flexibility</span>
                              </div>
                              <div className="flex items-center space-x-2 text-green-400">
                                <FiTruck className="w-4 h-4" />
                                <span className="text-sm">More delivery opportunities</span>
                              </div>
                              <div className="flex items-center space-x-2 text-yellow-400">
                                <FiDollarSign className="w-4 h-4" />
                                <span className="text-sm">Higher earning potential</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Selective Items Option */}
                <motion.div 
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200
                    ${isSelectiveItems 
                      ? 'ring-2 ring-purple-500 bg-purple-900/20' 
                      : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpenToAll(false);
                    setIsSelectiveItems(true);
                    setIsBasicOnly(false);
                    onUpdateFormData({
                      packagePreferences: {
                        ...formData.packagePreferences,
                        flexibilityLevel: 'selective'
                      }
                    });
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <motion.div
                          animate={isSelectiveItems ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          className={`w-4 h-4 rounded-full border-2 ${
                            isSelectiveItems 
                              ? 'border-purple-500 bg-purple-500' 
                              : 'border-gray-500'
                          }`}
                        >
                          {isSelectiveItems && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-full w-full flex items-center justify-center"
                            >
                              <FiCheck className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">Select Categories</p>
                        <p className="text-sm text-gray-400 mt-1">Choose specific types of items</p>
                        
                        <motion.div
                          initial={false}
                          animate={{ height: isSelectiveItems ? 'auto' : 0, opacity: isSelectiveItems ? 1 : 0 }}
                          className="overflow-hidden"
                        >
                          {isSelectiveItems && (
                            <div className="mt-3 text-sm text-purple-400">
                              Select your preferred categories below
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Basic Items Only Option */}
                <motion.div 
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200
                    ${isBasicOnly 
                      ? 'ring-2 ring-green-500 bg-green-900/20' 
                      : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBasicItemsSelection()}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <motion.div
                          animate={isBasicOnly ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          className={`w-4 h-4 rounded-full border-2 ${
                            isBasicOnly 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-500'
                          }`}
                        >
                          {isBasicOnly && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-full w-full flex items-center justify-center"
                            >
                              <FiCheck className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">Basic Items Only</p>
                        <p className="text-sm text-gray-400 mt-1">Low-risk items only</p>
                        
                        <motion.div
                          initial={false}
                          animate={{ height: isBasicOnly ? 'auto' : 0, opacity: isBasicOnly ? 1 : 0 }}
                          className="overflow-hidden"
                        >
                          {isBasicOnly && (
                            <div className="mt-3 text-sm text-green-400">
                              Safe and simple items for easy transport
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Show categories only if Selective Items is selected */}
            {isSelectiveItems && (
              <div className="space-y-6">
                {PACKAGE_TYPES.map((category) => (
                  <motion.div
                    key={category.category}
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: 'auto' }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                      className="w-full p-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl border border-gray-700 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 backdrop-blur-sm shadow-xl group mb-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl group-hover:text-blue-400 transition-colors">{category.icon}</span>
                          <span className="font-medium group-hover:text-blue-400 transition-colors">{category.category}</span>
                        </div>
                        <FiChevronDown 
                          className={`w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-all duration-300 ${
                            expandedCategory === category.category ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {expandedCategory === category.category && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 space-y-3"
                      >
                        {category.items.map((item) => (
                          <div key={item.id} className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-800/50 transition-all duration-300">
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                checked={formData.packagePreferences?.acceptedItems?.includes(item.id) || false}
                                onChange={(e) => {
                                  const currentItems = formData.packagePreferences?.acceptedItems || [];
                                  onUpdateFormData({
                                    packagePreferences: {
                                      ...formData.packagePreferences,
                                      acceptedItems: e.target.checked
                                        ? [...currentItems, item.id]
                                        : currentItems.filter((id: string) => id !== item.id)
                                    }
                                  });
                                }}
                                className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-white">{item.label}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(item.riskLevel)}`}>
                                    {item.riskLevel.toUpperCase()} RISK
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Special Handling Services */}
            <motion.div
              whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)" }}
              className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <h4 className="text-lg font-medium text-white">Special Handling Services</h4>
                <InfoIcon content="Additional services you can provide">
                  <div className="text-gray-400 hover:text-blue-400 transition-colors">
                    <FiInfo className="w-4 h-4" />
                  </div>
                </InfoIcon>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {HANDLING_SERVICES.map((service) => (
                  <label 
                    key={service.id} 
                    className="flex items-start space-x-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.handlingPreferences?.[service.id] || false}
                      onChange={(e) => {
                        onUpdateFormData({
                          handlingPreferences: {
                            ...formData.handlingPreferences,
                            [service.id]: e.target.checked
                          }
                        });
                      }}
                      className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{service.label}</span>
                      <p className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">{service.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Traveler Responsibilities */}
            <motion.div
              whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)" }}
              className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FiAlertTriangle className="w-5 h-5 text-yellow-500" />
                <h4 className="text-lg font-medium text-white">Traveler Responsibilities</h4>
              </div>
              
              <p className="text-gray-400 mb-4">
                As a traveler, you must understand and acknowledge your responsibilities regarding restricted items.
              </p>

              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={responsibilities.verifyContents}
                    onChange={() => handleResponsibilityChange('verifyContents')}
                    className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    I will verify the contents of packages before accepting them
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={responsibilities.noRestrictedItems}
                    onChange={() => handleResponsibilityChange('noRestrictedItems')}
                    className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    I will not transport any restricted or prohibited items
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={responsibilities.reportSuspicious}
                    onChange={() => handleResponsibilityChange('reportSuspicious')}
                    className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    I will report any suspicious packages or contents
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={responsibilities.legalResponsibilities}
                    onChange={() => handleResponsibilityChange('legalResponsibilities')}
                    className="mt-1 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    I understand my legal responsibilities as a traveler
                  </span>
                </label>
              </div>

              {!allResponsibilitiesChecked && (
                <p className="mt-4 text-sm text-orange-400">
                  Please acknowledge all responsibilities to continue
                </p>
              )}

              <Link 
                href="/restricted-items" 
                className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View complete restricted items guide
              </Link>
            </motion.div>

            
          </div>
        </div>

        {/* Quick Check Restrictions Modal */}
        <AnimatePresence>
          {isQuickSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            >
              <div className="container mx-auto px-4 h-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-gray-900 rounded-2xl p-8 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white">Quick Check Items</h3>
                    <button
                      onClick={() => setIsQuickSearchOpen(false)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FiX className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Category Dropdown */}
                  <div className="mb-6">
                    <Select
                      value={searchQuery}
                      onChange={handleCategorySelect}
                      placeholder="Select a category"
                      options={CATEGORY_OPTIONS}
                      dropdownClassName="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                      optionClassName="px-4 py-3 text-left hover:bg-gray-700 text-white transition-all duration-300 cursor-pointer group"
                      containerClassName="w-full"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Show items in 2 columns with scroll */}
                    <div className="h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="grid grid-cols-2 gap-6">
                        {filteredItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                          >
                            <div className="flex items-start space-x-3">
                              {React.createElement(item.icon, { className: "w-6 h-6 text-gray-300 mt-1" })}
                              <div className="flex-1">
                                <h3 className="text-white font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">{item.details}</p>
                                
                                {/* Risk Level */}
                                <div className="mt-3 flex items-center space-x-2">
                                  <span className="text-sm text-gray-400">Risk Level:</span>
                                  <span className={`text-sm px-2 py-0.5 rounded ${
                                    item.riskLevel === 'low' ? 'bg-green-900 text-green-200' :
                                    item.riskLevel === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                                    'bg-red-900 text-red-200'
                                  }`}>
                                    {item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1)}
                                  </span>
                                </div>

                                {/* Requirements */}
                                {item.requirements && item.requirements.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-sm font-medium text-gray-400 mb-1">Requirements:</p>
                                    <ul className="space-y-1">
                                      {item.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                                          <FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                                          <span>{req}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Warnings */}
                                {item.warnings && item.warnings.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-sm font-medium text-gray-400 mb-1">Warnings:</p>
                                    <ul className="space-y-1">
                                      {item.warnings.map((warning, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-sm text-red-400">
                                          <FiAlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                          <span>{warning}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-800 text-sm text-gray-500">
                      {filteredItems.length} items found • Risk levels help you understand item restrictions
                    </div>
                  </motion.div>

                  {/* Add custom scrollbar styles */}
                  <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: rgba(31, 41, 55, 0.5);
                      border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: rgba(75, 85, 99, 0.5);
                      border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: rgba(75, 85, 99, 0.7);
                    }
                  `}</style>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
