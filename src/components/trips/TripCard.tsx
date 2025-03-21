'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import {
  FiStar,
  FiPackage,
  FiCalendar,
  FiMapPin,
  FiCheck,
  FiClock,
  FiMessageSquare,
  FiInfo,
  FiBookmark,
  FiHeart,
  FiShare2,
  FiMoreVertical,
  FiLink,
  FiUser,
  FiTruck,
} from 'react-icons/fi';
import { TripDetails } from '@/data/mockTrips';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { useNotification } from '@/contexts/NotificationContext';
import { useSavedTrips } from '@/contexts/SavedTripsContext';
import { format, parseISO } from 'date-fns';
import Avatar from '@/components/common/Avatar';
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

interface DestinationFlexibility {
  city: string;
  extraCharge?: number;
  estimatedTime?: string;
}

interface TripCardProps {
  trip: TripDetails;
  onChatClick?: (travelerId: string) => void;
}

const TripCard = memo(function TripCard({ trip, onChatClick }: TripCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { showNotification } = useNotification();
  const { isTripSaved, saveTrip, unsaveTrip } = useSavedTrips();

  useEffect(() => {
    setIsSaved(isTripSaved(trip.id));
  }, [isTripSaved, trip.id]);

  const handleSave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSaved(!isSaved);
      if (isSaved) {
        unsaveTrip(trip.id);
        showNotification(
          'Trip removed from saved items',
          'info',
          <FiBookmark />,
        );
      } else {
        saveTrip(trip.id);
        showNotification('Trip saved for later', 'success', <FiBookmark />);
      }
    },
    [isSaved, trip.id, saveTrip, unsaveTrip, showNotification],
  );

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsLiked(!isLiked);
      showNotification(
        isLiked ? 'Trip removed from favorites' : 'Trip added to favorites',
        'info',
        <FiHeart />,
      );
    },
    [isLiked, showNotification],
  );

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const url = `${window.location.origin}/trip/${trip.id}`;
      const title = `Trip from ${trip.route.from} to ${trip.route.to}`;
      const text = `Check out this trip by ${trip.traveler.name}`;

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
              'Trip shared successfully',
              'success',
              <FiShare2 />,
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
    [trip, showNotification],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDestinations(false);
      }}
    >
      <div className="p-6">
        {/* Action buttons */}
        {/* <ClientOnly>
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-800 border border-gray-700 rounded-lg shadow-lg focus:outline-none">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-300`}
                          onClick={() => {
                            showNotification('Trip reported', 'info');
                          }}
                        >
                          Report Trip
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
                            showNotification('Traveler blocked', 'info');
                          }}
                        >
                          Block Traveler
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </ClientOnly> */}

        {/* Quick Actions - Visible on Hover */}
        {/* <ClientOnly>
          <div
            className={`absolute right-4 top-4 space-y-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <button
              onClick={() => onChatClick(trip.traveler.id)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Start Chat"
            >
              <FiMessageSquare />
            </button>
            <Link
              href={`/traveler/${trip.traveler.id}`}
              className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors block"
              title="View Profile"
            >
              <FiInfo />
            </Link>
          </div>
        </ClientOnly> */}

        {/* Header with traveler info and price */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <Avatar
              src={trip.traveler.picture_url}
              alt={trip.traveler.name}
              size={48}
              className="rounded-full"
            />
            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-white">
                  {trip.traveler.name}
                </h3>
                {/* {trip.traveler.isVerified && (
                  <span className="ml-2 px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">
                    Verified
                  </span>
                )} */}
              </div>
              {/* <div className="flex items-center text-sm text-gray-400">
                <span className="flex items-center">
                  <FiStar className="mr-1 text-yellow-500" />
                  {trip.stats.rating}
                </span>
                <span className="mx-2">•</span>
                <span>{trip.stats.reviewCount} reviews</span>
                {trip.traveler.isSuperTraveler && (
                  <span className="ml-2 bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">
                    Super Traveler
                  </span>
                )}
              </div> */}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              ${trip.pricingDetails.baseRate}
              <span className="text-sm text-gray-400 font-normal ml-1">
                +${trip.pricingDetails.perKgRate}/kg
              </span>
            </div>
            {trip.pricingDetails.express > 0 && (
              <div className="text-sm text-gray-400">
                Express available (+${trip.pricingDetails.express})
              </div>
            )}
          </div>
        </div>

        {/* Route Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <FiMapPin className="mt-1 mr-3 text-blue-400" />
            <div className="flex-1">
              <div className="text-white font-medium">
                {trip.tripDetails.departureLocation}
              </div>
              {/* {trip.route.stops && trip.route.stops.length > 0 && (
                <div className="relative mx-2 my-2">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-700" />
                  {trip.route.stops.map((stop, index) => (
                    <div
                      key={index}
                      className="relative flex items-center ml-3 mb-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-600 absolute -left-4" />
                      <span className="text-gray-400 text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              )} */}
              <div className="text-white font-medium mt-1">
                {trip.tripDetails.arrivalLocation}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-center">
            <FiCalendar className="mr-3 text-green-400" />
            <div>
              <div className="text-white">
                {format(parseISO(trip.tripDetails.departureDateTime), 'MMM d')}{' '}
                -{' '}
                {format(
                  parseISO(trip.tripDetails.arrivalDateTime),
                  'MMM d, yyyy',
                )}
              </div>
              {/* {trip.dates.flexibility > 0 && (
                <div className="text-gray-400 text-sm">
                  ±{trip.dates.flexibility} days flexible
                </div>
              )} */}
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center">
            <FiPackage className="mr-3 text-purple-400" />
            <div>
              <div className="text-white">
                {trip.pricingDetails.weight} kg available
              </div>
              <div className="text-gray-400 text-sm">
                Max {trip.transportDetails.maxWeightCapacity} kg per package
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {/* {trip.description && (
          <div className="mb-6">
            <div className="text-gray-300 text-sm">
              {showFullDescription
                ? trip.description
                : trip.description.slice(0, 100)}
              {trip.description.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="ml-1 text-blue-400 hover:text-blue-300"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
        )} */}

        {/* Preferences */}
        <div className="space-y-4">
          {/* Accepted Items */}
          {/* <div>
            <div className="text-sm text-gray-400 mb-2">Accepted Items:</div>
            <div className="flex flex-wrap gap-2">
              {trip.preferences.acceptedTypes.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div> */}

          {/* Restrictions */}
          {/* {trip.preferences.restrictions.length > 0 && (
            <div>
              <div className="text-sm text-gray-400 mb-2">Restrictions:</div>
              <div className="flex flex-wrap gap-2">
                {trip.preferences.restrictions.map((restriction, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-3 gap-4 py-4 mt-4 border-t border-gray-700">
          <div>
            <div className="text-gray-400 text-sm">Response</div>
            <div className="text-white flex items-center">
              <FiClock className="mr-1 text-blue-400" />
              {trip.stats.responseTime}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Success</div>
            <div className="text-white flex items-center">
              <FiCheck className="mr-1 text-green-400" />
              {trip.stats.successRate}%
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Trips</div>
            <div className="text-white flex items-center">
              <FiTruck className="mr-1 text-purple-400" />
              {trip.stats.completedTrips}
            </div>
          </div>
        </div> */}

        {/* Main Actions */}
        <div className="flex space-x-4 mt-4 pt-4 border-t border-gray-700">
          <Link
            href={`/traveler/${trip.traveler.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            View Details
          </Link>
          {onChatClick && (
            <button
              onClick={() => onChatClick(trip.traveler.id, trip.id)}
              className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Chat Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default TripCard;
