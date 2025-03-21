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
  FiUser,
} from 'react-icons/fi';
export type TransportStatus = 'allowed' | 'restricted' | 'prohibited';
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
  displayStyle: {
    bgColor: string;
    iconBg: string;
    borderColor: string;
  };
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
export type SearchableFields =
  | 'name'
  | 'details'
  | 'searchTerms'
  | 'commonNames'
  | 'brands'
  | 'alternatives';
export const searchHelpers = {
  matchesSearchTerm: (item: QuickSearchItem, term: string): boolean => {
    const searchTerm = term.toLowerCase();
    return [
      item.name,
      item.details,
      ...(item.searchTerms || []),
      ...(item.commonNames || []),
      ...(item.brands || []),
      ...(item.alternatives || []),
    ].some((field) => field?.toLowerCase().includes(searchTerm));
  },

  getSearchableText: (item: QuickSearchItem): string => {
    return [
      item.name,
      item.details,
      ...(item.searchTerms || []),
      ...(item.commonNames || []),
      ...(item.brands || []),
      ...(item.alternatives || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
  },

  filterByCategory: (
    items: QuickSearchItem[],
    categoryId: string,
  ): QuickSearchItem[] => {
    return items.filter((item) => item.categoryId === categoryId);
  },
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
  beautyDevices: FiZap,
};

export const QUICK_SEARCH_ITEMS: QuickSearchItem[] = [
  {
    id: 'smartphone_iphone',
    name: 'iPhone & Premium Smartphones',
    categoryId: 'electronics',
    subcategoryId: 'smartphones',
    icon: FiSmartphone,
    riskLevel: 'high',
    details:
      'High-end smartphones including latest iPhone models and flagship Android devices',
    requirements: [
      'Original packaging preferred',
      'Battery safety measures',
      'Screen protection',
      'Remove personal data',
    ],
    warnings: [
      'Contains lithium batteries',
      'Fragile screen',
      'Check carrier restrictions',
    ],
    searchTerms: ['mobile phone', 'cell phone', 'android', 'iOS', 'phone'],
    commonNames: ['mobile', 'cell phone', 'smartphone'],
    brands: ['Apple', 'Samsung', 'Google', 'Huawei', 'Xiaomi', 'OnePlus'],
    specifications: {
      dimensions: '15x7.5x0.8cm typical',
      weight: '150-250g typical',
      material: 'Glass and metal construction',
    },
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
      'Remove personal data',
    ],
    warnings: ['Contains lithium batteries', 'Fragile screen'],
    searchTerms: ['budget phone', 'android phone', 'mid-range phone'],
    brands: ['Samsung A series', 'Xiaomi', 'Oppo', 'Realme', 'Motorola'],
    specifications: {
      dimensions: '16x7.5x0.9cm typical',
      weight: '150-200g typical',
      material: 'Plastic and glass construction',
    },
  },
  {
    id: 'phone_accessories',
    name: 'Phone Accessories Bundle',
    categoryId: 'electronics',
    subcategoryId: 'smartphones',
    icon: FiTool,
    riskLevel: 'low',
    details:
      'Phone accessories including chargers, cases, and screen protectors',
    requirements: [
      'Original packaging preferred',
      'Bundle items securely',
      'Protect fragile items',
    ],
    warnings: ['Verify compatibility', 'Check for damaged items'],
    searchTerms: ['charger', 'case', 'screen protector', 'phone accessories'],
    commonNames: ['phone extras', 'phone gear'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-500g typical',
      material: 'Mixed materials',
    },
  },
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
      'Insurance recommended',
    ],
    warnings: [
      'Contains lithium batteries',
      'Fragile components',
      'High-value item',
    ],
    searchTerms: ['macbook', 'premium laptop', 'ultrabook'],
    brands: ['Apple', 'Dell XPS', 'HP Spectre', 'Lenovo ThinkPad'],
    specifications: {
      dimensions: '35x25x2cm typical',
      weight: '1-2kg typical',
      material: 'Aluminum/Metal construction',
    },
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
      'Secure internal components',
    ],
    warnings: [
      'Extremely fragile',
      'Heavy item',
      'Professional handling recommended',
    ],
    searchTerms: ['gaming pc', 'desktop computer', 'gaming rig'],
    brands: ['Custom Built', 'Alienware', 'ROG', 'MSI'],
    specifications: {
      dimensions: '50x25x50cm typical',
      weight: '10-20kg typical',
      material: 'Metal and tempered glass',
    },
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
      'Vertical orientation',
    ],
    warnings: ['Extremely fragile screen', 'Keep upright', 'No stacking'],
    searchTerms: ['monitor', 'display', 'screen', 'LED display'],
    brands: ['Dell', 'LG', 'Samsung', 'ASUS', 'BenQ'],
    specifications: {
      dimensions: '60x40x15cm typical',
      weight: '3-8kg typical',
      material: 'Plastic and glass construction',
    },
  },
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
      'Remove accounts',
    ],
    warnings: ['Contains lithium battery', 'Fragile screen', 'High-value item'],
    searchTerms: ['ipad pro', 'samsung tab', 'premium tablet'],
    brands: ['Apple', 'Samsung', 'Microsoft Surface'],
    specifications: {
      dimensions: '30x20x1cm typical',
      weight: '400-800g typical',
      material: 'Metal and glass construction',
    },
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
      'Bundle items securely',
    ],
    warnings: ['Check compatibility', 'Some items contain batteries'],
    searchTerms: ['stylus', 'tablet keyboard', 'tablet case', 'tablet stand'],
    brands: ['Apple Pencil', 'Logitech', 'Zagg', 'OtterBox'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-500g typical',
      material: 'Mixed materials',
    },
  },
  {
    id: 'camera_dslr',
    name: 'Professional DSLR Cameras',
    categoryId: 'electronics',
    subcategoryId: 'cameras',
    icon: FiCamera,
    riskLevel: 'very_high',
    details:
      'Professional DSLR and mirrorless cameras with interchangeable lenses',
    requirements: [
      'Original packaging required',
      'Lens protection mandatory',
      'Body cap required',
      'Sensor protection',
    ],
    warnings: [
      'Extremely sensitive equipment',
      'Contains precision optics',
      'Professional handling required',
    ],
    searchTerms: [
      'dslr',
      'mirrorless',
      'professional camera',
      'digital camera',
    ],
    brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm'],
    specifications: {
      dimensions: '16x12x10cm typical',
      weight: '800-1200g typical',
      material: 'Professional grade materials',
    },
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
      'Impact protection',
    ],
    warnings: ['Fragile optics', 'No stacking', 'Keep away from moisture'],
    searchTerms: ['camera lens', 'telephoto', 'wide angle', 'prime lens'],
    brands: ['Canon', 'Nikon', 'Sony', 'Sigma', 'Tamron'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '200-2000g typical',
      material: 'Metal and glass construction',
    },
  },
  {
    id: 'camera_accessories',
    name: 'Camera Accessories',
    categoryId: 'electronics',
    subcategoryId: 'cameras',
    icon: FiCamera,
    riskLevel: 'medium',
    details:
      'Photography accessories including tripods, filters, and memory cards',
    requirements: [
      'Original packaging preferred',
      'Secure packaging',
      'Protect delicate items',
    ],
    warnings: ['Some items fragile', 'Check for compatibility'],
    searchTerms: ['tripod', 'camera filter', 'memory card', 'camera bag'],
    brands: ['Manfrotto', 'B+W', 'SanDisk', 'Think Tank'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-2000g typical',
      material: 'Mixed materials',
    },
  },
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
      'Keep dry',
    ],
    warnings: [
      'Sensitive electronics',
      'Some contain batteries',
      'Fragile components',
    ],
    searchTerms: ['headphones', 'wireless headphones', 'noise cancelling'],
    brands: ['Sony', 'Bose', 'Sennheiser', 'Apple AirPods Max'],
    specifications: {
      dimensions: '25x20x15cm typical',
      weight: '250-400g typical',
      material: 'Premium materials',
    },
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
      'Impact protection',
    ],
    warnings: ['Contains batteries', 'Keep dry', 'Handle with care'],
    searchTerms: ['bluetooth speaker', 'wireless speaker', 'portable audio'],
    brands: ['JBL', 'Bose', 'Sony', 'Ultimate Ears'],
    specifications: {
      dimensions: '20x10x10cm typical',
      weight: '500-1000g typical',
      material: 'Durable materials',
    },
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
      'Keep dry',
    ],
    warnings: [
      'Extremely sensitive equipment',
      'Fragile components',
      'Professional setup required',
    ],
    searchTerms: ['mixer', 'microphone', 'audio interface', 'studio equipment'],
    brands: ['Shure', 'Audio-Technica', 'Roland', 'Focusrite'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-5kg typical',
      material: 'Professional grade components',
    },
  },
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
      'Dust bags included',
    ],
    warnings: ['Maintain shape', 'Protect soles', 'Keep pairs together'],
    searchTerms: ['designer shoes', 'luxury footwear', 'high-end shoes'],
    brands: ['Christian Louboutin', 'Jimmy Choo', 'Manolo Blahnik', 'Gucci'],
    specifications: {
      dimensions: '35x25x15cm typical',
      weight: '500-1500g typical',
      material: 'Premium leather and materials',
    },
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
      'Temperature control',
    ],
    warnings: ['High-value items', 'Keep dry', 'Avoid direct sunlight'],
    searchTerms: [
      'limited edition sneakers',
      'rare sneakers',
      'collectible shoes',
    ],
    brands: ['Nike', 'Adidas', 'Jordan', 'Yeezy'],
    specifications: {
      dimensions: '35x25x15cm typical',
      weight: '700-1200g typical',
      material: 'Various premium materials',
    },
  },
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
      'Special handling',
    ],
    warnings: ['Sensitive equipment', 'Maintain sterility', 'Handle with care'],
    searchTerms: ['medical equipment', 'diagnostic tools', 'medical devices'],
    brands: ['Philips', 'GE Healthcare', 'Siemens', 'Medtronic'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-50kg typical',
      material: 'Medical grade materials',
    },
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
      'Track expiry dates',
    ],
    warnings: ['Keep sterile', 'Check expiration', 'Handle with care'],
    searchTerms: [
      'first aid',
      'medical supplies',
      'bandages',
      'medical equipment',
    ],
    brands: ['3M', 'Johnson & Johnson', 'BD', 'McKesson'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-5000g typical',
      material: 'Medical grade materials',
    },
  },
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
      'Secure transport',
    ],
    warnings: [
      'Temperature sensitive',
      'Controlled substances',
      'Special permits required',
    ],
    searchTerms: ['prescription drugs', 'medication', 'pharmaceuticals'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-500g typical',
      material: 'Pharmaceutical grade packaging',
    },
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
      'Clean environment',
    ],
    warnings: [
      'Contains batteries',
      'Sensitive electronics',
      'Handle with care',
    ],
    searchTerms: ['medical device', 'health monitor', 'portable medical'],
    brands: ['Philips', 'Omron', 'ResMed', 'Medtronic'],
    specifications: {
      dimensions: '20x15x10cm typical',
      weight: '200-1000g typical',
      material: 'Medical grade materials',
    },
  },
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
      'Clean handling',
    ],
    warnings: [
      'Highly perishable',
      'Temperature sensitive',
      'Handle with care',
    ],
    searchTerms: ['fresh food', 'produce', 'fruits', 'vegetables'],
    specifications: {
      dimensions: 'Various sizes',
      weight: 'Various weights',
      material: 'Organic produce',
    },
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
      'Quick delivery',
    ],
    warnings: ['Highly perishable', 'Temperature critical', 'Handle with care'],
    searchTerms: ['dairy', 'milk products', 'fresh dairy'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-5000g typical',
      material: 'Food grade packaging',
    },
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
      'Quick delivery',
    ],
    warnings: ['Keep frozen', 'Temperature critical', 'Time sensitive'],
    searchTerms: ['frozen food', 'frozen goods', 'freezer items'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '500-5000g typical',
      material: 'Freezer-safe packaging',
    },
  },
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
      'Handle with care',
    ],
    warnings: ['Check for damage', 'Verify seals', 'Stack carefully'],
    searchTerms: ['canned food', 'packaged food', 'dry goods'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-5000g typical',
      material: 'Food grade packaging',
    },
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
      'Track expiry dates',
    ],
    warnings: [
      'Some items fragile',
      'Check packaging integrity',
      'Handle with care',
    ],
    searchTerms: ['gourmet food', 'specialty items', 'premium food'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-2000g typical',
      material: 'Premium packaging',
    },
  },
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
      'Handle with care',
    ],
    warnings: ['Protect corners', 'Avoid bending', 'Stack carefully'],
    searchTerms: ['hardcover books', 'collectors editions', 'premium books'],
    specifications: {
      dimensions: '30x25x5cm typical',
      weight: '500-2000g typical',
      material: 'Paper and binding',
    },
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
      'Professional handling',
    ],
    warnings: ['Extremely valuable', 'Handle with care', 'Climate sensitive'],
    searchTerms: ['rare books', 'antique books', 'collectible books'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '200-3000g typical',
      material: 'Various historical materials',
    },
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
      'Handle with care',
    ],
  },
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
      'Heavy item handling',
    ],
    warnings: [
      'Heavy items',
      'Multiple parts',
      'Professional assembly may be required',
    ],
    searchTerms: ['gym equipment', 'fitness gear', 'exercise machine'],
    brands: ['Life Fitness', 'Precor', 'Technogym', 'Bowflex'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '20-200kg typical',
      material: 'Steel and rubber construction',
    },
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
      'Heavy item warning',
    ],
    warnings: [
      'Extremely heavy',
      'Handle with care',
      'Use proper lifting techniques',
    ],
    searchTerms: ['weights', 'dumbbells', 'weight plates', 'free weights'],
    brands: ['Rogue Fitness', 'York', 'Eleiko', 'CAP Barbell'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '2-50kg per piece',
      material: 'Cast iron or rubber-coated',
    },
  },
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
      'Secure fastening',
    ],
    warnings: ['Fragile shafts', 'Protect club heads', 'Handle with care'],
    searchTerms: ['golf clubs', 'golf equipment', 'golf gear'],
    brands: ['Titleist', 'Callaway', 'TaylorMade', 'Ping'],
    specifications: {
      dimensions: '130x30x30cm typical',
      weight: '10-15kg typical',
      material: 'Various premium materials',
    },
  },
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
      'No bending',
    ],
    warnings: ['Keep flat', 'Avoid moisture', 'Handle with care'],
    searchTerms: ['canvas', 'painting surface', 'art supplies'],
    brands: ['Fredrix', 'Winsor & Newton', 'Masterpiece', 'Arteza'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100-2000g typical',
      material: 'Premium canvas materials',
    },
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
      'Careful handling',
    ],
    warnings: [
      'Temperature sensitive',
      'Contains pigments',
      'May require hazmat',
    ],
    searchTerms: ['paint', 'art supplies', 'professional paint'],
    brands: ['Winsor & Newton', 'Golden', 'Liquitex', 'Daniel Smith'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '50-5000g typical',
      material: 'Professional grade pigments',
    },
  },
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
      'Keep dry',
    ],
    warnings: ['Delicate bristles', 'Maintain shape', 'Handle with care'],
    searchTerms: ['art brushes', 'paint brushes', 'artist tools'],
    brands: ['Winsor & Newton', 'Da Vinci', 'Raphael', 'Escoda'],
    specifications: {
      dimensions: '15-40cm typical',
      weight: '10-100g typical',
      material: 'Natural and synthetic bristles',
    },
  },
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
      'Professional handling',
    ],
    warnings: [
      'Extremely fragile',
      'Temperature sensitive',
      'Handle with care',
    ],
    searchTerms: ['guitar', 'acoustic guitar', 'string instrument'],
    brands: ['Martin', 'Taylor', 'Gibson', 'Yamaha'],
    specifications: {
      dimensions: '110x40x15cm typical',
      weight: '2-4kg typical',
      material: 'Wood and strings',
    },
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
      'Insurance required',
    ],
    warnings: ['Extremely valuable', 'Very fragile', 'Climate sensitive'],
    searchTerms: ['violin', 'string instrument', 'classical instrument'],
    brands: ['Stradivari', 'Guarneri', 'Modern Makers'],
    specifications: {
      dimensions: '60x25x15cm typical',
      weight: '300-500g typical',
      material: 'Fine woods and strings',
    },
  },
  {
    id: 'drums_professional',
    name: 'Professional Drums',
    categoryId: 'musical_instruments',
    subcategoryId: 'percussion',
    icon: FiMusic,
    riskLevel: 'high',
    details: 'Professional drum kits and percussion sets',
  },
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
      'Careful handling',
    ],
    warnings: ['Heavy items', 'May contain oil', 'Precise handling required'],
    searchTerms: ['engine parts', 'car parts', 'auto parts'],
    brands: ['Bosch', 'Denso', 'ACDelco', 'Genuine OEM'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '1-50kg typical',
      material: 'Metal and composite materials',
    },
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
      'Careful handling',
    ],
    warnings: [
      'Static sensitive',
      'Fragile components',
      'Verify compatibility',
    ],
    searchTerms: ['car electronics', 'auto electronics', 'vehicle components'],
    brands: ['Bosch', 'Continental', 'Delphi', 'Denso'],
    specifications: {
      dimensions: 'Various sizes',
      weight: '100g-5kg typical',
      material: 'Electronic components',
    },
  },
];

export const PACKAGE_CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics & Tech',
    icon: FiSmartphone,
    description: 'Smartphones, laptops, and electronic devices',
    group: 'tech',
    displayStyle: {
      bgColor: 'bg-blue-600/10',
      iconBg: 'bg-blue-600/20',
      borderColor: 'border-blue-500/30',
    },
  },
  {
    id: 'smart_home',
    name: 'Smart Home',
    icon: FiHome,
    description: 'Smart devices, automation, and security',
    group: 'tech',
    displayStyle: {
      bgColor: 'bg-green-600/10',
      iconBg: 'bg-green-600/20',
      borderColor: 'border-green-500/30',
    },
  },
  {
    id: 'fashion',
    name: 'Fashion & Accessories',
    icon: FiShoppingBag,
    description: 'Clothing, shoes, and fashion items',
    group: 'fashion',
    displayStyle: {
      bgColor: 'bg-purple-600/10',
      iconBg: 'bg-purple-600/20',
      borderColor: 'border-purple-500/30',
    },
  },
  {
    id: 'medical',
    name: 'Medical & Health',
    icon: FiHeart,
    description: 'Medical supplies and healthcare items',
    group: 'health',
    displayStyle: {
      bgColor: 'bg-red-600/10',
      iconBg: 'bg-red-600/20',
      borderColor: 'border-red-500/30',
    },
  },
  {
    id: 'food_beverages',
    name: 'Food & Beverages',
    icon: FiPackage,
    description: 'Food items and drink products',
    group: 'food',
    displayStyle: {
      bgColor: 'bg-yellow-600/10',
      iconBg: 'bg-yellow-600/20',
      borderColor: 'border-yellow-500/30',
    },
  },
  {
    id: 'books_media',
    name: 'Books & Media',
    icon: FiBook,
    description: 'Books, magazines, and media content',
    group: 'media',
    displayStyle: {
      bgColor: 'bg-indigo-600/10',
      iconBg: 'bg-indigo-600/20',
      borderColor: 'border-indigo-500/30',
    },
  },
  {
    id: 'sports_fitness',
    name: 'Sports & Fitness',
    icon: FiActivity,
    description: 'Sports equipment and fitness gear',
    group: 'sports',
    displayStyle: {
      bgColor: 'bg-emerald-600/10',
      iconBg: 'bg-emerald-600/20',
      borderColor: 'border-emerald-500/30',
    },
  },
  {
    id: 'art_supplies',
    name: 'Art & Craft Supplies',
    icon: FiSun,
    description: 'Art materials and craft tools',
    group: 'art',
    displayStyle: {
      bgColor: 'bg-pink-600/10',
      iconBg: 'bg-pink-600/20',
      borderColor: 'border-pink-500/30',
    },
  },
  {
    id: 'musical',
    name: 'Musical Instruments',
    icon: FiMusic,
    description: 'Instruments and music equipment',
    group: 'music',
    displayStyle: {
      bgColor: 'bg-violet-600/10',
      iconBg: 'bg-violet-600/20',
      borderColor: 'border-violet-500/30',
    },
  },
  {
    id: 'automotive',
    name: 'Automotive Parts',
    icon: FiTool,
    description: 'Car parts and vehicle accessories',
    group: 'auto',
    displayStyle: {
      bgColor: 'bg-slate-600/10',
      iconBg: 'bg-slate-600/20',
      borderColor: 'border-slate-500/30',
    },
  },
  {
    id: 'home_garden',
    name: 'Home & Garden',
    icon: FiHome,
    description: 'Home decor and garden supplies',
    group: 'home',
    displayStyle: {
      bgColor: 'bg-teal-600/10',
      iconBg: 'bg-teal-600/20',
      borderColor: 'border-teal-500/30',
    },
  },
  {
    id: 'baby_kids',
    name: 'Baby & Kids',
    icon: FiHeart,
    description: 'Baby essentials and kids items',
    group: 'kids',
    displayStyle: {
      bgColor: 'bg-sky-600/10',
      iconBg: 'bg-sky-600/20',
      borderColor: 'border-sky-500/30',
    },
  },
  {
    id: 'pet_supplies',
    name: 'Pet Supplies',
    icon: FiHeart,
    description: 'Pet care and animal accessories',
    group: 'pets',
    displayStyle: {
      bgColor: 'bg-amber-600/10',
      iconBg: 'bg-amber-600/20',
      borderColor: 'border-amber-500/30',
    },
  },
  {
    id: 'office_supplies',
    name: 'Office Supplies',
    icon: FiGrid,
    description: 'Office and stationery items',
    group: 'office',
    displayStyle: {
      bgColor: 'bg-gray-600/10',
      iconBg: 'bg-gray-600/20',
      borderColor: 'border-gray-500/30',
    },
  },
  {
    id: 'tools_hardware',
    name: 'Tools & Hardware',
    icon: FiTool,
    description: 'Tools and hardware equipment',
    group: 'tools',
    displayStyle: {
      bgColor: 'bg-zinc-600/10',
      iconBg: 'bg-zinc-600/20',
      borderColor: 'border-zinc-500/30',
    },
  },
  {
    id: 'beauty_care',
    name: 'Beauty & Personal Care',
    icon: FiShoppingBag,
    description: 'Beauty and personal care items',
    group: 'beauty',
    displayStyle: {
      bgColor: 'bg-rose-600/10',
      iconBg: 'bg-rose-600/20',
      borderColor: 'border-rose-500/30',
    },
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Watches',
    icon: FiWatch,
    description: 'Jewelry and luxury timepieces',
    group: 'jewelry',
    displayStyle: {
      bgColor: 'bg-orange-600/10',
      iconBg: 'bg-orange-600/20',
      borderColor: 'border-orange-500/30',
    },
  },
  {
    id: 'industrial',
    name: 'Industrial & Scientific',
    icon: FiGrid,
    description: 'Industrial and lab equipment',
    group: 'industrial',
    displayStyle: {
      bgColor: 'bg-neutral-600/10',
      iconBg: 'bg-neutral-600/20',
      borderColor: 'border-neutral-500/30',
    },
  },
  {
    id: 'outdoor',
    name: 'Outdoor & Camping',
    icon: FiSun,
    description: 'Outdoor and camping gear',
    group: 'outdoor',
    displayStyle: {
      bgColor: 'bg-lime-600/10',
      iconBg: 'bg-lime-600/20',
      borderColor: 'border-lime-500/30',
    },
  },
  {
    id: 'living_room',
    name: 'Living Room Furniture',
    icon: FiHome,
    description: 'Living room and home furniture',
    group: 'furniture',
    displayStyle: {
      bgColor: 'bg-fuchsia-600/10',
      iconBg: 'bg-fuchsia-600/20',
      borderColor: 'border-fuchsia-500/30',
    },
  },
  {
    id: 'antique',
    name: 'Antique Furniture',
    icon: FiHome,
    description: 'Antique and vintage furniture',
    group: 'furniture',
    displayStyle: {
      bgColor: 'bg-stone-600/10',
      iconBg: 'bg-stone-600/20',
      borderColor: 'border-stone-500/30',
    },
  },
];

export const SPECIAL_HANDLING_OPTIONS = [
  {
    id: 'fragile',
    name: 'Fragile Handling',
    icon: FiAlertTriangle,
    description: 'Extra care for delicate items',
  },
  {
    id: 'temperature',
    name: 'Temperature Control',
    icon: FiThermometer,
    description: 'Climate-controlled transport',
  },
  {
    id: 'waterproof',
    name: 'Waterproof Protection',
    icon: FiDroplet,
    description: 'Protection from moisture',
  },
  {
    id: 'upright',
    name: 'Keep Upright',
    icon: FiArrowUp,
    description: 'Maintain vertical orientation',
  },
];

export const PACKAGE_RESPONSIBILITIES = [
  {
    id: 'insurance',
    name: 'Package Insurance',
    icon: FiShield,
    description: 'Coverage for loss or damage',
  },
  {
    id: 'tracking',
    name: 'Real-time Tracking',
    icon: FiMap,
    description: 'Live location updates',
  },
  {
    id: 'signature',
    name: 'Signature Required',
    icon: FiEdit,
    description: 'Proof of delivery',
  },
  {
    id: 'photo',
    name: 'Photo Documentation',
    icon: FiCamera,
    description: 'Visual condition record',
  },
];
