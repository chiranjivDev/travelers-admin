'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  FiStar,
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiCheck,
  FiClock,
  FiMessageSquare,
  FiFlag,
} from 'react-icons/fi';
import { MOCK_USERS } from '@/data/mockUsers';
import Avatar from '@/components/common/Avatar';
import TripCard from '@/components/trips/TripCard';
import { useNotification } from '@/contexts/NotificationContext';
import { MOCK_TRIPS } from '../redux/tripsSaga';
import { useDispatch, useSelector } from 'react-redux';
import { TRAVELER_DETAIL, TRAVELER_PACKAGES } from '../redux/tripsAction';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { TRAVELER_REVIEWS } from './reviews/redux/reviewsAction';

export default function TravelerProfile() {
  const { travelerPackages, traveler, travelerLoading } = useSelector(
    (state) => state.trips,
  );
  const { reviews: travelerReviews } = useSelector((state) => state.reviews);

  const params = useParams();
  const { showNotification } = useNotification();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const travelerId = params?.id as string;

  const { user } = useAuth();

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce(
      (sum: number, review) => sum + review.rating,
      0,
    );
    const average = totalRating / reviews.length;
    return average % 1 === 0
      ? average.toString()
      : average.toFixed(2).replace(/\.?0+$/, '');
  };

  const t = useTranslations('TravelerProfile');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: TRAVELER_DETAIL, payload: travelerId });
    dispatch({ type: TRAVELER_REVIEWS, payload: travelerId });
  }, [travelerId]);

  useEffect(() => {
    dispatch({
      type: TRAVELER_PACKAGES,
      payload: { travelerId: travelerId },
    });
  }, [travelerId]);
  if (travelerLoading) {
    return (
      <div className="container min-h-[70vh] flex items-center justify-center mx-auto px-4 py-20">
        <div className="text-center text-gray-400 flex flex-col gap-4 items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-b-gray-300 animate-spin"></div>
          <div>Loading traveler details...</div>
        </div>
      </div>
    );
  }

  if (!travelerId || !traveler) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">Traveler not found</div>
      </div>
    );
  }

  const handleChatClick = (travelerId: string) => {
    showNotification('Opening chat...', 'info');
  };

  const handleReport = () => {
    showNotification('Report submitted', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar
              src={traveler.picture_url || '/default-avatar.png'}
              alt={traveler.name || 'Unknown Traveler'}
              size={80}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {traveler.name || 'No Name Provided'}
                {traveler.is_email_verified && (
                  <span className="ml-2 px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">
                    Verified
                  </span>
                )}
              </h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <div className="flex items-center">
                  <FiStar className="mr-1 text-yellow-500" />
                  <span className="font-medium text-white">
                    {calculateAverageRating(travelerReviews) ?? 'N/A'}
                  </span>
                  {travelerReviews.length > 0 ? (
                    <Link
                      href={`/traveler/${travelerId}/reviews`}
                      className="ml-1 hover:underline"
                      style={{
                        color: travelerReviews.length ? 'white' : 'gray',
                      }}
                    >
                      ({travelerReviews.length ?? 0} {t('reviews')})
                    </Link>
                  ) : (
                    <span className="ml-1">(0 {t('reviews')})</span>
                  )}
                </div>
                <div>
                  <span className="font-medium text-white">
                    {traveler.completedTrips ?? 0}
                  </span>
                  <span className="ml-1">{t('tripsCompleted')}</span>
                </div>
              </div>
              {traveler.languages?.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Languages</div>
                  <div className="flex space-x-2">
                    {traveler.languages.map((lang) => (
                      <span
                        key={lang}
                        className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {user?.permissions === 'sender' && (
              <Link
                href={`/feedback?travelerId=${travelerId}&travelerName=${traveler.name}`}
                className="px-4 py-2 flex items-center justify-center bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <FiStar className="inline-block mr-2" color="#ffffff" />
                <span className="text-white">{t('reviewButton')}</span>
              </Link>
            )}
            <button
              onClick={() => handleChatClick(traveler.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiMessageSquare className="inline-block mr-2" />
              {t('messageButton')}
            </button>
            <button
              onClick={handleReport}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
              title="Report User"
            >
              <FiFlag />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-8 pt-6 border-t border-gray-700">
          <div>
            <div className="text-gray-400 text-sm">{t('responseTime')}</div>
            <div className="mt-1 text-white flex items-center">
              <FiClock className="mr-2 text-blue-400" />
              {traveler.stats?.responseTime ?? 'Unknown'}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">{t('successRate')}</div>
            <div className="mt-1 text-white flex items-center">
              <FiCheck className="mr-2 text-green-400" />
              {traveler.stats?.successRate
                ? `${traveler.stats.successRate}%`
                : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">{t('completedTrips')}</div>
            <div className="mt-1 text-white flex items-center">
              <FiPackage className="mr-2 text-purple-400" />
              {traveler.stats?.completedTrips ?? 0}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">{t('memberSince')}</div>
            <div className="mt-1 text-white flex items-center">
              <FiCalendar className="mr-2 text-yellow-400" />
              {traveler.created_at
                ? new Date(traveler.created_at).toLocaleDateString()
                : 'Unknown'}
            </div>
          </div>
        </div>

        {/* About */}
        {traveler.about && (
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-2">About</h2>
            <p className="text-gray-300">
              {traveler.about || 'No information available.'}
            </p>
          </div>
        )}
      </div>

      {/* Trips */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">{t('activeTrips')}</h2>
        {travelerPackages.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {travelerPackages
              .filter((trip) => trip.status === 'active')
              .map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onChatClick={handleChatClick}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">No active trips</div>
        )}
      </div>
    </div>
  );
}
