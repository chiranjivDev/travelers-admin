'use client'

import { useSimpleChat } from '@/contexts/SimpleChatContext'
import { useState, useEffect, useCallback } from 'react'
import { FiDollarSign, FiCalendar, FiShield, FiClock, FiTruck } from 'react-icons/fi'

interface NegotiationPanelProps {
  onClose: () => void
}

export default function NegotiationPanel({ onClose }: NegotiationPanelProps) {
  const { activePackage, currentUser, otherUser, sendMessage } = useSimpleChat()
  const [price, setPrice] = useState(activePackage?.price.toString() || '')
  const [date, setDate] = useState(activePackage?.date || '')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [note, setNote] = useState('')

  if (!activePackage || !currentUser || !otherUser) return null

  const isSender = currentUser.role === 'sender'
  const travelerTrip = otherUser.role === 'traveler' ? otherUser.activeTrip : null

  const defaultPricing = {
    insurance: 5,
    priority: 10,
    tracking: 3
  }

  const services = [
    {
      id: 'insurance',
      name: 'Insurance',
      icon: <FiShield />,
      price: travelerTrip?.pricing?.insurance || defaultPricing.insurance,
      description: 'Full coverage for your package'
    },
    {
      id: 'priority',
      name: 'Priority Delivery',
      icon: <FiClock />,
      price: travelerTrip?.pricing?.priority || defaultPricing.priority,
      description: 'Faster delivery time'
    },
    {
      id: 'tracking',
      name: 'Live Tracking',
      icon: <FiTruck />,
      price: travelerTrip?.pricing?.tracking || defaultPricing.tracking,
      description: 'Real-time package location'
    }
  ]

  const calculateTotal = () => {
    const basePrice = Number(price) || 0
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
    return basePrice + servicesTotal
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const offer = {
      price: calculateTotal(),
      date,
      services: selectedServices,
      note
    }
    sendMessage(`New offer: €${offer.price} for ${date}`, 'offer', offer)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Make an Offer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price (€)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiDollarSign />
              </span>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Delivery Date
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiCalendar />
              </span>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Additional Services
            </label>
            <div className="space-y-3">
              {services.map(service => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedServices(prev => [...prev, service.id])
                        } else {
                          setSelectedServices(prev => prev.filter(id => id !== service.id))
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={service.id} className="ml-3 flex items-center cursor-pointer">
                      <span className="text-gray-400 mr-2">{service.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{service.name}</div>
                        <div className="text-xs text-gray-400">{service.description}</div>
                      </div>
                    </label>
                  </div>
                  <div className="text-sm text-gray-300">€{service.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              className="bg-gray-800 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Add a note to your offer..."
            />
          </div>

          {/* Total */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-300">Total:</span>
              <span className="text-white">€{calculateTotal()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Send Offer
          </button>
        </form>
      </div>
    </div>
  )
}