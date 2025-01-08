export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const packageCategories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    subcategories: [
      { id: "smartphones", name: "Smartphones" },
      { id: "laptops", name: "Laptops & Computers" },
      { id: "tablets", name: "Tablets" },
      { id: "cameras", name: "Cameras & Photography" },
      { id: "gaming", name: "Gaming Consoles" },
      { id: "audio", name: "Audio Equipment" },
      { id: "tv", name: "TVs & Monitors" },
      { id: "wearables", name: "Wearable Technology" }
    ]
  },
  {
    id: "clothing",
    name: "Clothing & Accessories",
    subcategories: [
      { id: "mens", name: "Men's Clothing" },
      { id: "womens", name: "Women's Clothing" },
      { id: "kids", name: "Children's Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "bags", name: "Bags & Luggage" },
      { id: "jewelry", name: "Jewelry" },
      { id: "watches", name: "Watches" }
    ]
  },
  {
    id: "home",
    name: "Home & Living",
    subcategories: [
      { id: "furniture", name: "Furniture" },
      { id: "decor", name: "Home Decor" },
      { id: "kitchen", name: "Kitchen & Dining" },
      { id: "bedding", name: "Bedding & Bath" },
      { id: "appliances", name: "Home Appliances" }
    ]
  },
  {
    id: "books",
    name: "Books & Media",
    subcategories: [
      { id: "books", name: "Books" },
      { id: "magazines", name: "Magazines" },
      { id: "music", name: "Music CDs & Vinyl" },
      { id: "movies", name: "Movies & TV Shows" }
    ]
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    subcategories: [
      { id: "equipment", name: "Sports Equipment" },
      { id: "clothing", name: "Athletic Clothing" },
      { id: "outdoor", name: "Outdoor Gear" },
      { id: "fitness", name: "Fitness Equipment" }
    ]
  },
  {
    id: "art",
    name: "Art & Collectibles",
    subcategories: [
      { id: "paintings", name: "Paintings" },
      { id: "sculptures", name: "Sculptures" },
      { id: "prints", name: "Art Prints" },
      { id: "collectibles", name: "Collectible Items" }
    ]
  },
  {
    id: "documents",
    name: "Documents & Papers",
    subcategories: [
      { id: "legal", name: "Legal Documents" },
      { id: "business", name: "Business Documents" },
      { id: "certificates", name: "Certificates" },
      { id: "contracts", name: "Contracts" }
    ]
  }
];
