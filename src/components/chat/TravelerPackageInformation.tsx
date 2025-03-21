import { TRIP_DETAIL } from '@/app/traveler/redux/tripsAction';
import { useEffect } from 'react';
import {
  FiPackage,
  FiMap,
  FiCalendar,
  FiDollarSign,
  FiShield,
  FiClock,
  FiTruck,
  FiAlertTriangle,
  FiInfo,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const TravelerPackageInformation = ({ onClose, packageId }) => {
  const { singlePackage } = useSelector((state) => state.trips);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!packageId) return;
    dispatch({ type: TRIP_DETAIL, payload: packageId });
  }, [packageId]);

  if (!singlePackage) return null;

  const {
    id,
    tripDetails,
    pricingDetails,
    transportDetails,
    status,
    traveler,
    arrivalLocation,
    departureLocation,
  } = singlePackage;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gray-900 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
          aria-label="Close dialog"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pr-12">
          <h2 className="text-xl font-semibold mb-6">
            Traveler Package Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FiPackage className="text-blue-400" />
              <span className="font-medium">ID:</span>
              <span className="text-gray-300">{id}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMap className="text-green-400" />
              <span className="font-medium">Route:</span>
              <span className="text-gray-300">
                {departureLocation?.city} → {arrivalLocation?.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-purple-400" />
              <span className="font-medium">Delivery Date:</span>
              <span className="text-gray-300">
                {tripDetails?.arrivalDateTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-yellow-400" />
              <span className="font-medium">Price:</span>
              <span className="text-gray-300">
                ${pricingDetails?.totalPrice}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400">Weight:</span>
                <div className="text-white">{pricingDetails?.weight} kg</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-3">Special Instructions</h3>
            <div className="bg-gray-800 p-3 rounded-lg">
              <FiInfo className="inline-block mr-2 text-blue-400" />
              {transportDetails?.speicalInstructions ||
                'No special instructions'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerPackageInformation;
