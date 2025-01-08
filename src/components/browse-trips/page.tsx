'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Trip {
  id: number
  traveler: string
  from: string
  to: string
  date: string
  price: number
  rating: number
  reviews: number
  capacity: string
  requests: number
}

export default function BrowseTrips() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'price' | 'rating'>('all')
  const [showPostTripForm, setShowPostTripForm] = useState(false)
  const [newTrip, setNewTrip] = useState({
    from: '',
    to: '',
    date: '',
    price: '',
    capacity: ''
  })

  // Mock data for trips
  const trips: Trip[] = [
    {
      id: 1,
      traveler: "John Doe",
      from: "New York",
      to: "Los Angeles",
      date: "2024-02-15",
      price: 50,
      rating: 4.8,
      reviews: 156,
      capacity: "Medium",
      requests: 2
    },
    {
      id: 2,
      traveler: "Jane Smith",
      from: "San Francisco",
      to: "Chicago",
      date: "2024-02-18",
      price: 45,
      rating: 4.9,
      reviews: 203,
      capacity: "Large",
      requests: 1
    },
    {
      id: 3,
      traveler: "Mike Johnson",
      from: "Miami",
      to: "Boston",
      date: "2024-02-20",
      price: 55,
      rating: 4.7,
      reviews: 89,
      capacity: "Small",
      requests: 0
    }
  ]

  const handlePostTrip = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle trip posting logic here
    setShowPostTripForm(false)
  }

  const filteredTrips = trips
    .filter(trip => 
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedFilter === 'price') return a.price - b.price
      if (selectedFilter === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Post Trip Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Browse Trips</h1>
          <button
            onClick={() => setShowPostTripForm(true)}
            className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all"
          >
            Post a Trip
          </button>
        </div>

        {/* Post Trip Form Modal */}
        {showPostTripForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl max-w-lg w-full mx-4">
              <h2 className="text-2xl font-bold mb-6">Post a New Trip</h2>
              <form onSubmit={handlePostTrip} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <input
                    type="text"
                    value={newTrip.from}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Origin city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <input
                    type="text"
                    value={newTrip.to}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Destination city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={newTrip.date}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Available Capacity</label>
                  <select
                    value={newTrip.capacity}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select capacity</option>
                    <option value="Small">Small (fits in a backpack)</option>
                    <option value="Medium">Medium (fits in a suitcase)</option>
                    <option value="Large">Large (requires extra space)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (per package)</label>
                  <input
                    type="number"
                    value={newTrip.price}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price in USD"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPostTripForm(false)}
                    className="flex-1 px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Post Trip
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-12">
          <motion.div 
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              placeholder="Search by location..."
              className="w-full md:w-96 px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800/50 hover:bg-gray-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('price')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedFilter === 'price' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800/50 hover:bg-gray-800'
                }`}
              >
                Price
              </button>
              <button
                onClick={() => setSelectedFilter('rating')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedFilter === 'rating' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800/50 hover:bg-gray-800'
                }`}
              >
                Rating
              </button>
            </div>
          </motion.div>
        </div>

        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <motion.div
              key={trip.id}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{trip.traveler}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{trip.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{trip.reviews} reviews</span>
                  </div>
                </div>
                <span className="text-xl font-bold">${trip.price}</span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="flex items-center">
                  <span className="w-20 text-gray-400">From:</span>
                  {trip.from}
                </p>
                <p className="flex items-center">
                  <span className="w-20 text-gray-400">To:</span>
                  {trip.to}
                </p>
                <p className="flex items-center">
                  <span className="w-20 text-gray-400">Date:</span>
                  {trip.date}
                </p>
                <p className="flex items-center">
                  <span className="w-20 text-gray-400">Capacity:</span>
                  {trip.capacity}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{trip.requests} package requests</span>
                <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
