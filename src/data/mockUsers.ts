export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: 'sender' | 'traveler'
  rating: number
  reviewCount: number
  completedTrips: number
  isVerified: boolean
  isSuperTraveler?: boolean
  languages?: string[]
  memberSince: string
  about?: string
  stats: {
    responseTime: string
    successRate: number
    completedTrips: number
  }
}

export const MOCK_USERS: User[] = [
  {
    id: 'testsender',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: null,
    role: 'sender',
    rating: 4.8,
    reviewCount: 12,
    completedTrips: 8,
    isVerified: true,
    memberSince: 'Jan 2023',
    stats: {
      responseTime: '< 1 hour',
      successRate: 100,
      completedTrips: 8
    }
  },
  {
    id: 'testtraveler',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: null,
    role: 'traveler',
    rating: 4.9,
    reviewCount: 24,
    completedTrips: 15,
    isVerified: true,
    isSuperTraveler: true,
    languages: ['English', 'French', 'Spanish'],
    memberSince: 'Dec 2022',
    about: 'Frequent traveler between London and Paris. I help people deliver their packages safely and on time.',
    stats: {
      responseTime: '< 30 mins',
      successRate: 98,
      completedTrips: 15
    }
  },
  {
    id: 'traveler2',
    name: 'David Chen',
    email: 'david@example.com',
    avatar: null,
    role: 'traveler',
    rating: 4.7,
    reviewCount: 18,
    completedTrips: 12,
    isVerified: true,
    languages: ['English', 'Mandarin'],
    memberSince: 'Mar 2023',
    about: 'Business traveler making weekly trips between major European cities.',
    stats: {
      responseTime: '< 2 hours',
      successRate: 95,
      completedTrips: 12
    }
  },
  {
    id: 'sender2',
    name: 'Emma Brown',
    email: 'emma@example.com',
    avatar: null,
    role: 'sender',
    rating: 4.6,
    reviewCount: 7,
    completedTrips: 5,
    isVerified: true,
    memberSince: 'Apr 2023',
    stats: {
      responseTime: '< 3 hours',
      successRate: 100,
      completedTrips: 5
    }
  }
]
