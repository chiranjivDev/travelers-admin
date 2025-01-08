import { StaticImageData } from 'next/image'
import { User, MOCK_USERS } from './mockUsers'

export interface TravelerVerification {
  isIdVerified: boolean
  isPhoneVerified: boolean
  isEmailVerified: boolean
  isAddressVerified: boolean
}

export interface TravelerPreferences {
  packageTypes: string[]
  maxWeight: number
  maxSize: string
  restrictions: string[]
  insurance: {
    available: boolean
    coverage: number
    price: number
  }
}

export interface TravelerTrip {
  id: string
  traveler: {
    id: string
    name: string
    avatar: string
    rating: number
    reviewCount: number
    completedTrips: number
    isSuperTraveler: boolean
    verification: TravelerVerification
    responseRate: number
    memberSince: string
    languages: string[]
  }
  route: {
    from: string
    to: string
    stops: string[]
    flexibility: number
  }
  alternativeDestinations?: {
    city: string
    extraCharge?: number
    estimatedTime?: string
  }[]
  extraServices: {
    localDelivery: boolean
    customsClearance: boolean
    packaging: boolean
    insurance: boolean
  }
  schedule: {
    departureDate: string
    arrivalDate: string
    flexibleDates: boolean
    timeWindow: string
  }
  capacity: {
    size: 'Small' | 'Medium' | 'Large'
    maxWeight: number
    availableSpace: number
    restrictions: string[]
  }
  pricing: {
    basePrice: number
    pricePerKg: number
    insurance: number
    priority: number
    tracking: number
    currency: string
  }
  preferences: TravelerPreferences
  stats: {
    packageRequests: number
    responseTime: string
    acceptanceRate: number
  }
  description?: string
}

export interface TripDetails {
  id: string
  traveler: {
    id: string
    name: string
    avatar: string | null
    rating: number
    reviewCount: number
    isVerified: boolean
    isSuperTraveler?: boolean
  }
  route: {
    from: string
    to: string
    stops?: string[]
  }
  dates: {
    departure: string
    arrival: string
    flexibility: number
  }
  capacity: {
    available: number
    booked: number
  }
  preferences: {
    maxWeight: number
    acceptedTypes: string[]
    restrictions: string[]
  }
  pricing: {
    base: number
    perKg: number
    insurance: number
    express: number
  }
  description?: string
  stats: {
    responseTime: string
    successRate: number
    completedTrips: number
  }
}

export const mockTrips: TravelerTrip[] = [
  {
    id: 'trip1',
    traveler: {
      id: 'traveler1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      rating: 4.8,
      reviewCount: 156,
      completedTrips: 45,
      isSuperTraveler: false,
      verification: {
        isIdVerified: true,
        isPhoneVerified: true,
        isEmailVerified: true,
        isAddressVerified: true
      },
      responseRate: 98,
      memberSince: '2023-01',
      languages: ['English', 'Spanish']
    },
    route: {
      from: 'New York',
      to: 'Los Angeles',
      stops: ['Chicago', 'Denver'],
      flexibility: 2
    },
    alternativeDestinations: [
      {
        city: 'San Diego',
        extraCharge: 10,
        estimatedTime: '+1 hour'
      },
      {
        city: 'San Jose',
        extraCharge: 15,
        estimatedTime: '+2 hours'
      }
    ],
    extraServices: {
      localDelivery: true,
      customsClearance: false,
      packaging: true,
      insurance: true
    },
    schedule: {
      departureDate: '2024-02-15',
      arrivalDate: '2024-02-17',
      flexibleDates: true,
      timeWindow: '9:00 AM - 6:00 PM'
    },
    capacity: {
      size: 'Medium',
      maxWeight: 20,
      availableSpace: 15,
      restrictions: ['No liquids', 'No perishables']
    },
    pricing: {
      basePrice: 50,
      pricePerKg: 2,
      insurance: 5,
      priority: 10,
      tracking: 3,
      currency: 'USD'
    },
    preferences: {
      packageTypes: ['Electronics', 'Documents', 'Clothing'],
      maxWeight: 20,
      maxSize: '60x40x30 cm',
      restrictions: ['No dangerous goods', 'No food items'],
      insurance: {
        available: true,
        coverage: 1000,
        price: 5
      }
    },
    stats: {
      packageRequests: 2,
      responseTime: '< 1 hour',
      acceptanceRate: 95
    },
    description: 'Regular traveler between New York and Los Angeles. Can deliver to nearby cities for an additional fee.'
  },
  {
    id: 'trip2',
    traveler: {
      id: 'traveler2',
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      rating: 4.9,
      reviewCount: 203,
      completedTrips: 67,
      isSuperTraveler: true,
      verification: {
        isIdVerified: true,
        isPhoneVerified: true,
        isEmailVerified: true,
        isAddressVerified: true
      },
      responseRate: 100,
      memberSince: '2022-11',
      languages: ['English', 'French', 'German']
    },
    route: {
      from: 'San Francisco',
      to: 'Chicago',
      stops: ['Las Vegas', 'Denver'],
      flexibility: 1
    },
    alternativeDestinations: [
      {
        city: 'Milwaukee',
        extraCharge: 15,
        estimatedTime: '+2 hours'
      },
      {
        city: 'Detroit',
        extraCharge: 25,
        estimatedTime: '+4 hours'
      },
      {
        city: 'Indianapolis',
        extraCharge: 20,
        estimatedTime: '+3 hours'
      }
    ],
    extraServices: {
      localDelivery: true,
      customsClearance: false,
      packaging: true,
      insurance: true
    },
    schedule: {
      departureDate: '2024-02-18',
      arrivalDate: '2024-02-19',
      flexibleDates: false,
      timeWindow: '8:00 AM - 8:00 PM'
    },
    capacity: {
      size: 'Large',
      maxWeight: 30,
      availableSpace: 25,
      restrictions: ['No fragile items']
    },
    pricing: {
      basePrice: 45,
      pricePerKg: 1.5,
      insurance: 5,
      priority: 10,
      tracking: 3,
      currency: 'USD'
    },
    preferences: {
      packageTypes: ['Electronics', 'Documents', 'Clothing', 'Books'],
      maxWeight: 30,
      maxSize: '80x60x40 cm',
      restrictions: ['No dangerous goods'],
      insurance: {
        available: true,
        coverage: 2000,
        price: 8
      }
    },
    stats: {
      packageRequests: 1,
      responseTime: '< 30 minutes',
      acceptanceRate: 98
    },
    description: 'Regular traveler between San Francisco and Chicago. Can deliver to nearby cities for an additional fee. Experienced in handling fragile items and providing local delivery services.'
  },
  {
    id: 'trip3',
    traveler: {
      id: 'traveler3',
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      rating: 4.7,
      reviewCount: 89,
      completedTrips: 23,
      isSuperTraveler: false,
      verification: {
        isIdVerified: true,
        isPhoneVerified: true,
        isEmailVerified: true,
        isAddressVerified: false
      },
      responseRate: 92,
      memberSince: '2023-06',
      languages: ['English', 'Italian']
    },
    route: {
      from: 'Miami',
      to: 'Boston',
      stops: ['Atlanta', 'New York'],
      flexibility: 3
    },
    alternativeDestinations: [
      {
        city: 'Providence',
        extraCharge: 10,
        estimatedTime: '+1 hour'
      },
      {
        city: 'Hartford',
        extraCharge: 15,
        estimatedTime: '+2 hours'
      }
    ],
    extraServices: {
      localDelivery: true,
      customsClearance: false,
      packaging: true,
      insurance: true
    },
    schedule: {
      departureDate: '2024-02-20',
      arrivalDate: '2024-02-22',
      flexibleDates: true,
      timeWindow: '10:00 AM - 7:00 PM'
    },
    capacity: {
      size: 'Small',
      maxWeight: 10,
      availableSpace: 8,
      restrictions: ['No liquids', 'No electronics']
    },
    pricing: {
      basePrice: 55,
      pricePerKg: 3,
      insurance: 5,
      priority: 10,
      tracking: 3,
      currency: 'USD'
    },
    preferences: {
      packageTypes: ['Documents', 'Clothing', 'Accessories'],
      maxWeight: 10,
      maxSize: '40x30x20 cm',
      restrictions: ['No dangerous goods', 'No electronics'],
      insurance: {
        available: true,
        coverage: 500,
        price: 3
      }
    },
    stats: {
      packageRequests: 0,
      responseTime: '< 2 hours',
      acceptanceRate: 90
    },
    description: 'Regular traveler between Miami and Boston. Can deliver to nearby cities for an additional fee.'
  },
  {
    id: 'trip-123',
    traveler: {
      id: MOCK_USERS[1].id,
      name: MOCK_USERS[1].name,
      avatar: MOCK_USERS[1].avatar,
      rating: MOCK_USERS[1].rating,
      reviewCount: MOCK_USERS[1].reviewCount
    },
    route: {
      from: 'London, UK',
      to: 'Paris, France',
      stops: ['Brussels, Belgium']
    },
    alternativeDestinations: undefined,
    extraServices: {
      localDelivery: true,
      customsClearance: false,
      packaging: true,
      insurance: true
    },
    schedule: {
      departureDate: '2024-01-15',
      arrivalDate: '2024-01-16',
      flexibleDates: false,
      timeWindow: '9:00 AM - 6:00 PM'
    },
    capacity: {
      size: 'Medium',
      maxWeight: 10,
      availableSpace: 8,
      restrictions: ['No liquids', 'No perishables']
    },
    pricing: {
      basePrice: 30,
      pricePerKg: 5,
      insurance: 10,
      priority: 20,
      tracking: 3,
      currency: 'USD'
    },
    preferences: {
      packageTypes: ['Electronics', 'Documents', 'Clothing'],
      maxWeight: 10,
      maxSize: '50x50x50 cm',
      restrictions: ['No dangerous goods', 'No food items'],
      insurance: {
        available: true,
        coverage: 1000,
        price: 5
      }
    },
    stats: {
      packageRequests: 2,
      responseTime: '< 1 hour',
      acceptanceRate: 95
    },
    description: 'Test trip from our test traveler.'
  }
]

export const MOCK_TRIPS: TripDetails[] = [
  {
    id: 'trip1',
    traveler: {
      id: 'testtraveler',
      name: 'Sarah Wilson',
      avatar: null,
      rating: 4.9,
      reviewCount: 24,
      isVerified: true,
      isSuperTraveler: true
    },
    route: {
      from: 'London',
      to: 'Paris',
      stops: ['Dover', 'Calais']
    },
    dates: {
      departure: '2024-01-15',
      arrival: '2024-01-15',
      flexibility: 1
    },
    capacity: {
      available: 15,
      booked: 5
    },
    preferences: {
      maxWeight: 20,
      acceptedTypes: ['Electronics', 'Documents', 'Clothing'],
      restrictions: ['Liquids', 'Perishables']
    },
    pricing: {
      base: 30,
      perKg: 5,
      insurance: 10,
      express: 20
    },
    description: 'Regular trip from London to Paris. Can accommodate various package sizes.',
    stats: {
      responseTime: '< 30 mins',
      successRate: 98,
      completedTrips: 15
    }
  },
  {
    id: 'trip2',
    traveler: {
      id: 'traveler2',
      name: 'David Chen',
      avatar: null,
      rating: 4.7,
      reviewCount: 18,
      isVerified: true
    },
    route: {
      from: 'Berlin',
      to: 'Amsterdam'
    },
    dates: {
      departure: '2024-01-20',
      arrival: '2024-01-20',
      flexibility: 2
    },
    capacity: {
      available: 10,
      booked: 0
    },
    preferences: {
      maxWeight: 15,
      acceptedTypes: ['Documents', 'Small Electronics', 'Gifts'],
      restrictions: ['Fragile Items']
    },
    pricing: {
      base: 25,
      perKg: 4,
      insurance: 8,
      express: 15
    },
    description: 'Business trip with space for small to medium packages.',
    stats: {
      responseTime: '< 2 hours',
      successRate: 95,
      completedTrips: 12
    }
  }
]
