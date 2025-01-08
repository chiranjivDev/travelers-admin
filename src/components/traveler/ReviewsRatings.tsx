'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiStar,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiFilter,
  FiUser,
  FiPackage
} from 'react-icons/fi'
import Modal from '../admin/Modal'

// Mock data
const mockReviews = [
  {
    id: 1,
    sender: {
      name: 'John Doe',
      avatar: null,
      location: 'New York, USA'
    },
    package: {
      id: 'PKG-2024-001',
      route: 'New York to London',
      date: '2024-01-15'
    },
    rating: 5,
    comment: 'Excellent service! The package was delivered on time and in perfect condition. Very professional and communicative throughout the process.',
    tags: ['On Time', 'Professional', 'Great Communication'],
    helpful: 12,
    notHelpful: 1,
    date: '2024-01-20',
    reply: null
  },
  {
    id: 2,
    sender: {
      name: 'Jane Smith',
      avatar: null,
      location: 'Paris, France'
    },
    package: {
      id: 'PKG-2024-002',
      route: 'Paris to Berlin',
      date: '2024-01-10'
    },
    rating: 4,
    comment: 'Good service overall. Delivery was slightly delayed but communication was excellent. Would use again.',
    tags: ['Professional', 'Good Communication'],
    helpful: 8,
    notHelpful: 2,
    date: '2024-01-15',
    reply: {
      text: 'Thank you for your feedback! I apologize for the slight delay. I always strive to provide the best service possible.',
      date: '2024-01-16'
    }
  }
]

const mockStats = {
  averageRating: 4.8,
  totalReviews: 45,
  ratingBreakdown: {
    5: 35,
    4: 8,
    3: 2,
    2: 0,
    1: 0
  },
  tags: [
    { name: 'On Time', count: 38 },
    { name: 'Professional', count: 42 },
    { name: 'Great Communication', count: 35 },
    { name: 'Careful Handling', count: 30 },
    { name: 'Friendly', count: 28 }
  ]
}

export default function ReviewsRatings() {
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  const filteredReviews = mockReviews.filter(review => 
    filterRating === null || review.rating === filterRating
  )

  const getRatingPercentage = (rating: number) => {
    return (mockStats.ratingBreakdown[rating] / mockStats.totalReviews) * 100
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="md:col-span-2 bg-gray-800 rounded-xl p-6"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {mockStats.averageRating}
              </h3>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(mockStats.averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                    fill={star <= Math.round(mockStats.averageRating) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-gray-400">
                  {mockStats.totalReviews} reviews
                </span>
              </div>
            </div>
            <div className="flex-1 ml-8">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-400 w-3">{rating}</span>
                  <FiStar className="w-4 h-4 text-yellow-400" />
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${getRatingPercentage(rating)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">
                    {mockStats.ratingBreakdown[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 rounded-xl p-6"
          whileHover={{ y: -4 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {mockStats.tags.map((tag) => (
              <span
                key={tag.name}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white"
              >
                {tag.name} ({tag.count})
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilterRating(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${filterRating === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          All
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => setFilterRating(rating)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filterRating === rating
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {rating} <FiStar className="inline w-4 h-4 ml-1" />
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-gray-800 rounded-xl p-6"
            whileHover={{ y: -4 }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  {review.sender.avatar ? (
                    <img
                      src={review.sender.avatar}
                      alt={review.sender.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">
                    {review.sender.name}
                  </h4>
                  <p className="text-sm text-gray-400">{review.sender.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-5 h-5 ${
                      star <= review.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill={star <= review.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>

            {/* Package Info */}
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
              <div className="flex items-center">
                <FiPackage className="w-4 h-4 mr-1" />
                {review.package.id}
              </div>
              <span>•</span>
              <div>{review.package.route}</div>
              <span>•</span>
              <div>{new Date(review.package.date).toLocaleDateString()}</div>
            </div>

            {/* Review Content */}
            <p className="text-white mb-4">{review.comment}</p>

            {/* Tags */}
            {review.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Reply */}
            {review.reply && (
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                <p className="text-white">{review.reply.text}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Replied on {new Date(review.reply.date).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                  <FiThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                  <FiThumbsDown className="w-4 h-4" />
                  <span>{review.notHelpful}</span>
                </button>
              </div>
              {!review.reply && (
                <motion.button
                  onClick={() => {
                    setSelectedReview(review)
                    setShowReplyModal(true)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600
                    hover:bg-blue-500 rounded-lg text-white text-sm font-medium"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  <span>Reply</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reply Modal */}
      {selectedReview && (
        <Modal
          isOpen={showReplyModal}
          onClose={() => {
            setShowReplyModal(false)
            setReplyText('')
          }}
          title={`Reply to ${selectedReview.sender.name}'s Review`}
        >
          <div className="space-y-4">
            {/* Original Review */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-4 h-4 ${
                      star <= selectedReview.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill={star <= selectedReview.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-white">{selectedReview.comment}</p>
            </div>

            {/* Reply Form */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Your Reply
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-32 px-4 py-2 bg-gray-700 border border-gray-600
                  rounded-lg text-white placeholder-gray-400 focus:outline-none
                  focus:border-blue-500 resize-none"
                placeholder="Write your reply..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <motion.button
                onClick={() => {
                  setShowReplyModal(false)
                  setReplyText('')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg
                  text-white font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg
                  text-white font-medium"
              >
                Send Reply
              </motion.button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
