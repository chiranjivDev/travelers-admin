import { IconType } from 'react-icons';
import {
  FiSmartphone,
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiBook,
  FiMusic,
  FiHeart,
  FiTruck,
  FiTool,
  FiMonitor,
  FiCamera,
  FiCoffee,
  FiGrid,
  FiActivity,
  FiBriefcase,
  FiWatch,
  FiSun,
  FiBox,
  FiPrinter,
  FiCpu,
  FiHeadphones,
  FiZap,
  FiShield,
  FiMap,
  FiEdit,
  FiAlertTriangle,
  FiDroplet,
  FiArrowUp,
  FiClipboard,
  FiSettings,
  FiShoppingCart,
  FiStar,
  FiThermometer,
  FiUser
} from 'react-icons/fi';

// Transport Status Types
export type TransportStatus = 'allowed' | 'restricted' | 'prohibited';

// Types for the unified category system
interface SubCategory {
  id: string;
  name: string;
  description?: string;
  icon?: IconType;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  group: string;
  subcategories: SubCategory[];
}

interface QuickSearchItem {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  icon: IconType;
  riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  details: string;
  requirements: string[];
  warnings?: string[];
  searchTerms?: string[];
  commonNames?: string[];
  brands?: string[];
  alternatives?: string[];
  specifications?: {
    dimensions?: string;
    weight?: string;
    material?: string;
    origin?: string;
    storageTemp?: string;
    handlingInstructions?: string;
  };
  handling?: {
    temperature?: string;
    humidity?: string;
    orientation?: string;
    stackability?: boolean;
  };
}

// Helper type for improved search
export type SearchableFields = 'name' | 'details' | 'searchTerms' | 'commonNames' | 'brands' | 'alternatives';

// Helper functions for advanced search
export const searchHelpers = {
  matchesSearchTerm: (item: QuickSearchItem, term: string): boolean => {
    const searchTerm = term.toLowerCase();
    return [
      item.name,
      item.details,
      ...(item.searchTerms || []),
      ...(item.commonNames || []),
      ...(item.brands || []),
      ...(item.alternatives || [])
    ].some(field => field?.toLowerCase().includes(searchTerm));
  },
  
  getSearchableText: (item: QuickSearchItem): string => {
    return [
      item.name,
      item.details,
      ...(item.searchTerms || []),
      ...(item.commonNames || []),
      ...(item.brands || []),
      ...(item.alternatives || [])
    ].filter(Boolean).join(' ').toLowerCase();
  },
  
  filterByCategory: (items: QuickSearchItem[], categoryId: string): QuickSearchItem[] => {
    return items.filter(item => item.categoryId === categoryId);
  }
};

interface SpecialHandlingOption {
  id: string;
  name: string;
  icon: IconType;
  description: string;
  requirements?: string[];
}

interface PackageResponsibility {
  id: string;
  name: string;
  icon: IconType;
  description: string;
  details?: string[];
}

// Update icon references
const categoryIcons = {
  electronics: FiSmartphone,
  computers: FiMonitor,
  tablets: FiSmartphone,
  cameras: FiCamera,
  audio: FiHeadphones,
  smartHome: FiHome,
  fashion: FiShoppingBag,
  medical: FiActivity,
  food: FiCoffee,
  books: FiBook,
  sports: FiActivity,
  art: FiGrid,
  music: FiMusic,
  automotive: FiTruck,
  home: FiHome,
  baby: FiHeart,
  pet: FiHeart,
  office: FiBriefcase,
  tools: FiTool,
  beauty: FiSun,
  jewelry: FiWatch,
  industrial: FiCpu,
  outdoor: FiSun,
  furniture: FiHome,
  garden: FiTool,
  strollers: FiHeart,
  educational: FiBook,
  petCarriers: FiBox,
  printers: FiPrinter,
  powerTools: FiZap,
  skincare: FiHeart,
  fragrance: FiDroplet,
  safety: FiShield,
  tracking: FiMap,
  signature: FiEdit,
  photo: FiCamera,
  temperature: FiThermometer,
  fragile: FiAlertTriangle,
  waterproof: FiDroplet,
  upright: FiArrowUp,
  settings: FiSettings,
  shopping: FiShoppingCart,
  user: FiUser,
  star: FiStar,
  cameraZoom: FiCamera,
  cameraVideo: FiCamera,
  speakers: FiHeadphones,
  microphones: FiHeadphones,
  stationery: FiEdit,
  hardware: FiTool,
  labSupplies: FiActivity,
  safetyEquipment: FiShield,
  media: FiMusic,
  beautyDevices: FiZap
};

export const QUICK_SEARCH_ITEMS: QuickSearchItem[] = [
  // Electronics & Tech - Smartphones & Accessories
  {
    id: 'smartphone_iphone',
    name: 'iPhone & Premium Smartphones',
    categoryId: 'electronics',
    subcategoryId: 'smartphones',
    icon: FiSmartphone,
    riskLevel: 'high',
    details: 'High-end smartphones including latest iPhone models and flagship Android devices',
    requirements: [
      'Original packaging preferred',
      'Battery safety measures',
      'Screen protection',
      'Remove personal data'
    ],
    warnings: [
      'Contains lithium batteries',
      'Fragile screen',
      'Check carrier restrictions'
    ],
    searchTerms: ['mobile phone', 'cell phone', 'android', 'iOS', 'phone'],
    commonNames: ['mobile', 'cell phone', 'smartphone'],
    brands: ['Apple', 'Samsung', 'Google', 'Huawei', 'Xiaomi', 'OnePlus'],
    specifications: {
      dimensions: '15x7.5x0.8cm typical',
      weight: '150-250g typical',
      material: 'Glass and metal construction'
    }
  },
  {
    id: 'smartphone_midrange',
    name: 'Mid-Range Smartphones',
    categoryId: 'electronics',
    subcategoryId: 'smartphones',
    icon: FiSmartphone,
    riskLevel: 'high',
    details: 'Mid-range smartphones from various manufacturers',
    requirements: [
      'Original packaging preferred',
      'Battery safety measures',
      'Screen protection',
      'Remove personal data'
    ],
    warnings: [
      'Contains lithium batteries',
      'Fragile screen'
    ],
    searchTerms: ['budget phone', 'android phone', 'mid-range phone'],
    brands: ['Samsung A series', 'Xiaomi', 'Oppo', 'Realme', 'Motorola'],
    specifications: {
      dimensions: '16x7.5x0.9cm typical',
      weight: '150-200g typical',
      material: 'Plastic and glass construction'
    }
  },
  {
    id: 'phone_accessories',
    name: 'Phone Accessories Bundle',
    categoryId: 'electronics',
    subcategoryId: 'smartphones',
    icon: FiTool,
    riskLevel: 'low',
    details: 'Phone accessories including chargers, cases, and screen protectors',
    requirements: [
      'Original packaging preferred',
      'Bundle items securely',
      'Protect fragile items'
    ],
    warnings: [
      'Verify compatibility',
      'Check for damaged items'
    ],
    searchTerms: ['charger', 'case', 'screen protector', 'phone accessories'],
    commonNames: ['phone extras', 'phone gear'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-500g typical',
      material: 'Mixed materials'
    }
  },
  // Electronics & Tech - Computers
  {
    id: 'laptop_premium',
    name: 'Premium Laptops',
    categoryId: 'electronics',
    subcategoryId: 'computers',
    icon: FiMonitor,
    riskLevel: 'very_high',
    details: 'High-end laptops including MacBooks and premium Windows laptops',
    requirements: [
      'Original packaging required',
      'Shock-proof packaging',
      'Battery safety measures',
      'Insurance recommended'
    ],
    warnings: [
      'Contains lithium batteries',
      'Fragile components',
      'High-value item'
    ],
    searchTerms: ['macbook', 'premium laptop', 'ultrabook'],
    brands: ['Apple', 'Dell XPS', 'HP Spectre', 'Lenovo ThinkPad'],
    specifications: {
      dimensions: '35x25x2cm typical',
      weight: '1-2kg typical',
      material: 'Aluminum/Metal construction'
    }
  },
  {
    id: 'desktop_gaming',
    name: 'Gaming Desktop PC',
    categoryId: 'electronics',
    subcategoryId: 'computers',
    icon: FiMonitor,
    riskLevel: 'very_high',
    details: 'Gaming desktop computers and custom builds',
    requirements: [
      'Original packaging preferred',
      'Extra padding required',
      'Remove GPU if possible',
      'Secure internal components'
    ],
    warnings: [
      'Extremely fragile',
      'Heavy item',
      'Professional handling recommended'
    ],
    searchTerms: ['gaming pc', 'desktop computer', 'gaming rig'],
    brands: ['Custom Built', 'Alienware', 'ROG', 'MSI'],
    specifications: {
      dimensions: '50x25x50cm typical',
      weight: '10-20kg typical',
      material: 'Metal and tempered glass'
    }
  },
  {
    id: 'computer_monitors',
    name: 'Computer Monitors',
    categoryId: 'electronics',
    subcategoryId: 'computers',
    icon: FiMonitor,
    riskLevel: 'high',
    details: 'Computer monitors and displays of various sizes',
    requirements: [
      'Original packaging required',
      'Corner protection',
      'Fragile handling',
      'Vertical orientation'
    ],
    warnings: [
      'Extremely fragile screen',
      'Keep upright',
      'No stacking'
    ],
    searchTerms: ['monitor', 'display', 'screen', 'LED display'],
    brands: ['Dell', 'LG', 'Samsung', 'ASUS', 'BenQ'],
    specifications: {
      dimensions: '60x40x15cm typical',
      weight: '3-8kg typical',
      material: 'Plastic and glass construction'
    }
  },
  // Electronics & Tech - Tablets
  {
    id: 'tablet_premium',
    name: 'Premium Tablets',
    categoryId: 'electronics',
    subcategoryId: 'tablets',
    icon: FiSmartphone,
    riskLevel: 'high',
    details: 'High-end tablets including iPad Pro and Samsung tablets',
    requirements: [
      'Original packaging required',
      'Screen protection mandatory',
      'Battery safety measures',
      'Remove accounts'
    ],
    warnings: [
      'Contains lithium battery',
      'Fragile screen',
      'High-value item'
    ],
    searchTerms: ['ipad pro', 'samsung tab', 'premium tablet'],
    brands: ['Apple', 'Samsung', 'Microsoft Surface'],
    specifications: {
      dimensions: '30x20x1cm typical',
      weight: '400-800g typical',
      material: 'Metal and glass construction'
    }
  },
  {
    id: 'tablet_accessories',
    name: 'Tablet Accessories',
    categoryId: 'electronics',
    subcategoryId: 'tablets',
    icon: FiSmartphone,
    riskLevel: 'medium',
    details: 'Tablet accessories including styluses, keyboards, and cases',
    requirements: [
      'Original packaging preferred',
      'Protect electronic components',
      'Bundle items securely'
    ],
    warnings: [
      'Check compatibility',
      'Some items contain batteries'
    ],
    searchTerms: ['stylus', 'tablet keyboard', 'tablet case', 'tablet stand'],
    brands: ['Apple Pencil', 'Logitech', 'Zagg', 'OtterBox'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-500g typical',
      material: 'Mixed materials'
    }
  },
  // Electronics & Tech - Cameras
  {
    id: 'camera_dslr',
    name: 'Professional DSLR Cameras',
    categoryId: 'electronics',
    subcategoryId: 'cameras',
    icon: FiCamera,
    riskLevel: 'very_high',
    details: 'Professional DSLR and mirrorless cameras with interchangeable lenses',
    requirements: [
      'Original packaging required',
      'Lens protection mandatory',
      'Body cap required',
      'Sensor protection'
    ],
    warnings: [
      'Extremely sensitive equipment',
      'Contains precision optics',
      'Professional handling required'
    ],
    searchTerms: ['dslr', 'mirrorless', 'professional camera', 'digital camera'],
    brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm'],
    specifications: {
      dimensions: '16x12x10cm typical',
      weight: '800-1200g typical',
      material: 'Professional grade materials'
    }
  },
  {
    id: 'camera_lenses',
    name: 'Camera Lenses',
    categoryId: 'electronics',
    subcategoryId: 'cameras',
    icon: FiCamera,
    riskLevel: 'very_high',
    details: 'Professional camera lenses and optical equipment',
    requirements: [
      'Original packaging required',
      'Front and rear caps mandatory',
      'Padding between items',
      'Impact protection'
    ],
    warnings: [
      'Fragile optics',
      'No stacking',
      'Keep away from moisture'
    ],
    searchTerms: ['camera lens', 'telephoto', 'wide angle', 'prime lens'],
    brands: ['Canon', 'Nikon', 'Sony', 'Sigma', 'Tamron'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '200-2000g typical',
      material: 'Metal and glass construction'
    }
  },
  {
    id: 'camera_accessories',
    name: 'Camera Accessories',
    categoryId: 'electronics',
    subcategoryId: 'cameras',
    icon: FiCamera,
    riskLevel: 'medium',
    details: 'Photography accessories including tripods, filters, and memory cards',
    requirements: [
      'Original packaging preferred',
      'Secure packaging',
      'Protect delicate items'
    ],
    warnings: [
      'Some items fragile',
      'Check for compatibility'
    ],
    searchTerms: ['tripod', 'camera filter', 'memory card', 'camera bag'],
    brands: ['Manfrotto', 'B+W', 'SanDisk', 'Think Tank'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-2000g typical',
      material: 'Mixed materials'
    }
  },
  // Electronics & Tech - Audio Equipment
  {
    id: 'headphones_premium',
    name: 'Premium Headphones',
    categoryId: 'electronics',
    subcategoryId: 'audio',
    icon: FiHeadphones,
    riskLevel: 'high',
    details: 'High-end headphones and audio equipment',
    requirements: [
      'Original packaging required',
      'Cushioning protection',
      'Handle with care',
      'Keep dry'
    ],
    warnings: [
      'Sensitive electronics',
      'Some contain batteries',
      'Fragile components'
    ],
    searchTerms: ['headphones', 'wireless headphones', 'noise cancelling'],
    brands: ['Sony', 'Bose', 'Sennheiser', 'Apple AirPods Max'],
    specifications: {
      dimensions: '25x20x15cm typical',
      weight: '250-400g typical',
      material: 'Premium materials'
    }
  },
  {
    id: 'speakers_portable',
    name: 'Portable Speakers',
    categoryId: 'electronics',
    subcategoryId: 'audio',
    icon: FiHeadphones,
    riskLevel: 'medium',
    details: 'Portable and wireless speakers',
    requirements: [
      'Original packaging preferred',
      'Battery safety measures',
      'Impact protection'
    ],
    warnings: [
      'Contains batteries',
      'Keep dry',
      'Handle with care'
    ],
    searchTerms: ['bluetooth speaker', 'wireless speaker', 'portable audio'],
    brands: ['JBL', 'Bose', 'Sony', 'Ultimate Ears'],
    specifications: {
      dimensions: '20x10x10cm typical',
      weight: '500-1000g typical',
      material: 'Durable materials'
    }
  },
  {
    id: 'audio_professional',
    name: 'Professional Audio Equipment',
    categoryId: 'electronics',
    subcategoryId: 'audio',
    icon: FiHeadphones,
    riskLevel: 'very_high',
    details: 'Professional audio equipment including mixers and microphones',
    requirements: [
      'Original packaging required',
      'Shock-proof packaging',
      'Professional handling',
      'Keep dry'
    ],
    warnings: [
      'Extremely sensitive equipment',
      'Fragile components',
      'Professional setup required'
    ],
    searchTerms: ['mixer', 'microphone', 'audio interface', 'studio equipment'],
    brands: ['Shure', 'Audio-Technica', 'Roland', 'Focusrite'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-5kg typical',
      material: 'Professional grade components'
    }
  },
  // Fashion & Accessories - Shoes
  {
    id: 'luxury_shoes',
    name: 'Luxury Footwear',
    categoryId: 'fashion',
    subcategoryId: 'shoes',
    icon: FiShoppingBag,
    riskLevel: 'high',
    details: 'High-end shoes and designer footwear',
    requirements: [
      'Original boxes required',
      'Shape protection',
      'Individual wrapping',
      'Dust bags included'
    ],
    warnings: [
      'Maintain shape',
      'Protect soles',
      'Keep pairs together'
    ],
    searchTerms: ['designer shoes', 'luxury footwear', 'high-end shoes'],
    brands: ['Christian Louboutin', 'Jimmy Choo', 'Manolo Blahnik', 'Gucci'],
    specifications: {
      dimensions: '35x25x15cm typical',
      weight: '500-1500g typical',
      material: 'Premium leather and materials'
    }
  },
  {
    id: 'sneakers_collectible',
    name: 'Collectible Sneakers',
    categoryId: 'fashion',
    subcategoryId: 'shoes',
    icon: FiShoppingBag,
    riskLevel: 'high',
    details: 'Limited edition and collectible sneakers',
    requirements: [
      'Original box mandatory',
      'Authentication cards',
      'Protect from compression',
      'Temperature control'
    ],
    warnings: [
      'High-value items',
      'Keep dry',
      'Avoid direct sunlight'
    ],
    searchTerms: ['limited edition sneakers', 'rare sneakers', 'collectible shoes'],
    brands: ['Nike', 'Adidas', 'Jordan', 'Yeezy'],
    specifications: {
      dimensions: '35x25x15cm typical',
      weight: '700-1200g typical',
      material: 'Various premium materials'
    }
  },
  // Medical & Health - Medical Supplies
  {
    id: 'medical_equipment_pro',
    name: 'Professional Medical Equipment',
    categoryId: 'medical',
    subcategoryId: 'medical_equipment',
    icon: FiHeart,
    riskLevel: 'very_high',
    details: 'Professional medical and diagnostic equipment',
    requirements: [
      'Sterile packaging',
      'Temperature monitoring',
      'Calibration certificates',
      'Special handling'
    ],
    warnings: [
      'Sensitive equipment',
      'Maintain sterility',
      'Handle with care'
    ],
    searchTerms: ['medical equipment', 'diagnostic tools', 'medical devices'],
    brands: ['Philips', 'GE Healthcare', 'Siemens', 'Medtronic'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-50kg typical',
      material: 'Medical grade materials'
    }
  },
  {
    id: 'medical_supplies_basic',
    name: 'Basic Medical Supplies',
    categoryId: 'medical',
    subcategoryId: 'medical_supplies',
    icon: FiHome,
    riskLevel: 'medium',
    details: 'Basic medical supplies and first aid equipment',
    requirements: [
      'Sealed packaging',
      'Clean environment',
      'Temperature control',
      'Track expiry dates'
    ],
    warnings: [
      'Keep sterile',
      'Check expiration',
      'Handle with care'
    ],
    searchTerms: ['first aid', 'medical supplies', 'bandages', 'medical equipment'],
    brands: ['3M', 'Johnson & Johnson', 'BD', 'McKesson'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-5000g typical',
      material: 'Medical grade materials'
    }
  },
  // Medical & Health - Medications
  {
    id: 'prescription_meds',
    name: 'Prescription Medications',
    categoryId: 'medical',
    subcategoryId: 'medications',
    icon: FiPackage,
    riskLevel: 'very_high',
    details: 'Prescription medications requiring special handling',
    requirements: [
      'Original packaging only',
      'Temperature monitoring',
      'Prescription documentation',
      'Secure transport'
    ],
    warnings: [
      'Temperature sensitive',
      'Controlled substances',
      'Special permits required'
    ],
    searchTerms: ['prescription drugs', 'medication', 'pharmaceuticals'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-500g typical',
      material: 'Pharmaceutical grade packaging'
    }
  },
  {
    id: 'medical_devices_portable',
    name: 'Portable Medical Devices',
    categoryId: 'medical',
    subcategoryId: 'medical_equipment',
    icon: FiSmartphone,
    riskLevel: 'high',
    details: 'Portable medical devices and monitoring equipment',
    requirements: [
      'Original packaging required',
      'Battery safety',
      'Calibration maintained',
      'Clean environment'
    ],
    warnings: [
      'Contains batteries',
      'Sensitive electronics',
      'Handle with care'
    ],
    searchTerms: ['medical device', 'health monitor', 'portable medical'],
    brands: ['Philips', 'Omron', 'ResMed', 'Medtronic'],
    specifications: {
      dimensions: '20x15x10cm typical',
      weight: '200-1000g typical',
      material: 'Medical grade materials'
    }
  },
  // Food & Beverages - Perishable
  {
    id: 'fresh_produce',
    name: 'Fresh Produce',
    categoryId: 'food_beverages',
    subcategoryId: 'perishable_food',
    icon: FiPackage,
    riskLevel: 'high',
    details: 'Fresh fruits, vegetables, and perishable produce',
    requirements: [
      'Temperature-controlled transport',
      'Quick delivery timeline',
      'Proper ventilation',
      'Clean handling'
    ],
    warnings: [
      'Highly perishable',
      'Temperature sensitive',
      'Handle with care'
    ],
    searchTerms: ['fresh food', 'produce', 'fruits', 'vegetables'],
    specifications: {
      dimensions: 'Various sizes',
      weight: 'Various weights',
      material: 'Organic produce'
    }
  },
  {
    id: 'dairy_products',
    name: 'Dairy Products',
    categoryId: 'food_beverages',
    subcategoryId: 'perishable_food',
    icon: FiThermometer,
    riskLevel: 'very_high',
    details: 'Fresh dairy products requiring refrigeration',
    requirements: [
      'Constant refrigeration',
      'Temperature monitoring',
      'Sealed packaging',
      'Quick delivery'
    ],
    warnings: [
      'Highly perishable',
      'Temperature critical',
      'Handle with care'
    ],
    searchTerms: ['dairy', 'milk products', 'fresh dairy'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-5000g typical',
      material: 'Food grade packaging'
    }
  },
  {
    id: 'frozen_foods',
    name: 'Frozen Foods',
    categoryId: 'food_beverages',
    subcategoryId: 'perishable_food',
    icon: FiThermometer,
    riskLevel: 'very_high',
    details: 'Frozen food items requiring constant freezing',
    requirements: [
      'Maintain freezing temperature',
      'Insulated packaging',
      'Temperature monitoring',
      'Quick delivery'
    ],
    warnings: [
      'Keep frozen',
      'Temperature critical',
      'Time sensitive'
    ],
    searchTerms: ['frozen food', 'frozen goods', 'freezer items'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '500-5000g typical',
      material: 'Freezer-safe packaging'
    }
  },
  // Food & Beverages - Non-Perishable
  {
    id: 'packaged_foods',
    name: 'Packaged Foods',
    categoryId: 'food_beverages',
    subcategoryId: 'non_perishable',
    icon: FiPackage,
    riskLevel: 'low',
    details: 'Shelf-stable packaged foods and dry goods',
    requirements: [
      'Original packaging intact',
      'Keep dry',
      'Check expiration dates',
      'Handle with care'
    ],
    warnings: [
      'Check for damage',
      'Verify seals',
      'Stack carefully'
    ],
    searchTerms: ['canned food', 'packaged food', 'dry goods'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-5000g typical',
      material: 'Food grade packaging'
    }
  },
  {
    id: 'specialty_foods',
    name: 'Specialty Food Items',
    categoryId: 'food_beverages',
    subcategoryId: 'non_perishable',
    icon: FiPackage,
    riskLevel: 'medium',
    details: 'Gourmet and specialty food products',
    requirements: [
      'Original packaging',
      'Temperature stable',
      'Careful handling',
      'Track expiry dates'
    ],
    warnings: [
      'Some items fragile',
      'Check packaging integrity',
      'Handle with care'
    ],
    searchTerms: ['gourmet food', 'specialty items', 'premium food'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-2000g typical',
      material: 'Premium packaging'
    }
  },
  // Books & Media - Books
  {
    id: 'books_hardcover',
    name: 'Hardcover Books',
    categoryId: 'books_media',
    subcategoryId: 'books',
    icon: FiBook,
    riskLevel: 'medium',
    details: 'Hardcover books and collectors editions',
    requirements: [
      'Rigid packaging',
      'Corner protection',
      'Keep dry',
      'Handle with care'
    ],
    warnings: [
      'Protect corners',
      'Avoid bending',
      'Stack carefully'
    ],
    searchTerms: ['hardcover books', 'collectors editions', 'premium books'],
    specifications: {
      dimensions: '30x25x5cm typical',
      weight: '500-2000g typical',
      material: 'Paper and binding'
    }
  },
  {
    id: 'books_rare',
    name: 'Rare & Antique Books',
    categoryId: 'books_media',
    subcategoryId: 'books',
    icon: FiBook,
    riskLevel: 'very_high',
    details: 'Rare, antique, and valuable books',
    requirements: [
      'Custom packaging',
      'Climate control',
      'Insurance required',
      'Professional handling'
    ],
    warnings: [
      'Extremely valuable',
      'Handle with care',
      'Climate sensitive'
    ],
    searchTerms: ['rare books', 'antique books', 'collectible books'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '200-3000g typical',
      material: 'Various historical materials'
    }
  },
  {
    id: 'vinyl_records',
    name: 'Vinyl Records',
    categoryId: 'books_media',
    subcategoryId: 'media',
    icon: FiMusic,
    riskLevel: 'high',
    details: 'Vinyl records and collectible albums',
    requirements: [
      'Original packaging',
      'Protective sleeves',
      'Handle with care'
    ]
  },
  // Sports & Fitness - Exercise Equipment
  {
    id: 'fitness_equipment',
    name: 'Professional Fitness Equipment',
    categoryId: 'sports_fitness',
    subcategoryId: 'exercise_equipment',
    icon: FiActivity,
    riskLevel: 'high',
    details: 'Professional gym and fitness equipment',
    requirements: [
      'Secure packaging',
      'Assembly instructions',
      'Parts protection',
      'Heavy item handling'
    ],
    warnings: [
      'Heavy items',
      'Multiple parts',
      'Professional assembly may be required'
    ],
    searchTerms: ['gym equipment', 'fitness gear', 'exercise machine'],
    brands: ['Life Fitness', 'Precor', 'Technogym', 'Bowflex'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '20-200kg typical',
      material: 'Steel and rubber construction'
    }
  },
  {
    id: 'weights_dumbbells',
    name: 'Weights & Dumbbells',
    categoryId: 'sports_fitness',
    subcategoryId: 'exercise_equipment',
    icon: FiActivity,
    riskLevel: 'medium',
    details: 'Free weights, dumbbells, and weight plates',
    requirements: [
      'Reinforced packaging',
      'Weight distribution',
      'Handle with care',
      'Heavy item warning'
    ],
    warnings: [
      'Extremely heavy',
      'Handle with care',
      'Use proper lifting techniques'
    ],
    searchTerms: ['weights', 'dumbbells', 'weight plates', 'free weights'],
    brands: ['Rogue Fitness', 'York', 'Eleiko', 'CAP Barbell'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '2-50kg per piece',
      material: 'Cast iron or rubber-coated'
    }
  },
  // Sports & Fitness - Sports Gear
  {
    id: 'golf_equipment',
    name: 'Golf Equipment',
    categoryId: 'sports_fitness',
    subcategoryId: 'sports_gear',
    icon: FiActivity,
    riskLevel: 'high',
    details: 'Golf clubs and professional golf equipment',
    requirements: [
      'Club protection',
      'Shaft protection',
      'Head covers required',
      'Secure fastening'
    ],
    warnings: [
      'Fragile shafts',
      'Protect club heads',
      'Handle with care'
    ],
    searchTerms: ['golf clubs', 'golf equipment', 'golf gear'],
    brands: ['Titleist', 'Callaway', 'TaylorMade', 'Ping'],
    specifications: {
      dimensions: '130x30x30cm typical',
      weight: '10-15kg typical',
      material: 'Various premium materials'
    }
  },
  // Art & Craft Supplies - Painting
  {
    id: 'art_canvas',
    name: 'Professional Art Canvas',
    categoryId: 'art_supplies',
    subcategoryId: 'painting_supplies',
    icon: FiGrid,
    riskLevel: 'medium',
    details: 'Professional grade canvas and painting surfaces',
    requirements: [
      'Flat storage',
      'Moisture protection',
      'Corner protection',
      'No bending'
    ],
    warnings: [
      'Keep flat',
      'Avoid moisture',
      'Handle with care'
    ],
    searchTerms: ['canvas', 'painting surface', 'art supplies'],
    brands: ['Fredrix', 'Winsor & Newton', 'Masterpiece', 'Arteza'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-2000g typical',
      material: 'Premium canvas materials'
    }
  },
  {
    id: 'art_paints',
    name: 'Professional Paints',
    categoryId: 'art_supplies',
    subcategoryId: 'painting_supplies',
    icon: FiGrid,
    riskLevel: 'medium',
    details: 'Professional grade paints and painting materials',
    requirements: [
      'Temperature control',
      'Upright storage',
      'Seal check',
      'Careful handling'
    ],
    warnings: [
      'Temperature sensitive',
      'Contains pigments',
      'May require hazmat'
    ],
    searchTerms: ['paint', 'art supplies', 'professional paint'],
    brands: ['Winsor & Newton', 'Golden', 'Liquitex', 'Daniel Smith'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-5000g typical',
      material: 'Professional grade pigments'
    }
  },
  // Art & Craft Supplies - Tools
  {
    id: 'art_brushes',
    name: 'Professional Art Brushes',
    categoryId: 'art_supplies',
    subcategoryId: 'art_tools',
    icon: FiGrid,
    riskLevel: 'medium',
    details: 'Professional grade art brushes and tools',
    requirements: [
      'Shape protection',
      'Individual wrapping',
      'Bristle protection',
      'Keep dry'
    ],
    warnings: [
      'Delicate bristles',
      'Maintain shape',
      'Handle with care'
    ],
    searchTerms: ['art brushes', 'paint brushes', 'artist tools'],
    brands: ['Winsor & Newton', 'Da Vinci', 'Raphael', 'Escoda'],
    specifications: {
      dimensions: '15-40cm typical',
      weight: '10-100g typical',
      material: 'Natural and synthetic bristles'
    }
  },
  // Musical Instruments - String Instruments
  {
    id: 'guitars',
    name: 'Guitars',
    categoryId: 'musical_instruments',
    subcategoryId: 'string_instruments',
    icon: FiMusic,
    riskLevel: 'very_high',
    details: 'Acoustic guitars and similar string instruments',
    requirements: [
      'Hard case required',
      'Climate control',
      'Humidity monitoring',
      'Professional handling'
    ],
    warnings: [
      'Extremely fragile',
      'Temperature sensitive',
      'Handle with care'
    ],
    searchTerms: ['guitar', 'acoustic guitar', 'string instrument'],
    brands: ['Martin', 'Taylor', 'Gibson', 'Yamaha'],
    specifications: {
      dimensions: '110x40x15cm typical',
      weight: '2-4kg typical',
      material: 'Wood and strings'
    }
  },
  {
    id: 'violin_professional',
    name: 'Professional Violins',
    categoryId: 'musical_instruments',
    subcategoryId: 'string_instruments',
    icon: FiMusic,
    riskLevel: 'very_high',
    details: 'Professional and antique violins',
    requirements: [
      'Professional case required',
      'Climate control',
      'Humidity monitoring',
      'Insurance required'
    ],
    warnings: [
      'Extremely valuable',
      'Very fragile',
      'Climate sensitive'
    ],
    searchTerms: ['violin', 'string instrument', 'classical instrument'],
    brands: ['Stradivari', 'Guarneri', 'Modern Makers'],
    specifications: {
      dimensions: '60x25x15cm typical',
      weight: '300-500g typical',
      material: 'Fine woods and strings'
    }
  },
  // Musical Instruments - Percussion
  {
    id: 'drums_professional',
    name: 'Professional Drums',
    categoryId: 'musical_instruments',
    subcategoryId: 'percussion',
    icon: FiMusic,
    riskLevel: 'high',
    details: 'Professional drum kits and percussion sets'
  },
  // Automotive - Car Parts
  {
    id: 'car_engine_parts',
    name: 'Engine Components',
    categoryId: 'automotive',
    subcategoryId: 'car_parts',
    icon: FiTool,
    riskLevel: 'high',
    details: 'Automotive engine parts and components',
    requirements: [
      'Original packaging',
      'Oil-proof wrapping',
      'Part number verification',
      'Careful handling'
    ],
    warnings: [
      'Heavy items',
      'May contain oil',
      'Precise handling required'
    ],
    searchTerms: ['engine parts', 'car parts', 'auto parts'],
    brands: ['Bosch', 'Denso', 'ACDelco', 'Genuine OEM'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-50kg typical',
      material: 'Metal and composite materials'
    }
  },
  {
    id: 'car_electronics',
    name: 'Car Electronics',
    categoryId: 'automotive',
    subcategoryId: 'car_electronics',
    icon: FiZap,
    riskLevel: 'high',
    details: 'Electronic components for vehicles',
    requirements: [
      'Anti-static packaging',
      'Moisture protection',
      'Original packaging',
      'Careful handling'
    ],
    warnings: [
      'Static sensitive',
      'Fragile components',
      'Verify compatibility'
    ],
    searchTerms: ['car electronics', 'auto electronics', 'vehicle components'],
    brands: ['Bosch', 'Continental', 'Delphi', 'Denso'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100g-5kg typical',
      material: 'Electronic components'
    }
  }
];

export const PACKAGE_CATEGORIES: Category[] = [
  // Technology & Electronics
  {
    id: 'electronics',
    name: 'Electronics & Tech',
    icon: FiSmartphone,
    description: 'Modern electronics and tech accessories',
    group: 'tech',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        icon: FiSmartphone
      },
      {
        id: 'computers',
        name: 'Computers',
        description: 'Laptops, desktops, and accessories',
        icon: FiMonitor
      },
      {
        id: 'tablets',
        name: 'Tablets',
        description: 'iPads and tablet devices',
        icon: FiSmartphone
      },
      {
        id: 'cameras',
        name: 'Cameras',
        description: 'Digital cameras and equipment',
        icon: FiCamera
      },
      {
        id: 'audio',
        name: 'Audio Equipment',
        description: 'Headphones, speakers, and audio gear',
        icon: FiHeadphones
      }
    ]
  },
  {
    id: 'smart_home',
    name: 'Smart Home',
    icon: FiHome,
    description: 'Smart home devices and accessories',
    group: 'tech',
    subcategories: [
      {
        id: 'smart_speakers',
        name: 'Smart Speakers',
        description: 'Voice assistants and speakers'
      },
      {
        id: 'smart_security',
        name: 'Security Devices',
        description: 'Cameras and security systems'
      },
      {
        id: 'smart_lighting',
        name: 'Smart Lighting',
        description: 'Smart bulbs and lighting systems'
      }
    ]
  },
  // Fashion & Accessories
  {
    id: 'fashion',
    name: 'Fashion & Accessories',
    icon: FiShoppingBag,
    description: 'Clothing, accessories, and fashion items',
    group: 'lifestyle',
    subcategories: [
      {
        id: 'clothing',
        name: 'Clothing',
        description: 'Apparel and garments',
        icon: FiShoppingBag
      },
      {
        id: 'shoes',
        name: 'Footwear',
        description: 'Shoes and boots',
        icon: FiShoppingBag
      },
      {
        id: 'accessories',
        name: 'Accessories',
        description: 'Fashion accessories',
        icon: FiShoppingBag
      },
      {
        id: 'jewelry',
        name: 'Jewelry',
        description: 'Fine jewelry and watches',
        icon: FiWatch
      }
    ]
  },
  // Medical & Health
  {
    id: 'medical',
    name: 'Medical & Health',
    icon: FiHeart,
    description: 'Medical supplies and healthcare items',
    group: 'health',
    subcategories: [
      {
        id: 'medical_supplies',
        name: 'Medical Supplies',
        description: 'General medical supplies',
        icon: FiHome
      },
      {
        id: 'medications',
        name: 'Medications',
        description: 'Prescription and OTC medicines',
        icon: FiPackage
      },
      {
        id: 'medical_equipment',
        name: 'Medical Equipment',
        description: 'Healthcare equipment',
        icon: FiActivity
      }
    ]
  },
  // Food & Beverages
  {
    id: 'food_beverages',
    name: 'Food & Beverages',
    icon: FiCoffee,
    description: 'Food items and beverages',
    group: 'food',
    subcategories: [
      {
        id: 'perishable_food',
        name: 'Perishable Foods',
        description: 'Temperature-sensitive foods',
        icon: FiThermometer
      },
      {
        id: 'non_perishable',
        name: 'Non-perishable Foods',
        description: 'Shelf-stable foods',
        icon: FiPackage
      },
      {
        id: 'beverages',
        name: 'Beverages',
        description: 'Drinks and liquid refreshments',
        icon: FiDroplet
      }
    ]
  },
  // Books & Media
  {
    id: 'books_media',
    name: 'Books & Media',
    icon: FiBook,
    description: 'Books, educational materials, and media content',
    group: 'education',
    subcategories: [
      {
        id: 'books',
        name: 'Books',
        description: 'Physical books and publications',
        icon: FiBook
      },
      {
        id: 'educational_materials',
        name: 'Educational Materials',
        description: 'Learning resources and materials',
        icon: FiBook
      },
      {
        id: 'media',
        name: 'Media',
        description: 'CDs, DVDs, and other media',
        icon: FiMusic
      }
    ]
  },

  // Sports & Fitness
  {
    id: 'sports_fitness',
    name: 'Sports & Fitness',
    icon: FiActivity,
    description: 'Sports equipment and fitness gear',
    group: 'sports',
    subcategories: [
      {
        id: 'exercise_equipment',
        name: 'Exercise Equipment',
        description: 'Fitness and workout gear',
        icon: FiActivity
      },
      {
        id: 'sports_gear',
        name: 'Sports Gear',
        description: 'Equipment for various sports',
        icon: FiActivity
      },
      {
        id: 'outdoor_sports',
        name: 'Outdoor Sports',
        description: 'Equipment for outdoor activities',
        icon: FiSun
      }
    ]
  },

  // Art & Craft Supplies
  {
    id: 'art_supplies',
    name: 'Art & Craft Supplies',
    icon: FiGrid,
    description: 'Art materials and craft supplies',
    group: 'creative',
    subcategories: [
      {
        id: 'painting_supplies',
        name: 'Painting Supplies',
        description: 'Paint and painting materials',
        icon: FiGrid
      },
      {
        id: 'craft_materials',
        name: 'Craft Materials',
        description: 'General craft supplies',
        icon: FiGrid
      },
      {
        id: 'art_tools',
        name: 'Art Tools',
        description: 'Tools for artists',
        icon: FiGrid
      }
    ]
  },

  // Musical Instruments
  {
    id: 'musical_instruments',
    name: 'Musical Instruments',
    icon: FiMusic,
    description: 'Musical instruments and accessories',
    group: 'music',
    subcategories: [
      {
        id: 'string_instruments',
        name: 'String Instruments',
        description: 'Guitars, violins, etc.',
        icon: FiMusic
      },
      {
        id: 'percussion',
        name: 'Percussion',
        description: 'Drums and percussion instruments',
        icon: FiMusic
      },
      {
        id: 'wind_instruments',
        name: 'Wind Instruments',
        description: 'Brass and woodwind instruments',
        icon: FiMusic
      }
    ]
  },

  // Automotive
  {
    id: 'automotive',
    name: 'Automotive Parts',
    icon: FiTruck,
    description: 'Vehicle parts and accessories',
    group: 'auto',
    subcategories: [
      {
        id: 'car_parts',
        name: 'Car Parts',
        description: 'Replacement parts for vehicles',
        icon: FiTool
      },
      {
        id: 'car_accessories',
        name: 'Car Accessories',
        description: 'Vehicle accessories and add-ons',
        icon: FiTruck
      },
      {
        id: 'car_electronics',
        name: 'Car Electronics',
        description: 'Electronic components for vehicles',
        icon: FiZap
      }
    ]
  },

  // Home & Garden
  {
    id: 'home_garden',
    name: 'Home & Garden',
    icon: FiHome,
    description: 'Home improvement and garden supplies',
    group: 'home',
    subcategories: [
      {
        id: 'home_decor',
        name: 'Home Decor',
        description: 'Decorative items for home',
        icon: FiHome
      },
      {
        id: 'garden_tools',
        name: 'Garden Tools',
        description: 'Gardening equipment and tools',
        icon: FiTool
      },
      {
        id: 'furniture',
        name: 'Furniture',
        description: 'Home and outdoor furniture',
        icon: FiHome
      },
      {
        id: 'kitchen_dining',
        name: 'Kitchen & Dining',
        description: 'Kitchen supplies and dining items',
        icon: FiPackage
      }
    ]
  },

  // Baby & Kids
  {
    id: 'baby_kids',
    name: 'Baby & Kids',
    icon: FiHeart,
    description: 'Products for babies and children',
    group: 'family',
    subcategories: [
      {
        id: 'baby_essentials',
        name: 'Baby Essentials',
        description: 'Essential items for babies',
        icon: FiHeart
      },
      {
        id: 'toys_games',
        name: 'Toys & Games',
        description: 'Children\'s toys and games',
        icon: FiGrid
      },
      {
        id: 'kids_clothing',
        name: 'Kids Clothing',
        description: 'Clothing for children',
        icon: FiShoppingBag
      },
      {
        id: 'school_supplies',
        name: 'School Supplies',
        description: 'Educational materials for kids',
        icon: FiBook
      }
    ]
  },

  // Pet Supplies (Expanded)
  {
    id: 'pet_supplies',
    name: 'Pet Supplies',
    icon: FiHeart,
    description: 'Products for pets and animals',
    group: 'pets',
    subcategories: [
      {
        id: 'pet_food',
        name: 'Pet Food',
        description: 'Food for various pets',
        icon: FiPackage
      },
      {
        id: 'pet_accessories',
        name: 'Pet Accessories',
        description: 'Accessories and supplies',
        icon: FiHeart
      },
      {
        id: 'pet_health',
        name: 'Pet Healthcare',
        description: 'Pet health and wellness items',
        icon: FiActivity
      },
      {
        id: 'pet_travel',
        name: 'Pet Travel',
        description: 'Travel items for pets',
        icon: FiBox
      }
    ]
  },

  // Office Supplies
  {
    id: 'office_supplies',
    name: 'Office Supplies',
    icon: FiBriefcase,
    description: 'Professional and office equipment',
    group: 'business',
    subcategories: [
      {
        id: 'stationery',
        name: 'Stationery',
        description: 'Paper products and writing materials',
        icon: FiEdit
      },
      {
        id: 'office_equipment',
        name: 'Office Equipment',
        description: 'Business machines and equipment',
        icon: FiPrinter
      },
      {
        id: 'office_furniture',
        name: 'Office Furniture',
        description: 'Furniture for workplace',
        icon: FiHome
      }
    ]
  },

  // Tools & Hardware
  {
    id: 'tools_hardware',
    name: 'Tools & Hardware',
    icon: FiTool,
    description: 'Tools and construction supplies',
    group: 'construction',
    subcategories: [
      {
        id: 'power_tools',
        name: 'Power Tools',
        description: 'Electric and battery-powered tools',
        icon: FiZap
      },
      {
        id: 'hand_tools',
        name: 'Hand Tools',
        description: 'Manual tools and equipment',
        icon: FiTool
      },
      {
        id: 'hardware',
        name: 'Hardware',
        description: 'Construction hardware and supplies',
        icon: FiTool
      }
    ]
  },

  // Beauty & Personal Care
  {
    id: 'beauty_care',
    name: 'Beauty & Personal Care',
    icon: FiSun,
    description: 'Beauty and personal care products',
    group: 'personal',
    subcategories: [
      {
        id: 'skincare',
        name: 'Skincare',
        description: 'Skin care products',
        icon: FiHeart
      },
      {
        id: 'haircare',
        name: 'Hair Care',
        description: 'Hair products and accessories',
        icon: FiSun
      },
      {
        id: 'makeup',
        name: 'Makeup',
        description: 'Cosmetics and beauty tools',
        icon: FiSun
      },
      {
        id: 'fragrance',
        name: 'Fragrance',
        description: 'Perfumes and fragrances',
        icon: FiDroplet
      }
    ]
  },

  // Jewelry & Watches
  {
    id: 'jewelry_watches',
    name: 'Jewelry & Watches',
    icon: FiWatch,
    description: 'Fine jewelry and timepieces',
    group: 'luxury',
    subcategories: [
      {
        id: 'fine_jewelry',
        name: 'Fine Jewelry',
        description: 'Precious jewelry pieces',
        icon: FiWatch
      },
      {
        id: 'watches',
        name: 'Watches',
        description: 'Luxury and casual watches',
        icon: FiWatch
      },
      {
        id: 'accessories',
        name: 'Jewelry Accessories',
        description: 'Jewelry care and storage',
        icon: FiWatch
      }
    ]
  },

  // Industrial & Scientific
  {
    id: 'industrial',
    name: 'Industrial & Scientific',
    icon: FiCpu,
    description: 'Industrial equipment and supplies',
    group: 'business',
    subcategories: [
      {
        id: 'lab_supplies',
        name: 'Lab Supplies',
        description: 'Laboratory equipment',
        icon: FiActivity
      },
      {
        id: 'industrial_tools',
        name: 'Industrial Tools',
        description: 'Professional grade tools',
        icon: FiTool
      },
      {
        id: 'safety_equipment',
        name: 'Safety Equipment',
        description: 'Industrial safety gear',
        icon: FiShield
      }
    ]
  },

  // Outdoor & Camping
  {
    id: 'outdoor_camping',
    name: 'Outdoor & Camping',
    icon: FiSun,
    description: 'Outdoor recreation and camping gear',
    group: 'recreation',
    subcategories: [
      {
        id: 'camping_gear',
        name: 'Camping Gear',
        description: 'Tents and camping equipment',
        icon: FiSun
      },
      {
        id: 'hiking_equipment',
        name: 'Hiking Equipment',
        description: 'Hiking and trail gear',
        icon: FiSun
      },
      {
        id: 'outdoor_accessories',
        name: 'Outdoor Accessories',
        description: 'General outdoor accessories',
        icon: FiSun
      }
    ]
  },

  // Home & Garden - Furniture
  {
    id: 'furniture_living',
    name: 'Living Room Furniture',
    categoryId: 'home_garden',
    subcategoryId: 'furniture',
    icon: FiHome,
    riskLevel: 'high',
    details: 'Living room furniture including sofas and chairs',
    requirements: [
      'Professional packaging',
      'Corner protection',
      'Fabric protection',
      'Assembly instructions'
    ],
    warnings: [
      'Heavy items',
      'Multiple pieces',
      'Professional handling recommended'
    ],
    searchTerms: ['sofa', 'couch', 'living room furniture', 'chairs'],
    brands: ['Ashley', 'La-Z-Boy', 'Pottery Barn', 'West Elm'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '30-150kg typical',
      material: 'Various upholstery materials'
    }
  },
  {
    id: 'furniture_antique',
    name: 'Antique Furniture',
    categoryId: 'home_garden',
    subcategoryId: 'furniture',
    icon: FiHome,
    riskLevel: 'very_high',
    details: 'Antique and vintage furniture pieces',
    requirements: [
      'Custom crating',
      'Climate control',
      'Insurance required',
      'Professional handling'
    ],
    warnings: [
      'Extremely valuable',
      'Very fragile',
      'Historical items'
    ],
    searchTerms: ['antique furniture', 'vintage furniture', 'period pieces'],
    brands: ['Period Specific', 'Collector Items', 'Historical Pieces'],
    specifications: {
      dimensions: 'Various sizes',
      weight: 'Various weights',
      material: 'Various period materials'
    }
  },

  // Home & Garden - Garden Tools
  {
    id: 'garden_power_tools',
    name: 'Garden Power Tools',
    categoryId: 'home_garden',
    subcategoryId: 'garden_tools',
    icon: FiTool,
    riskLevel: 'medium',
    details: 'Power tools for garden maintenance',
    requirements: [
      'Original packaging preferred',
      'Drain fluids',
      'Secure moving parts',
      'Battery removal'
    ],
    warnings: [
      'Sharp edges',
      'Contains fuel/oil',
      'Heavy items'
    ],
    searchTerms: ['lawn mower', 'hedge trimmer', 'garden tools'],
    brands: ['STIHL', 'Husqvarna', 'Black & Decker', 'Ryobi'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '5-50kg typical',
      material: 'Metal and plastic construction'
    }
  },

  // Baby & Kids - Baby Essentials
  {
    id: 'baby_stroller',
    name: 'Premium Strollers',
    categoryId: 'baby_kids',
    subcategoryId: 'baby_essentials',
    icon: FiHeart,
    riskLevel: 'high',
    details: 'High-end baby strollers and travel systems',
    requirements: [
      'Original packaging required',
      'Assembly instructions',
      'Parts protection',
      'Clean environment'
    ],
    warnings: [
      'Multiple components',
      'Verify all parts',
      'Keep clean'
    ],
    searchTerms: ['stroller', 'baby transport', 'travel system'],
    brands: ['UPPAbaby', 'Bugaboo', 'Stokke', 'Cybex'],
    specifications: {
      dimensions: '80x60x40cm typical',
      weight: '8-15kg typical',
      material: 'Aluminum and fabric'
    }
  },
  {
    id: 'baby_furniture',
    name: 'Baby Furniture',
    categoryId: 'baby_kids',
    subcategoryId: 'baby_essentials',
    icon: FiHome,
    riskLevel: 'high',
    details: 'Baby cribs, changing tables, and nursery furniture',
    requirements: [
      'Original packaging',
      'Assembly instructions',
      'Safety certificates',
      'Clean handling'
    ],
    warnings: [
      'Heavy items',
      'Assembly required',
      'Safety standards critical'
    ],
    searchTerms: ['baby crib', 'changing table', 'nursery furniture'],
    brands: ['Pottery Barn Kids', 'Babyletto', 'DaVinci', 'Delta Children'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '20-50kg typical',
      material: 'Wood and metal construction'
    }
  },

  // Baby & Kids - Toys
  {
    id: 'toys_educational',
    name: 'Educational Toys',
    categoryId: 'baby_kids',
    subcategoryId: 'toys_games',
    icon: FiPackage,
    riskLevel: 'medium',
    details: 'Educational toys and learning materials',
    requirements: [
      'Original packaging',
      'Clean environment',
      'Age-appropriate labeling',
      'Safety compliance'
    ],
    warnings: [
      'Small parts possible',
      'Age restrictions',
      'Safety standards'
    ],
    searchTerms: ['educational toys', 'learning toys', 'kids toys'],
    brands: ['Melissa & Doug', 'LeapFrog', 'VTech', 'Fisher-Price'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '0.5-5kg typical',
      material: 'Child-safe materials'
    }
  },

  // Pet Supplies - Pet Carriers
  {
    id: 'pet_carrier_premium',
    name: 'Premium Pet Carriers',
    categoryId: 'pet_supplies',
    subcategoryId: 'pet_travel',
    icon: FiHeart,
    riskLevel: 'high',
    details: 'High-end pet carriers and travel crates',
    requirements: [
      'Airline approved',
      'Ventilation check',
      'Secure latches',
      'Size verification'
    ],
    warnings: [
      'Size restrictions',
      'Ventilation critical',
      'Safety standards'
    ],
    searchTerms: ['pet carrier', 'dog crate', 'travel kennel'],
    brands: ['Sherpa', 'Sleepypod', 'Petmate', 'Sturdi'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-10kg typical',
      material: 'Durable travel-safe materials'
    }
  },
  {
    id: 'pet_supplies_premium',
    name: 'Premium Pet Accessories',
    categoryId: 'pet_supplies',
    subcategoryId: 'pet_accessories',
    icon: FiHeart,
    riskLevel: 'medium',
    details: 'High-end pet accessories and supplies',
    requirements: [
      'Clean packaging',
      'New condition',
      'Safety compliance',
      'Size labeling'
    ],
    warnings: [
      'Size verification',
      'Material safety',
      'Age restrictions'
    ],
    searchTerms: ['pet supplies', 'pet accessories', 'pet gear'],
    brands: ['Ruffwear', 'Kong', 'Kurgo', 'West Paw'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '0.1-5kg typical',
      material: 'Pet-safe materials'
    }
  },

  // Office Supplies - Equipment
  {
    id: 'office_printer',
    name: 'Professional Printers',
    categoryId: 'office_supplies',
    subcategoryId: 'office_equipment',
    icon: FiPrinter,
    riskLevel: 'high',
    details: 'Professional grade printers and copiers',
    requirements: [
      'Original packaging',
      'Remove ink/toner',
      'Secure moving parts',
      'Professional handling'
    ],
    warnings: [
      'Heavy equipment',
      'Fragile parts',
      'Professional setup needed'
    ],
    searchTerms: ['printer', 'copier', 'office equipment'],
    brands: ['HP', 'Canon', 'Xerox', 'Brother'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '20-100kg typical',
      material: 'Electronic equipment'
    }
  },
  {
    id: 'office_furniture_pro',
    name: 'Professional Office Furniture',
    categoryId: 'office_supplies',
    subcategoryId: 'office_furniture',
    icon: FiHome,
    riskLevel: 'medium',
    details: 'Professional office furniture and workstations',
    requirements: [
      'Assembly instructions',
      'Parts inventory',
      'Protection wrapping',
      'Hardware included'
    ],
    warnings: [
      'Heavy items',
      'Assembly required',
      'Multiple pieces'
    ],
    searchTerms: ['office desk', 'office chair', 'workstation'],
    brands: ['Herman Miller', 'Steelcase', 'Haworth', 'Knoll'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '20-100kg typical',
      material: 'Commercial grade materials'
    }
  },

  // Tools & Hardware - Power Tools
  {
    id: 'power_tools_pro',
    name: 'Professional Power Tools',
    categoryId: 'tools_hardware',
    subcategoryId: 'power_tools',
    icon: FiTool,
    riskLevel: 'high',
    details: 'Professional grade power tools and equipment',
    requirements: [
      'Original packaging',
      'Battery removal',
      'Safety locks engaged',
      'Protective covers'
    ],
    warnings: [
      'Sharp edges',
      'Heavy items',
      'Battery safety'
    ],
    searchTerms: ['power tools', 'professional tools', 'construction tools'],
    brands: ['DeWalt', 'Milwaukee', 'Makita', 'Bosch'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '2-20kg typical',
      material: 'Industrial grade materials'
    }
  },

  // Beauty & Personal Care - Skincare
  {
    id: 'skincare_premium',
    name: 'Premium Skincare Products',
    categoryId: 'beauty_care',
    subcategoryId: 'skincare',
    icon: FiHeart,
    riskLevel: 'medium',
    details: 'High-end skincare and beauty products',
    requirements: [
      'Temperature control',
      'Sealed packaging',
      'Upright storage',
      'Leak protection'
    ],
    warnings: [
      'Temperature sensitive',
      'Fragile containers',
      'Liquid contents'
    ],
    searchTerms: ['skincare', 'beauty products', 'facial care'],
    brands: ['La Mer', 'SK-II', 'Tatcha', 'La Prairie'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-500g typical',
      material: 'Glass and premium packaging'
    }
  },
  {
    id: 'beauty_devices',
    name: 'Beauty Devices',
    categoryId: 'beauty_care',
    subcategoryId: 'skincare',
    icon: FiZap,
    riskLevel: 'high',
    details: 'Electronic beauty and skincare devices',
    requirements: [
      'Original packaging',
      'Protective wrapping',
      'Battery safety'
    ],
    warnings: [
      'Contains batteries',
      'Fragile electronics',
      'Keep dry'
    ],
    searchTerms: ['beauty device', 'facial device', 'skincare tool'],
    brands: ['NuFace', 'Foreo', 'LED Mask', 'PMD'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '200-1000g typical',
      material: 'Electronic components'
    }
  }
];

export const SPECIAL_HANDLING_OPTIONS = [
  {
    id: 'fragile',
    name: 'Fragile Handling',
    icon: FiAlertTriangle,
    description: 'Extra care for delicate items'
  },
  {
    id: 'temperature',
    name: 'Temperature Control',
    icon: FiThermometer,
    description: 'Climate-controlled transport'
  },
  {
    id: 'waterproof',
    name: 'Waterproof Protection',
    icon: FiDroplet,
    description: 'Protection from moisture'
  },
  {
    id: 'upright',
    name: 'Keep Upright',
    icon: FiArrowUp,
    description: 'Maintain vertical orientation'
  }
];

export const PACKAGE_RESPONSIBILITIES = [
  {
    id: 'insurance',
    name: 'Package Insurance',
    icon: FiShield,
    description: 'Coverage for loss or damage'
  },
  {
    id: 'tracking',
    name: 'Real-time Tracking',
    icon: FiMap,
    description: 'Live location updates'
  },
  {
    id: 'signature',
    name: 'Signature Required',
    icon: FiEdit,
    description: 'Proof of delivery'
  },
  {
    id: 'photo',
    name: 'Photo Documentation',
    icon: FiCamera,
    description: 'Visual condition record'
  }
];
