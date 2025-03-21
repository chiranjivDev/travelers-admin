'use client';

import { useEffect } from 'react';
import TripCard from '@/components/trips/TripCard';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/contexts/AuthContext';
import { TRAVELER_PACKAGES } from '../../redux/tripsAction';
import { useTranslations } from 'next-intl';

export default function TravelerTrips() {
  const { travelerPackages } = useSelector((state) => state.trips);
  const t = useTranslations('BrowseTips');

  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.permissions === 'traveler') {
      dispatch({
        type: TRAVELER_PACKAGES,
        payload: { travelerId: user.userId },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
            <p className="text-gray-400 mt-2">
              {travelerPackages.length} {t('tripsAvailable')}
            </p>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelerPackages.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {/* Empty State */}
        {travelerPackages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">{t('noTripsFound')}</div>
          </div>
        )}
      </div>
    </div>
  );
}
