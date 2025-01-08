'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description?: string;
}) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar */}
        <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
            >
              <FiBell className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user?.name?.charAt(0) || 'NA'}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {user?.activeRole}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
