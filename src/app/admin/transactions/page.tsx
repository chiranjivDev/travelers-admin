'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from 'react-icons/fi';
const mockTransactions = [
  {
    id: 'TRX001',
    date: '2024-12-20',
    type: 'Package Delivery',
    amount: 149.99,
    status: 'Completed',
    from: 'John Doe',
    to: 'Sarah Wilson',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'TRX002',
    date: '2024-12-19',
    type: 'Traveler Payment',
    amount: 120.5,
    status: 'Pending',
    from: 'DeliveryConnect',
    to: 'Mike Johnson',
    paymentMethod: 'Bank Transfer',
  },
];

const statusColors = {
  Completed: 'bg-green-500',
  Pending: 'bg-yellow-500',
  Failed: 'bg-red-500',
  Refunded: 'bg-purple-500',
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'Completed':
      return <FiCheckCircle className="w-5 h-5 text-green-500" />;
    case 'Pending':
      return <FiClock className="w-5 h-5 text-yellow-500" />;
    case 'Failed':
      return <FiXCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'All' || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <p className="text-gray-400 mt-1">
            Monitor all financial transactions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium flex items-center space-x-2"
        >
          <FiDownload className="w-5 h-5" />
          <span>Export Transactions</span>
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Revenue', value: '$45,230.50', change: '+15.3%' },
          { title: 'Pending Payouts', value: '$3,450.00', count: '12' },
          { title: 'Failed Transactions', value: '$520.75', count: '3' },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-gray-400 text-sm font-medium">{card.title}</h3>
            <p className="text-2xl font-bold text-white mt-2">{card.value}</p>
            {card.change && (
              <span className="text-green-400 text-sm font-medium">
                {card.change}
              </span>
            )}
            {card.count && (
              <span className="text-gray-400 text-sm font-medium">
                {card.count} transactions
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Package Delivery">Package Delivery</option>
            <option value="Traveler Payment">Traveler Payment</option>
            <option value="Refund">Refund</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
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
                  From/To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusIcon status={transaction.status} />
                      <span className="ml-2 text-sm text-white">
                        {transaction.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-white">
                      <FiDollarSign className="w-4 h-4 mr-1" />
                      {transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full text-white ${statusColors[transaction.status]}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{transaction.from}</div>
                    <div className="text-sm text-gray-400">
                      {transaction.to}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 hover:text-blue-400"
                    >
                      <FiEye className="w-5 h-5" />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
