import { MOCK_USERS } from './mockUsers'

export interface Package {
  id: string
  sender: {
    id: string
    name: string
    avatar: string | null
    rating: number
    reviewCount: number
  }
  origin: string
  destination: string
  date: string
  price: number
  weight: number
  dimensions: string
  description: string
  category?: string
  insurance?: boolean
  priority?: boolean
  tracking?: boolean
  specialInstructions?: string
  photos?: string[]
  status: 'pending' | 'accepted' | 'in_transit' | 'delivered'
}

export const MOCK_PACKAGES: Package[] = [
  {
    id: 'pkg-123',
    sender: {
      id: MOCK_USERS[0].id,
      name: MOCK_USERS[0].name,
      avatar: MOCK_USERS[0].avatar,
      rating: MOCK_USERS[0].rating,
      reviewCount: MOCK_USERS[0].reviewCount
    },
    origin: 'London, UK',
    destination: 'Paris, France',
    date: '2024-01-15',
    price: 50,
    weight: 2.5,
    dimensions: '30x20x15 cm',
    description: 'Small electronics package, handle with care',
    category: 'Electronics',
    insurance: true,
    priority: true,
    tracking: true,
    specialInstructions: 'Please keep away from water',
    photos: [
      'https://picsum.photos/seed/pkg1/300/200',
      'https://picsum.photos/seed/pkg2/300/200'
    ],
    status: 'pending'
  },
  {
    id: 'pkg-1',
    sender: {
      id: MOCK_USERS[0].id,
      name: MOCK_USERS[0].name,
      avatar: MOCK_USERS[0].avatar,
      rating: MOCK_USERS[0].rating,
      reviewCount: MOCK_USERS[0].reviewCount
    },
    origin: 'San Francisco',
    destination: 'New York',
    date: '2024-02-15',
    price: 120,
    weight: 5.5,
    dimensions: '40x30x20 cm',
    description: 'Gaming console with accessories. Must be handled with care. Temperature-sensitive electronics.',
    category: 'Electronics',
    photos: ['console1.jpg', 'console2.jpg'],
    status: 'pending'
  },
  {
    id: 'pkg-2',
    sender: {
      id: MOCK_USERS[1].id,
      name: MOCK_USERS[1].name,
      avatar: MOCK_USERS[1].avatar,
      rating: MOCK_USERS[1].rating,
      reviewCount: MOCK_USERS[1].reviewCount
    },
    origin: 'Los Angeles',
    destination: 'Chicago',
    date: '2024-02-18',
    price: 80,
    weight: 2.0,
    dimensions: '25x20x15 cm',
    description: 'Important business documents. Must be kept secure and dry.',
    category: 'Documents',
    specialInstructions: 'Waterproof packaging',
    status: 'pending'
  },
  {
    id: 'pkg-3',
    sender: {
      id: MOCK_USERS[2].id,
      name: MOCK_USERS[2].name,
      avatar: MOCK_USERS[2].avatar,
      rating: MOCK_USERS[2].rating,
      reviewCount: MOCK_USERS[2].reviewCount
    },
    origin: 'Miami',
    destination: 'Boston',
    date: '2024-02-20',
    price: 250,
    weight: 15.0,
    dimensions: '70x50x40 cm',
    description: 'Original artwork, framed and packaged. Extremely fragile. Must be handled with utmost care.',
    category: 'Art',
    photos: ['artwork1.jpg', 'artwork2.jpg'],
    specialInstructions: 'Professional art handling',
    status: 'pending'
  }
]
