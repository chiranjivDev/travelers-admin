'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiStar,
  FiCalendar,
  FiMapPin,
  FiPackage,
  FiDollarSign,
  FiMessageSquare,
  FiSearch,
} from 'react-icons/fi';
import Modal from '../admin/Modal';
const mockTravelers = [
  {
    id: 1,
    name: 'Alice Smith',
    photo: null,
    rating: 4.8,
    trips: 45,
    verified: true,
    route: {
      from: 'New York, USA',
      to: 'London, UK',
      date: '2024-02-01',
      capacity: '20kg',
      price: 15,
    },
    languages: ['English', 'French'],
    joinDate: '2023-01-15',
    lastActive: '2024-01-20',
    reviews: [
      {
        user: 'John Doe',
        rating: 5,
        comment: 'Very professional and punctual delivery.',
        date: '2024-01-15',
      },
    ],
  },
  {
    id: 2,
    name: 'Bob Johnson',
    photo: null,
    rating: 4.6,
    trips: 32,
    verified: true,
    route: {
      from: 'Paris, France',
      to: 'Berlin, Germany',
      date: '2024-02-05',
      capacity: '15kg',
      price: 12,
    },
    languages: ['English', 'German'],
    joinDate: '2023-03-20',
    lastActive: '2024-01-19',
    reviews: [
      {
        user: 'Jane Smith',
        rating: 4,
        comment: 'Good service, package arrived safely.',
        date: '2024-01-10',
      },
    ],
  },
];

export default function TravelerSearch() {
  const [selectedTraveler, setSelectedTraveler] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredTravelers = mockTravelers.filter((traveler) => {
    const matchesOrigin = traveler.route.from
      .toLowerCase()
      .includes(searchOrigin.toLowerCase());
    const matchesDestination = traveler.route.to
      .toLowerCase()
      .includes(searchDestination.toLowerCase());
    const matchesDate = !dateFilter || traveler.route.date === dateFilter;
    return matchesOrigin && matchesDestination && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchOrigin}
              onChange={(e) => setSearchOrigin(e.target.value)}
              placeholder="Origin city..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              placeholder="Destination city..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Travelers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTravelers.map((traveler) => (
          <motion.div
            key={traveler.id}
            className="bg-gray-800 rounded-xl p-6 space-y-4"
            whileHover={{ y: -4 }}
          >
            {/* Traveler Header */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                {traveler.photo ? (
                  <img
                    src={traveler.photo}
                    alt={traveler.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {traveler.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <FiStar className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-300">
                      {traveler.rating}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-400">
                    {traveler.trips} trips
                  </span>
                </div>
              </div>
            </div>

            {/* Route Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <FiMapPin className="w-4 h-4 mr-2" />
                <span>{traveler.route.from}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiMapPin className="w-4 h-4 mr-2" />
                <span>{traveler.route.to}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiCalendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(traveler.route.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Capacity and Price */}
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-300">
                <FiPackage className="w-4 h-4 mr-2" />
                <span>Up to {traveler.route.capacity}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiDollarSign className="w-4 h-4 mr-1" />
                <span>{traveler.route.price}/kg</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <motion.button
                onClick={() => {
                  setSelectedTraveler(traveler);
                  setShowDetails(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg
                  text-white font-medium flex items-center space-x-2"
              >
                <FiSearch className="w-5 h-5" />
                <span>View Details</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg
                  text-white font-medium flex items-center space-x-2"
              >
                <FiMessageSquare className="w-5 h-5" />
                <span>Contact</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Traveler Details Modal */}
      {selectedTraveler && (
        <Modal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          title={`Traveler Profile - ${selectedTraveler.name}`}
        >
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                {selectedTraveler.photo ? (
                  <img
                    src={selectedTraveler.photo}
                    alt={selectedTraveler.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">
                  {selectedTraveler.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <FiStar className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-gray-300">
                      {selectedTraveler.rating}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">
                    {selectedTraveler.trips} trips
                  </span>
                  {selectedTraveler.verified && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-green-400">Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              <h4 className="text-white font-medium">Current Trip</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">From</p>
                  <p className="text-white">{selectedTraveler.route.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">To</p>
                  <p className="text-white">{selectedTraveler.route.to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white">
                    {new Date(selectedTraveler.route.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Capacity</p>
                  <p className="text-white">
                    {selectedTraveler.route.capacity}
                  </p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {selectedTraveler.languages.map((language: string) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Recent Reviews</p>
              <div className="space-y-4">
                {selectedTraveler.reviews.map((review: any, index: number) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">
                        {review.user}
                      </span>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 text-gray-300">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg
                  text-white font-medium flex items-center justify-center space-x-2"
              >
                <FiPackage className="w-5 h-5" />
                <span>Request Delivery</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg
                  text-white font-medium flex items-center justify-center space-x-2"
              >
                <FiMessageSquare className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
