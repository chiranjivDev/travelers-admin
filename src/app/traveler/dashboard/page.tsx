'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import Calendar from '@/components/dashboard/Calendar';
import LineChart from '@/components/dashboard/charts/LineChart';
import BarChart from '@/components/dashboard/charts/BarChart';
import {
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiStar,
  FiMapPin,
  FiCalendar,
  FiSearch,
  FiClock,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import ChatButton from '@/components/chat/ChatButton';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { TRAVELER_DETAIL } from '../redux/tripsAction';
import { useDispatch } from 'react-redux';

// Mock data for demonstration
const mockTrips = [
  {
    id: 1,
    route: 'Amsterdam → Paris',
    date: '2024-01-15',
    status: 'Active',
    packages: 2,
    earnings: 120,
    capacity: '5kg remaining',
    senders: [
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      },
    ],
  },
  {
    id: 2,
    route: 'Rotterdam → Berlin',
    date: '2024-01-20',
    status: 'Scheduled',
    packages: 0,
    earnings: 0,
    capacity: '10kg available',
    senders: [],
  },
];

const mockStats = {
  activeTrips: 1,
  completedDeliveries: 25,
  totalEarnings: 2800,
  averageRating: 4.9,
};
const mockEvents = [
  {
    id: '1',
    title: 'Amsterdam → Paris',
    type: 'trip',
    date: '2024-12-22',
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Package Delivery: PKG123',
    type: 'delivery',
    date: '2024-12-22',
    status: 'pending',
  },
];
const earningsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Earnings',
      data: [1200, 1500, 1300, 1800, 1600, 2000],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
    },
  ],
};

const deliveriesPerRouteData = {
  labels: ['AMS-PAR', 'ROT-BER', 'AMS-LON', 'BRU-PAR', 'AMS-BRU'],
  datasets: [
    {
      label: 'Deliveries per Route',
      data: [12, 8, 6, 5, 4],
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderColor: 'rgb(139, 92, 246)',
      borderWidth: 1,
    },
  ],
};

export default function TravelerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('TravelerDashboard');

  // Fetch profile details
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) {
      dispatch({ type: TRAVELER_DETAIL, payload: user.userId });
    }
  }, [dispatch, user?.userId]);

  return (
    <DashboardLayout title={t('title')} description={t('description')}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Trips"
          value={mockStats.activeTrips}
          icon={FiMapPin}
          description="Currently active trips"
        />
        <StatCard
          title="Completed Deliveries"
          value={mockStats.completedDeliveries}
          icon={FiPackage}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Total Earnings"
          value={`€${mockStats.totalEarnings}`}
          icon={FiDollarSign}
          trend={{ value: 10, isPositive: true }}
        />
        <StatCard
          title="Average Rating"
          value={mockStats.averageRating}
          icon={FiStar}
          description="Based on 25 deliveries"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart data={earningsData} title="Earnings Overview" height={300} />
        <BarChart
          data={deliveriesPerRouteData}
          title="Popular Routes"
          height={300}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white"
        >
          <FiMapPin className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Add New Trip</h3>
          <p className="text-purple-100 text-sm mb-4">
            Create a new trip and start accepting packages
          </p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium">
            Add Trip
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white"
        >
          <FiPackage className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Browse Packages</h3>
          <p className="text-blue-100 text-sm mb-4">
            Find packages matching your travel routes
          </p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
            Find Packages
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white"
        >
          <FiCalendar className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Set Availability</h3>
          <p className="text-green-100 text-sm mb-4">
            Update your travel schedule and capacity
          </p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium">
            Update Schedule
          </button>
        </motion.div>
      </div>

      {/* Upcoming & Active Trips */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Trips</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search trips..."
                  className="bg-gray-900 text-white text-sm rounded-lg pl-10 pr-4 py-2 w-64 border border-gray-700 focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                New Trip
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                  Route
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                  Packages
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                  Earnings
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                  Capacity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-white">
                      {trip.route}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">{trip.date}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        trip.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-300">
                        {trip.packages} packages
                      </span>
                      {trip.senders.map((sender) => (
                        <ChatButton
                          key={sender.id}
                          userId={sender.id}
                          userName={sender.name}
                          context="trip"
                          contextId={trip.id}
                          className="text-xs"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">
                      €{trip.earnings}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-300">{trip.capacity}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-8">
        <Calendar events={mockEvents} onEventClick={(event) => {}} />
      </div>
    </DashboardLayout>
  );
}
