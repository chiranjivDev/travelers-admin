'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRAVELER_DETAIL } from '../../redux/tripsAction';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { traveler } = useSelector((state) => state.trips);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) {
      dispatch({ type: TRAVELER_DETAIL, payload: user.userId });
    }
  }, [dispatch, user?.userId]);

  if (!traveler)
    return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg mt-10 ">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
          {traveler.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{traveler.name}</h2>
          <p className="text-gray-400">{traveler.email}</p>
        </div>
      </div>
      {/* Contact & Status */}
      <div className="mt-6">
        <p className="text-gray-300">
          <strong>📞 Phone:</strong> {traveler.phone}
        </p>
      </div>
      {/* Stripe Account */}
      <div className="mt-6">
        <p className="text-gray-300">
          <strong>💳 Stripe Onboarding:</strong>{' '}
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full shadow-md ${
              traveler.isStripeOnboarded
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {traveler.isStripeOnboarded ? 'Completed' : 'Not Completed'}
          </span>
        </p>
      </div>

      {/* Stripe Account */}
      <div className="mt-6">
        <p className="text-gray-300">
          <strong>💳 Stripe Connect ID:</strong>{' '}
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full shadow-md ${
              traveler.isStripeOnboarded
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {traveler.stripeAccountId}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
