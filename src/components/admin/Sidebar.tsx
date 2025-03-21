'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiSettings,
  FiPieChart,
  FiMessageSquare,
  FiLogOut,
  FiFlag,
} from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', icon: FiHome, path: '/admin' },
  { name: 'Users', icon: FiUsers, path: '/admin/users' },
  { name: 'Packages', icon: FiPackage, path: '/admin/packages' },
  { name: 'Travelers', icon: FiTruck, path: '/admin/travelers' },
  { name: 'Transactions', icon: FiDollarSign, path: '/admin/transactions' },
  { name: 'Disputes', icon: FiFlag, path: '/admin/issues' },
  { name: 'Analytics', icon: FiPieChart, path: '/admin/analytics' },
  { name: 'Messages', icon: FiMessageSquare, path: '/admin/messages' },
  { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin/login';
  };

  return (
    <div className="h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            DeliveryConnect
          </motion.div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <motion.button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  );
}
