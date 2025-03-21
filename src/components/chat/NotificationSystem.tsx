'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBell,
  FiCheck,
  FiDollarSign,
  FiPackage,
  FiMessageCircle,
  FiClock,
} from 'react-icons/fi';

export type NotificationType =
  | 'offer'
  | 'message'
  | 'status'
  | 'reminder'
  | 'alert';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: () => void;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => void;
  markAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png',
      });
    }

    setTimeout(() => {
      clearNotification(newNotification.id);
    }, 5000);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within NotificationProvider',
    );
  }
  return context;
}

export function NotificationBell() {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <FiBell className="w-6 h-6 text-gray-400" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export function NotificationPanel() {
  const { notifications, markAsRead, clearNotification, clearAll } =
    useNotifications();

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'offer':
        return <FiDollarSign className="w-5 h-5 text-green-400" />;
      case 'message':
        return <FiMessageCircle className="w-5 h-5 text-blue-400" />;
      case 'status':
        return <FiCheck className="w-5 h-5 text-purple-400" />;
      case 'reminder':
        return <FiClock className="w-5 h-5 text-yellow-400" />;
      case 'alert':
        return <FiPackage className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-lg z-50">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-white font-medium">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-400 hover:text-white"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer ${
                  notification.read ? 'opacity-60' : ''
                }`}
                onClick={() => {
                  markAsRead(notification.id);
                  notification.action?.();
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium text-white">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      {notification.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotification(notification.id);
                    }}
                    className="text-gray-500 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
