'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSave,
  FiGlobe,
  FiDollarSign,
  FiMail,
  FiLock,
  FiUsers,
  FiToggleRight,
  FiInfo,
} from 'react-icons/fi';

const settingsSections = [
  {
    id: 'general',
    title: 'General Settings',
    icon: FiGlobe,
    settings: [
      {
        id: 'siteName',
        label: 'Site Name',
        type: 'text',
        value: 'DeliveryConnect',
      },
      {
        id: 'timezone',
        label: 'Default Timezone',
        type: 'select',
        value: 'UTC',
        options: ['UTC', 'EST', 'PST', 'GMT'],
      },
      {
        id: 'maintenance',
        label: 'Maintenance Mode',
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payment Settings',
    icon: FiDollarSign,
    settings: [
      {
        id: 'currency',
        label: 'Default Currency',
        type: 'select',
        value: 'USD',
        options: ['USD', 'EUR', 'GBP', 'JPY'],
      },
      {
        id: 'commission',
        label: 'Platform Commission (%)',
        type: 'number',
        value: '10',
      },
      {
        id: 'minPayout',
        label: 'Minimum Payout Amount',
        type: 'number',
        value: '50',
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    icon: FiMail,
    settings: [
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        type: 'toggle',
        value: true,
      },
      {
        id: 'pushNotifications',
        label: 'Push Notifications',
        type: 'toggle',
        value: true,
      },
      {
        id: 'adminEmail',
        label: 'Admin Email Address',
        type: 'email',
        value: 'admin@deliveryconnect.com',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security Settings',
    icon: FiLock,
    settings: [
      {
        id: 'twoFactor',
        label: 'Two-Factor Authentication',
        type: 'toggle',
        value: true,
      },
      {
        id: 'sessionTimeout',
        label: 'Session Timeout (minutes)',
        type: 'number',
        value: '30',
      },
      {
        id: 'passwordPolicy',
        label: 'Minimum Password Length',
        type: 'number',
        value: '8',
      },
    ],
  },
  {
    id: 'users',
    title: 'User Settings',
    icon: FiUsers,
    settings: [
      {
        id: 'userRegistration',
        label: 'Allow User Registration',
        type: 'toggle',
        value: true,
      },
      {
        id: 'verificationRequired',
        label: 'Email Verification Required',
        type: 'toggle',
        value: true,
      },
      {
        id: 'defaultUserRole',
        label: 'Default User Role',
        type: 'select',
        value: 'user',
        options: ['user', 'traveler', 'business'],
      },
    ],
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingsSections);
  const [activeSection, setActiveSection] = useState('general');

  const handleSettingChange = (
    sectionId: string,
    settingId: string,
    value: any,
  ) => {
    setSettings((prevSettings) =>
      prevSettings.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map((setting) => {
              if (setting.id === settingId) {
                return { ...setting, value };
              }
              return setting;
            }),
          };
        }
        return section;
      }),
    );
  };

  const handleSave = () => {};

  const renderSettingInput = (setting: any, sectionId: string) => {
    switch (setting.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={setting.type}
            value={setting.value}
            onChange={(e) =>
              handleSettingChange(sectionId, setting.id, e.target.value)
            }
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) =>
              handleSettingChange(sectionId, setting.id, e.target.value)
            }
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {setting.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'toggle':
        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleSettingChange(sectionId, setting.id, !setting.value)
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              setting.value ? 'bg-blue-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                setting.value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </motion.button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage your platform configuration
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center space-x-2"
        >
          <FiSave className="w-5 h-5" />
          <span>Save Changes</span>
        </motion.button>
      </div>

      {/* Settings Navigation */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {settings.map((section) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{section.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 gap-6">
        {settings
          .filter((section) => section.id === activeSection)
          .map((section) => (
            <div key={section.id} className="space-y-6">
              {section.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="bg-gray-800 rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <label className="text-white font-medium">
                        {setting.label}
                      </label>
                      <p className="text-sm text-gray-400">
                        Configure your {setting.label.toLowerCase()} preferences
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderSettingInput(setting, section.id)}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-400 hover:text-white"
                      >
                        <FiInfo className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
