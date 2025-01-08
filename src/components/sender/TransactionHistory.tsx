'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiDollarSign,
  FiCreditCard,
  FiDownload,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiFilter,
  FiCalendar,
  FiFileText
} from 'react-icons/fi'
import Modal from '../admin/Modal'

// Mock data
const mockTransactions = [
  {
    id: 1,
    type: 'payment',
    amount: 150.00,
    status: 'completed',
    date: '2024-01-15',
    description: 'Package delivery payment - PKG-2024-001',
    paymentMethod: 'Visa **** 1234',
    reference: 'TRX-2024-001',
    details: {
      package: 'PKG-2024-001',
      traveler: 'Alice Smith',
      route: 'New York to London',
      fees: {
        delivery: 135.00,
        platform: 10.00,
        insurance: 5.00
      }
    }
  },
  {
    id: 2,
    type: 'refund',
    amount: 80.00,
    status: 'completed',
    date: '2024-01-10',
    description: 'Refund for cancelled delivery - PKG-2024-002',
    paymentMethod: 'Original payment method',
    reference: 'TRX-2024-002',
    details: {
      package: 'PKG-2024-002',
      reason: 'Delivery cancelled by sender',
      originalPayment: {
        amount: 80.00,
        date: '2024-01-08'
      }
    }
  },
  // Add more mock transactions...
]

type TransactionType = 'payment' | 'refund'
type TransactionStatus = 'completed' | 'pending' | 'failed'

export default function TransactionHistory() {
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-400'
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-400'
      case 'failed':
        return 'bg-red-900/50 text-red-400'
      default:
        return 'bg-gray-900/50 text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <FiArrowUpRight className="w-4 h-4 text-red-400" />
      case 'refund':
        return <FiArrowDownLeft className="w-4 h-4 text-green-400" />
      default:
        return null
    }
  }

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter
    const matchesDate = (!dateRange.start || new Date(transaction.date) >= new Date(dateRange.start)) &&
                       (!dateRange.end || new Date(transaction.date) <= new Date(dateRange.end))
    return matchesType && matchesDate
  })

  const totalSpent = filteredTransactions
    .reduce((acc, trx) => acc + (trx.type === 'payment' ? trx.amount : -trx.amount), 0)

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Total Spent',
            value: `$${totalSpent.toFixed(2)}`,
            icon: FiDollarSign,
            color: 'text-blue-500'
          },
          {
            title: 'Active Payments',
            value: mockTransactions.filter(t => t.status === 'pending').length,
            icon: FiCreditCard,
            color: 'text-yellow-500'
          },
          {
            title: 'Total Transactions',
            value: mockTransactions.length,
            icon: FiFileText,
            color: 'text-purple-500'
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
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'all')}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="payment">Payments</option>
              <option value="refund">Refunds</option>
            </select>
          </div>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-white">{transaction.reference}</div>
                      <div className="text-gray-400">{transaction.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(transaction.type)}
                      <span className="ml-2 text-white capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-${transaction.type === 'refund' ? 'green' : 'red'}-400`}>
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        onClick={() => {
                          setSelectedTransaction(transaction)
                          setShowDetails(true)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiFileText className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiDownload className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <Modal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          title={`Transaction Details - ${selectedTransaction.reference}`}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-white capitalize">{selectedTransaction.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Amount</p>
                <p className={`text-${selectedTransaction.type === 'refund' ? 'green' : 'red'}-400`}>
                  ${selectedTransaction.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                  ${getStatusColor(selectedTransaction.status)}`}
                >
                  {selectedTransaction.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Date</p>
                <p className="text-white">
                  {new Date(selectedTransaction.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Method</p>
                <p className="text-white">{selectedTransaction.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Reference</p>
                <p className="text-white">{selectedTransaction.reference}</p>
              </div>
            </div>

            {selectedTransaction.type === 'payment' && selectedTransaction.details && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Payment Breakdown</p>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Delivery Fee</span>
                    <span className="text-white">
                      ${selectedTransaction.details.fees.delivery.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Platform Fee</span>
                    <span className="text-white">
                      ${selectedTransaction.details.fees.platform.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Insurance</span>
                    <span className="text-white">
                      ${selectedTransaction.details.fees.insurance.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 flex justify-between font-medium">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">
                      ${selectedTransaction.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedTransaction.type === 'refund' && selectedTransaction.details && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Refund Details</p>
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Original Payment</span>
                    <span className="text-white">
                      ${selectedTransaction.details.originalPayment.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Original Date</span>
                    <span className="text-white">
                      {new Date(selectedTransaction.details.originalPayment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Reason</span>
                    <span className="text-white">{selectedTransaction.details.reason}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg
                  text-white font-medium flex items-center space-x-2"
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Receipt</span>
              </motion.button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
