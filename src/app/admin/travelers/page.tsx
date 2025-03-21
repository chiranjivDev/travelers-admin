'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  DELETE_TRAVELLERS,
  GET_ALL_TRAVELLERS,
  UPDATE_TRAVELLERS_STATUS,
} from './redux/travelerAction';
export const mockTravelers = [
  {
    id: '1a2b3c4d-7e8f-9g0h-1i2j-3k4l5m6n7o8p',
    email: 'alex.johnson@example.com',
    password: '$2b$10$abcdefg1234567890qwertyuiopasdfghjklzxcvbnm',
    name: 'Alex Johnson',
    picture_url: null,
    permissions: 'traveler',
    passwordReset: null,
    status: 'active',
    phone: '9876543210',
    is_email_verified: true,
    created_at: '2025-01-01T12:00:00.000Z',
    updated_at: '2025-01-10T08:30:00.000Z',
  },
  {
    id: '2b3c4d5e-8f9g0h1i-2j3k4l5m-6n7o8p9q0r',
    email: 'jessica.miller@example.com',
    password: '$2b$10$zxcvbnmasdfghjklqwertyuiop1234567890abcdefg',
    name: 'Jessica Miller',
    picture_url: 'https://example.com/picture2.jpg',
    permissions: 'traveler',
    passwordReset: null,
    status: 'inactive',
    phone: '1234509876',
    is_email_verified: false,
    created_at: '2025-01-02T15:45:30.000Z',
    updated_at: '2025-01-11T09:15:20.000Z',
  },
  {
    id: '3c4d5e6f-9g0h1i2j-3k4l5m6n7o8p9q0r1s',
    email: 'michael.brown@example.com',
    password: '$2b$10$qwertyuiopasdfghjklzxcvbnm1234567890abcdefg',
    name: 'Michael Brown',
    picture_url: null,
    permissions: 'traveler',
    passwordReset: null,
    status: 'active',
    phone: '7890123456',
    is_email_verified: true,
    created_at: '2025-01-03T10:20:30.000Z',
    updated_at: '2025-01-12T06:40:50.000Z',
  },
  {
    id: '4d5e6f7g-0h1i2j3k-4l5m6n7o8p9q0r1s2t',
    email: 'emily.davis@example.com',
    password: '$2b$10$asdfghjklzxcvbnmqwertyuiop1234567890abcdefg',
    name: 'Emily Davis',
    picture_url: 'https://example.com/picture4.jpg',
    permissions: 'traveler',
    passwordReset: null,
    status: 'inactive',
    phone: '4567890123',
    is_email_verified: false,
    created_at: '2025-01-04T14:30:00.000Z',
    updated_at: '2025-01-13T07:50:40.000Z',
  },
  {
    id: '5e6f7g8h-1i2j3k4l-5m6n7o8p9q0r1s2t3u',
    email: 'sophia.lee@example.com',
    password: '$2b$10$zxcvbnmqwertyuiopasdfghjkl1234567890abcdefg',
    name: 'Sophia Lee',
    picture_url: null,
    permissions: 'traveler',
    passwordReset: null,
    status: 'active',
    phone: '3210987654',
    is_email_verified: true,
    created_at: '2025-01-05T09:10:15.000Z',
    updated_at: '2025-01-13T10:25:35.000Z',
  },
  {
    id: 'TRV001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'Active',
    rating: 4.8,
    completedDeliveries: 45,
    verificationStatus: 'Verified',
    joinDate: '2024-01-15',
    lastActive: '2024-12-20',
  },
  {
    id: 'TRV002',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    status: 'On Trip',
    rating: 4.5,
    completedDeliveries: 28,
    verificationStatus: 'Pending',
    joinDate: '2024-02-20',
    lastActive: '2024-12-19',
  },
];

const statusColors = {
  'Active': 'bg-green-500',
  'On Trip': 'bg-blue-500',
  'Inactive': 'bg-gray-500',
  'Suspended': 'bg-red-500',
};

export default function TravelersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const dispatch = useDispatch();
  const Travellers = useSelector((state) => state.admintraveler.travelers);

  useEffect(() => {
    const payload = {
      role: 'traveler',
    };
    dispatch({ type: GET_ALL_TRAVELLERS, payload });
  }, []);

  const filteredTravelers = Travellers.filter((traveler) => {
    const matchesSearch =
      traveler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traveler.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || traveler.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleEditClick = (id, currentStatus) => {
    const payload = {
      id: id,
      status: currentStatus,
    };
    dispatch({ type: UPDATE_TRAVELLERS_STATUS, payload });
  };

  const handleDeleteClick = (id) => {
    const payload = {
      userId: id,
    };
    dispatch({
      type: DELETE_TRAVELLERS,
      payload,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Traveler Management</h1>
          <p className="text-gray-400 mt-1">Manage and monitor travelers</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center space-x-2"
        >
          <FiUser className="w-5 h-5" />
          <span>Add New Traveler</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search travelers..."
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
            <option value="Active">Active</option>
            <option value="On Trip">On Trip</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Travelers Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Traveler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Deliveries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTravelers.map((traveler) => (
                <tr key={traveler.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                          <FiUser className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {traveler.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {traveler.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full text-white ${statusColors[traveler.status]}`}
                    >
                      {traveler.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-white">
                      <FiStar className="h-4 w-4 text-yellow-400 mr-1" />
                      {traveler.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {traveler.completedDeliveries}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {traveler.verificationStatus === 'Verified' ? (
                      <span className="flex items-center text-green-400">
                        <FiCheckCircle className="mr-1" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-400">
                        <FiXCircle className="mr-1" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {traveler.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:text-blue-400"
                      >
                        <FiEye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:text-yellow-400"
                        onClick={() =>
                          handleEditClick(traveler.id, traveler.status)
                        }
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </motion.button>
                      {/* <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:text-red-400"
                        onClick={() => {
                          handleDeleteClick(traveler.id);
                        }}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button> */}
                    </div>
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
