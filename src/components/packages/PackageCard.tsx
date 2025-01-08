'use client';

import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiClock,
  FiShare2,
  FiBookmark,
  FiHeart,
  FiMoreVertical,
  FiCheck,
  FiClock as FiTime,
  FiShield,
  FiTruck,
  FiStar,
  FiLink,
  FiMessageSquare,
  FiArrowRight,
  FiInfo,
} from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { useState, useCallback, useEffect } from 'react';
import { useSavedPackages } from '@/contexts/SavedPackagesContext';
import { useNotification } from '@/contexts/NotificationContext';
import { Menu, Transition } from '@headlessui/react';
import Avatar from '@/components/common/Avatar';
import { Package } from '@/data/mockPackages';

// Create a client-only wrapper component
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

interface PackageCardProps {
  package: Package;
  onViewDetails?: (pkg: Package) => void;
  onChatClick?: (pkg: Package) => void;
}

export default function PackageCard({
  package: pkg,
  onViewDetails,
  onChatClick,
}: PackageCardProps) {
  const [showActions, setShowActions] = useState(false);
  const { isPackageSaved, savePackage, unsavePackage } = useSavedPackages();
  const { showNotification } = useNotification();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsSaved(isPackageSaved(pkg.id));
  }, [isPackageSaved, pkg.id]);

  const handleSave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isSaved) {
        unsavePackage(pkg.id);
        showNotification(
          'Package removed from saved items',
          'info',
          <FiBookmark />
        );
      } else {
        savePackage(pkg.id);
        showNotification('Package saved for later', 'success', <FiBookmark />);
      }
      setIsSaved(!isSaved);
    },
    [isSaved, pkg.id, savePackage, unsavePackage, showNotification]
  );

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsLiked(!isLiked);
      showNotification(
        isLiked
          ? 'Package removed from favorites'
          : 'Package added to favorites',
        'info',
        <FiHeart />
      );
    },
    [isLiked, showNotification]
  );

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const url = `${window.location.origin}/package/${pkg.id}`;
      const title = `Package from ${pkg.origin} to ${pkg.destination}`;
      const text = `Check out this package delivery opportunity`;

      const shareData = {
        title,
        text,
        url,
      };

      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => {
            showNotification(
              'Package shared successfully',
              'success',
              <FiShare2 />
            );
          })
          .catch(console.error);
      } else {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            showNotification('Link copied to clipboard', 'success', <FiLink />);
          })
          .catch(console.error);
      }
    },
    [pkg.id, pkg.origin, pkg.destination, showNotification]
  );

  const handleChat = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChatClick?.(pkg);
    },
    [pkg, onChatClick]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
    >
      <div className="p-6">
        {/* Action buttons */}
        <ClientOnly>
          <div className="flex justify-end space-x-2 mb-4">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full transition-colors ${
                isSaved
                  ? 'bg-blue-500/10 text-blue-500'
                  : 'hover:bg-gray-700 text-gray-400'
              }`}
            >
              <FiBookmark
                className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? 'bg-red-500/10 text-red-500'
                  : 'hover:bg-gray-700 text-gray-400'
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-700 text-gray-400 transition-colors"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 rounded-full hover:bg-gray-700 text-gray-400 transition-colors">
                <FiMoreVertical className="w-5 h-5" />
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-800 border border-gray-700 rounded-lg shadow-lg focus:outline-none z-10">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-300`}
                          onClick={() => {
                            showNotification('Package reported', 'info');
                          }}
                        >
                          Report Package
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-300`}
                          onClick={() => {
                            showNotification('Sender blocked', 'info');
                          }}
                        >
                          Block Sender
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </ClientOnly>

        {/* Header with sender info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar
              src={pkg.sender.avatar}
              alt={pkg.sender.name}
              size={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">{pkg.sender.name}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{pkg.sender.rating}</span>
                <span className="mx-1">·</span>
                <span>{pkg.sender.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">${pkg.price}</div>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <FiMapPin className="w-4 h-4 mr-1" />
              From
            </div>
            <div className="font-medium">{pkg.pickupLocation}</div>
          </div>
          <div className="flex items-center text-gray-500 px-4">
            <FiArrowRight className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <FiMapPin className="w-4 h-4 mr-1" />
              To
            </div>
            <div className="font-medium">{pkg.deliveryLocation}</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <FiCalendar className="w-4 h-4 mr-1" />
              Delivery Date
            </div>
            <div className="font-medium">
              {format(parseISO(pkg.deliveryDate), 'MMM d, yyyy')}
            </div>
          </div>
          <div>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <FiPackage className="w-4 h-4 mr-1" />
              Package Details
            </div>
            <div className="font-medium">
              {pkg.weight}kg · {pkg.dimensions}
            </div>
          </div>
        </div>

        {/* Package Info */}
        <div>
          <div className="flex items-center text-gray-400 text-sm mb-2">
            <FiPackage className="w-4 h-4 mr-1" />
            Package Description
          </div>
          <p
            className={`text-sm text-gray-300 ${isExpanded ? '' : 'line-clamp-2'}`}
          >
            {pkg.description}
          </p>
          {pkg.description.length > 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-sm text-blue-500 hover:text-blue-400 mt-1"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Features */}
        {(pkg.insurance ||
          pkg.priority ||
          pkg.tracking ||
          pkg.specialInstructions) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {pkg.insurance && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                <FiShield className="w-3 h-3 mr-1" />
                Insured
              </span>
            )}
            {pkg.priority && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                <FiClock className="w-3 h-3 mr-1" />
                Priority
              </span>
            )}
            {pkg.tracking && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                <FiTruck className="w-3 h-3 mr-1" />
                Tracking
              </span>
            )}
            {pkg.specialInstructions && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                <FiInfo className="w-3 h-3 mr-1" />
                Special Instructions
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleChat}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <FiMessageSquare className="w-5 h-5 mr-2" />
            Chat with Sender
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(pkg);
            }}
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <FiInfo className="w-5 h-5 mr-2" />
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
