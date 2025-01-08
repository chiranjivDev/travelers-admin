'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMessageSquare,
  FiUser,
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiTag,
  FiSend,
  FiPaperclip
} from 'react-icons/fi'
import Modal from './Modal'

// Mock data - Replace with real data from API
const mockTickets = [
  {
    id: 1,
    subject: 'Delivery Delay Issue',
    user: 'John Smith',
    status: 'open',
    priority: 'high',
    category: 'delivery',
    created: '2024-01-15T10:30:00',
    lastUpdate: '2024-01-15T14:20:00',
    messages: [
      {
        id: 1,
        sender: 'John Smith',
        role: 'user',
        message: 'My delivery is delayed by 3 days now. Need urgent assistance.',
        timestamp: '2024-01-15T10:30:00'
      },
      {
        id: 2,
        sender: 'Support Team',
        role: 'admin',
        message: 'We are looking into this issue. Could you please provide your tracking number?',
        timestamp: '2024-01-15T14:20:00'
      }
    ]
  },
  // Add more mock tickets...
]

type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed'
type TicketPriority = 'low' | 'medium' | 'high'

export default function SupportSystem() {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showTicket, setShowTicket] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-900/50 text-yellow-400'
      case 'in-progress':
        return 'bg-blue-900/50 text-blue-400'
      case 'resolved':
        return 'bg-green-900/50 text-green-400'
      case 'closed':
        return 'bg-gray-900/50 text-gray-400'
      default:
        return 'bg-gray-900/50 text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // TODO: Implement message sending
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Tickets',
            value: mockTickets.length,
            icon: FiMessageSquare,
            color: 'text-blue-500'
          },
          {
            title: 'Open Tickets',
            value: mockTickets.filter(t => t.status === 'open').length,
            icon: FiClock,
            color: 'text-yellow-500'
          },
          {
            title: 'Resolved Today',
            value: 5,
            icon: FiCheck,
            color: 'text-green-500'
          },
          {
            title: 'High Priority',
            value: mockTickets.filter(t => t.priority === 'high').length,
            icon: FiAlertCircle,
            color: 'text-red-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-700/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {['all', 'open', 'in-progress', 'resolved', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as TicketStatus | 'all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${statusFilter === status 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockTickets
                .filter(ticket => statusFilter === 'all' || ticket.status === statusFilter)
                .map((ticket) => (
                  <tr 
                    key={ticket.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiTag className={`w-4 h-4 mr-2 ${getPriorityColor(ticket.priority)}`} />
                        <span className="text-white">{ticket.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                          <FiUser className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-white">{ticket.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(ticket.lastUpdate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.button
                        onClick={() => {
                          setSelectedTicket(ticket)
                          setShowTicket(true)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiMessageSquare className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <Modal
          isOpen={showTicket}
          onClose={() => setShowTicket(false)}
          title={`Ticket - ${selectedTicket.subject}`}
        >
          <div className="space-y-6">
            {/* Ticket Info */}
            <div className="grid grid-cols-2 gap-4 bg-gray-700/50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                  ${getStatusColor(selectedTicket.status)}`}
                >
                  {selectedTicket.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Priority</p>
                <span className={`text-sm ${getPriorityColor(selectedTicket.priority)}`}>
                  {selectedTicket.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Category</p>
                <p className="text-white">{selectedTicket.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white">
                  {new Date(selectedTicket.created).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedTicket.messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'admin' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`max-w-[80%] ${
                    message.role === 'admin' 
                      ? 'bg-blue-600 rounded-l-xl rounded-tr-xl' 
                      : 'bg-gray-700 rounded-r-xl rounded-tl-xl'
                  } p-4`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-white">
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-white">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                    text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                    resize-none"
                  rows={3}
                />
                <button
                  className="absolute right-2 bottom-2 p-2 text-gray-400 
                    hover:text-white transition-colors"
                >
                  <FiPaperclip className="w-5 h-5" />
                </button>
              </div>
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg
                  text-white font-medium flex items-center space-x-2"
              >
                <FiSend className="w-5 h-5" />
                <span>Send</span>
              </motion.button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
