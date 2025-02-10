'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiSearch,
  FiDollarSign,
  FiUser,
  FiMapPin,
  FiStar,
  FiCalendar,
  FiMessageSquare,
  FiSettings,
  FiBell,
  FiHelpCircle,
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  role: 'sender' | 'traveler' | 'all';
}

const sidebarItems: SidebarItem[] = [
  // Sender Items

  {
    id: 'packages',
    label: 'My Packages',
    icon: FiPackage,
    path: '/sender/dashboard/packages',
    role: 'sender',
  },
  {
    id: 'find-travelers',
    label: 'Find Travelers',
    icon: FiSearch,
    path: '/sender/dashboard/travelers',
    role: 'sender',
  },
  {
    id: 'sender-transactions',
    label: 'Payment History',
    icon: FiDollarSign,
    path: '/sender/dashboard/transactions',
    role: 'sender',
  },

  // Traveler Items
  {
    id: 'trips',
    label: 'My Trips',
    icon: FiMapPin,
    path: '/traveler/dashboard/trips',
    role: 'traveler',
  },
  {
    id: 'earnings',
    label: 'Earnings',
    icon: FiDollarSign,
    path: '/traveler/dashboard/earnings',
    role: 'traveler',
  },
  {
    id: 'reviews',
    label: 'Reviews & Ratings',
    icon: FiStar,
    path: '/traveler/dashboard/reviews',
    role: 'traveler',
  },
  {
    id: 'availability',
    label: 'Availability',
    icon: FiCalendar,
    path: '/traveler/dashboard/availability',
    role: 'traveler',
  },

  // Common Items
  {
    id: 'messages',
    label: 'Messages',
    icon: FiMessageSquare,
    path: '/dashboard/messages',
    role: 'all',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: FiBell,
    path: '/dashboard/notifications',
    role: 'all',
  },
  {
    id: 'profile',
    label: 'Profile Settings',
    icon: FiUser,
    path: '/dashboard/profile',
    role: 'all',
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: FiHelpCircle,
    path: '/dashboard/help',
    role: 'all',
  },

  // Orders
  {
    id: 'orders',
    label: 'My Orders',
    icon: FiPackage,
    path: '/sender/dashboard/orders',
    role: 'all',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredItems = sidebarItems.filter(
    (item) => item.role === 'all' || item.role === user?.activeRole
  );

  return (
    <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-800">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            DeliveryConnect
          </motion.div>
        </Link>
      </div>

      <nav className="mt-6">
        <div className="px-4 mb-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-lg font-medium">
                  {user?.name?.charAt(0) || 'NA'}
                </span>
              </div>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-gray-400 capitalize">
                  {user?.activeRole}
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
              pathname === item.path
                ? 'text-white bg-blue-600'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
