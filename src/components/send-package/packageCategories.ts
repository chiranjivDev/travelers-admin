export interface SubCategory {
  id: string;
  name: string;
  description?: string;  // Optional description for additional guidance
}

export interface Category {
  id: string;
  name: string;
  description?: string;  // Optional description for additional guidance
  subcategories: SubCategory[];
}

export const packageCategories: Category[] = [
  {
    id: "other",
    name: "Other / Special Items",
    description: "Can't find your category? Select this option and provide details about your item. Our team will assist you with proper handling.",
    subcategories: [
      { 
        id: "custom_item", 
        name: "Custom Item",
        description: "Describe your item in detail. Include dimensions, weight, and any special handling requirements."
      },
      { 
        id: "unique", 
        name: "Unique / One-of-a-kind Item",
        description: "For items that don't fit standard categories. Please provide detailed information for proper handling."
      },
      { 
        id: "mixed", 
        name: "Mixed Items",
        description: "For packages containing multiple different types of items."
      }
    ]
  },
  {
    id: "electronics",
    name: "Electronics",
    subcategories: [
      { id: "smartphones", name: "Smartphones & Tablets" },
      { id: "laptops", name: "Laptops & Computers" },
      { id: "cameras", name: "Cameras & Photography Equipment" },
      { id: "audio", name: "Audio Equipment" },
      { id: "gaming", name: "Gaming Consoles & Accessories" },
      { id: "tv", name: "TVs & Monitors" },
      { id: "wearables", name: "Smartwatches & Wearables" },
      { id: "accessories", name: "Electronic Accessories" },
      { id: "printers", name: "Printers & Scanners" },
      { id: "networking", name: "Networking Equipment" },
      { id: "components", name: "Computer Components" },
      { id: "drones", name: "Drones & RC Devices" },
      { id: "security", name: "Security Equipment" },
      { id: "office", name: "Office Electronics" },
      { 
        id: "other_electronics", 
        name: "Other Electronics",
        description: "For electronic items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "clothing",
    name: "Clothing & Fashion",
    subcategories: [
      { id: "mens", name: "Men's Clothing" },
      { id: "womens", name: "Women's Clothing" },
      { id: "kids", name: "Children's Clothing" },
      { id: "shoes", name: "Shoes & Footwear" },
      { id: "bags", name: "Bags & Luggage" },
      { id: "accessories", name: "Fashion Accessories" },
      { id: "jewelry", name: "Jewelry & Watches" },
      { id: "sportswear", name: "Sportswear & Athletic Gear" },
      { id: "formal", name: "Formal Wear" },
      { id: "vintage", name: "Vintage Clothing" },
      { id: "designer", name: "Designer Items" },
      { id: "costumes", name: "Costumes & Special Wear" },
      { id: "uniforms", name: "Uniforms & Work Wear" },
      { id: "maternity", name: "Maternity Clothing" },
      { 
        id: "other_clothing", 
        name: "Other Clothing",
        description: "For clothing items not listed above. Please specify the type and any special care requirements."
      }
    ]
  },
  {
    id: "home",
    name: "Home & Living",
    subcategories: [
      { id: "furniture", name: "Furniture & Decor" },
      { id: "kitchen", name: "Kitchen & Dining" },
      { id: "appliances", name: "Home Appliances" },
      { id: "bedding", name: "Bedding & Bath" },
      { id: "lighting", name: "Lighting & Fixtures" },
      { id: "storage", name: "Storage & Organization" },
      { id: "garden", name: "Garden & Outdoor" },
      { id: "tools", name: "Tools & Home Improvement" },
      { id: "rugs", name: "Rugs & Carpets" },
      { id: "curtains", name: "Curtains & Window Treatments" },
      { id: "artwork", name: "Wall Art & Decor" },
      { id: "cleaning", name: "Cleaning Supplies" },
      { id: "seasonal", name: "Seasonal Decor" },
      { id: "bathroom", name: "Bathroom Fixtures" },
      { id: "safety", name: "Home Safety & Security" },
      { 
        id: "other_home", 
        name: "Other Home Items",
        description: "For home items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "books",
    name: "Books & Media",
    subcategories: [
      { id: "books", name: "Books & Textbooks" },
      { id: "magazines", name: "Magazines & Periodicals" },
      { id: "music", name: "Music & Vinyl Records" },
      { id: "movies", name: "Movies & TV Shows" },
      { id: "games", name: "Video Games & Software" },
      { id: "instruments", name: "Musical Instruments" },
      { id: "art", name: "Art Supplies" },
      { id: "collectibles", name: "Collectibles & Memorabilia" },
      { id: "rare_books", name: "Rare & Antique Books" },
      { id: "sheet_music", name: "Sheet Music" },
      { id: "educational", name: "Educational Materials" },
      { id: "comics", name: "Comics & Graphic Novels" },
      { id: "audiobooks", name: "Audiobooks" },
      { id: "manuscripts", name: "Manuscripts & Documents" },
      { id: "maps", name: "Maps & Atlases" },
      { 
        id: "other_books", 
        name: "Other Books & Media",
        description: "For books and media items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "business",
    name: "Business & Professional",
    subcategories: [
      { id: "office", name: "Office Supplies" },
      { id: "printing", name: "Printing Materials" },
      { id: "packaging", name: "Packaging Supplies" },
      { id: "legal", name: "Legal Documents" },
      { id: "marketing", name: "Marketing Materials" },
      { id: "trade_show", name: "Trade Show Equipment" },
      { id: "retail", name: "Retail Supplies" },
      { id: "industrial", name: "Industrial Equipment" },
      { id: "medical", name: "Medical Supplies" },
      { id: "laboratory", name: "Laboratory Equipment" },
      { id: "safety", name: "Safety Equipment" },
      { id: "uniforms", name: "Professional Uniforms" },
      { id: "signage", name: "Signs & Displays" },
      { id: "shipping", name: "Shipping Supplies" },
      { id: "storage", name: "Storage Solutions" },
      { 
        id: "other_business", 
        name: "Other Business Items",
        description: "For business items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "art",
    name: "Art & Collectibles",
    subcategories: [
      { id: "fine_art", name: "Fine Art" },
      { id: "sculptures", name: "Sculptures" },
      { id: "antiques", name: "Antiques" },
      { id: "pottery", name: "Pottery & Ceramics" },
      { id: "prints", name: "Prints & Photographs" },
      { id: "glass", name: "Glass Art" },
      { id: "textiles", name: "Textiles & Fiber Art" },
      { id: "coins", name: "Coins & Currency" },
      { id: "stamps", name: "Stamps" },
      { id: "memorabilia", name: "Sports Memorabilia" },
      { id: "vintage", name: "Vintage Items" },
      { id: "folk_art", name: "Folk Art" },
      { id: "crafts", name: "Handmade Crafts" },
      { id: "jewelry", name: "Art Jewelry" },
      { id: "installations", name: "Art Installations" },
      { 
        id: "other_art", 
        name: "Other Art & Collectibles",
        description: "For art and collectibles items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "sports",
    name: "Sports & Recreation",
    subcategories: [
      { id: "equipment", name: "Sports Equipment" },
      { id: "fitness", name: "Fitness Gear" },
      { id: "camping", name: "Camping & Hiking" },
      { id: "bikes", name: "Bikes & Cycling" },
      { id: "water", name: "Water Sports" },
      { id: "winter", name: "Winter Sports" },
      { id: "team", name: "Team Sports" },
      { id: "golf", name: "Golf Equipment" },
      { id: "fishing", name: "Fishing Gear" },
      { id: "hunting", name: "Hunting Equipment" },
      { id: "martial", name: "Martial Arts" },
      { id: "climbing", name: "Climbing Gear" },
      { id: "skating", name: "Skating & Boarding" },
      { id: "exercise", name: "Exercise Equipment" },
      { id: "accessories", name: "Sports Accessories" },
      { 
        id: "other_sports", 
        name: "Other Sports & Recreation",
        description: "For sports and recreation items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "automotive",
    name: "Automotive & Parts",
    subcategories: [
      { id: "parts", name: "Auto Parts" },
      { id: "accessories", name: "Car Accessories" },
      { id: "tools", name: "Automotive Tools" },
      { id: "tires", name: "Tires & Wheels" },
      { id: "electronics", name: "Car Electronics" },
      { id: "maintenance", name: "Maintenance Items" },
      { id: "exterior", name: "Exterior Accessories" },
      { id: "interior", name: "Interior Accessories" },
      { id: "motorcycle", name: "Motorcycle Parts" },
      { id: "rv", name: "RV & Camper Parts" },
      { id: "boat", name: "Boat Parts" },
      { id: "performance", name: "Performance Parts" },
      { id: "vintage", name: "Vintage Auto Parts" },
      { id: "commercial", name: "Commercial Vehicle Parts" },
      { id: "safety", name: "Safety Equipment" },
      { 
        id: "other_automotive", 
        name: "Other Automotive & Parts",
        description: "For automotive and parts items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "fragile",
    name: "Fragile & Specialty",
    subcategories: [
      { id: "glass", name: "Glass & Crystal" },
      { id: "antiques", name: "Antiques" },
      { id: "artwork", name: "Artwork" },
      { id: "instruments", name: "Musical Instruments" },
      { id: "ceramics", name: "Ceramics & Pottery" },
      { id: "china", name: "Fine China" },
      { id: "scientific", name: "Scientific Equipment" },
      { id: "medical", name: "Medical Equipment" },
      { id: "electronics", name: "Sensitive Electronics" },
      { id: "optics", name: "Optical Equipment" },
      { id: "collectibles", name: "Delicate Collectibles" },
      { id: "vintage", name: "Vintage Items" },
      { id: "sculptures", name: "Sculptures" },
      { id: "lighting", name: "Lighting Fixtures" },
      { id: "other", name: "Other Fragile Items" },
      { 
        id: "other_fragile", 
        name: "Other Fragile & Specialty",
        description: "For fragile and specialty items not listed above. Please specify the type and any special handling needs."
      }
    ]
  },
  {
    id: "industrial",
    name: "Industrial & Manufacturing",
    subcategories: [
      { id: "machinery", name: "Industrial Machinery" },
      { id: "tools", name: "Power Tools" },
      { id: "materials", name: "Raw Materials" },
      { id: "electrical", name: "Electrical Equipment" },
      { id: "construction", name: "Construction Equipment" },
      { id: "safety", name: "Safety Equipment" },
      { id: "hardware", name: "Hardware & Fasteners" },
      { id: "plumbing", name: "Plumbing Supplies" },
      { id: "hvac", name: "HVAC Equipment" },
      { id: "welding", name: "Welding Equipment" },
      { id: "packaging", name: "Packaging Equipment" },
      { id: "material_handling", name: "Material Handling" },
      { id: "automation", name: "Automation Equipment" },
      { id: "measuring", name: "Measuring & Testing" },
      { id: "spare_parts", name: "Spare Parts" },
      { 
        id: "other_industrial", 
        name: "Other Industrial & Manufacturing",
        description: "For industrial and manufacturing items not listed above. Please specify the type and any special handling needs."
      }
    ]
  }
];

// Helper type for form validation and processing "Other" selections
export interface OtherItemDetails {
  category: string;
  subcategory: string;
  customDescription: string;
  specialHandling: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
}

export const packageSizes = [
  { id: "xs", name: "Extra Small", description: "Fits in an envelope", maxWeight: 0.5 },
  { id: "s", name: "Small", description: "Fits in a shoebox", maxWeight: 2 },
  { id: "m", name: "Medium", description: "Fits in a backpack", maxWeight: 5 },
  { id: "l", name: "Large", description: "Fits in a suitcase", maxWeight: 20 },
  { id: "xl", name: "Extra Large", description: "Requires special handling", maxWeight: 50 }
];

export const packagePriorities = [
  { id: "regular", name: "Regular", description: "Standard delivery time", priceMultiplier: 1 },
  { id: "express", name: "Express", description: "Faster delivery", priceMultiplier: 1.5 },
  { id: "urgent", name: "Urgent", description: "Priority handling", priceMultiplier: 2 }
];

export const specialHandling = [
  { id: "fragile", name: "Fragile", icon: "🥚" },
  { id: "temperature", name: "Temperature Sensitive", icon: "🌡️" },
  { id: "liquid", name: "Liquid", icon: "💧" },
  { id: "valuable", name: "High Value", icon: "💎" },
  { id: "sensitive", name: "Sensitive Documents", icon: "🔒" }
];
