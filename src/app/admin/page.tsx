'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiTruck,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const stats = [
    {
      name: 'Total Users',
      value: '12,345',
      change: '+12%',
      icon: FiUsers,
      color: 'blue',
    },
    {
      name: 'Active Deliveries',
      value: '1,234',
      change: '+23%',
      icon: FiPackage,
      color: 'green',
    },
    {
      name: 'Revenue',
      value: '$123,456',
      change: '+8%',
      icon: FiDollarSign,
      color: 'purple',
    },
    {
      name: 'Active Travelers',
      value: '456',
      change: '+15%',
      icon: FiTruck,
      color: 'orange',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      message: 'New user registration: John Doe',
      time: '5 minutes ago',
      icon: FiCheckCircle,
      color: 'text-green-400',
    },
    {
      id: 2,
      type: 'delivery_started',
      message: 'New delivery started: Package #12345',
      time: '10 minutes ago',
      icon: FiPackage,
      color: 'text-blue-400',
    },
    {
      id: 3,
      type: 'issue_reported',
      message: 'Issue reported: Delivery delayed #98765',
      time: '15 minutes ago',
      icon: FiAlertCircle,
      color: 'text-red-400',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">Welcome back, Admin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <stat.icon
                  className={`w-8 h-8 text-${stat.color}-400`}
                  aria-hidden="true"
                />
                <span className={`text-${stat.color}-400 text-sm font-medium`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm">{stat.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg"
              >
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-white">{activity.message}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/admin/users')}
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium"
          >
            Manage Users
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/admin/deliveries')}
            className="p-4 bg-green-600 hover:bg-green-700 rounded-xl text-white font-medium"
          >
            View Deliveries
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/admin/reports')}
            className="p-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium"
          >
            Generate Reports
          </motion.button>
        </div>
      </div>
    </div>
  );
}
