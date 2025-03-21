'use client';
import { FETCH_PACKAGE_BY_ID } from '@/app/sender/dashboard/redux/packagesAction';
import { useCallback, useEffect } from 'react';
import {
  FiAlertTriangle,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiInfo,
  FiMap,
  FiPackage,
  FiShield,
  FiTruck,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

export function PackageInformation({ onClose, packageId }) {
  const { package: senderPackage } = useSelector((state) => state.packages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!packageId) return;
    dispatch({ type: FETCH_PACKAGE_BY_ID, payload: packageId });
  }, [packageId]);

  const handleClose = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Escape') {
        return;
      }
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [handleClose]);

  if (!senderPackage) {
    return null;
  }

  const {
    packageID,
    name,
    price,
    weight,
    status,
    moderationStatus,
    requiresCarefulHandling,
    isFragile,
    specialInstructions,
    insurance,
    priority,
    dimension,
    origin,
    destination,
    pickupDate,
    pickupTime,
    deliveryDate,
    deliveryTime,
  } = senderPackage;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gray-900 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
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
          <h2 className="text-xl font-semibold mb-6">Package Details</h2>

          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FiPackage className="text-blue-400" />
              <span className="font-medium">ID:</span>
              <span className="text-gray-300">{packageID}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiMap className="text-green-400" />
              <span className="font-medium">Route:</span>
              <span className="text-gray-300">
                {origin?.city} → {destination?.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiCalendar className="text-purple-400" />
              <span className="font-medium">Delivery Date:</span>
              <span className="text-gray-300">
                {deliveryDate} at {deliveryTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiDollarSign className="text-yellow-400" />
              <span className="font-medium">Price:</span>
              <span className="text-gray-300">${price}</span>
            </div>
          </div>

          {/* Package Specifications */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400">Weight:</span>
                <div className="text-white">{weight} kg</div>
              </div>
              <div>
                <span className="text-gray-400">Dimensions:</span>
                <div className="text-white">
                  {dimension?.length} x {dimension?.width} x {dimension?.height}
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <FiShield
                  className={insurance ? 'text-green-400' : 'text-gray-500'}
                />
                <span>Insurance</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock
                  className={priority ? 'text-green-400' : 'text-gray-500'}
                />
                <span>Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTruck
                  className={
                    requiresCarefulHandling ? 'text-green-400' : 'text-gray-500'
                  }
                />
                <span>Careful Handling</span>
              </div>
              <div className="flex items-center gap-2">
                <FiAlertTriangle
                  className={isFragile ? 'text-red-400' : 'text-gray-500'}
                />
                <span>Fragile</span>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {specialInstructions && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-3">
                Special Instructions
              </h3>
              <div className="bg-gray-800 p-3 rounded-lg">
                <FiInfo className="inline-block mr-2 text-blue-400" />
                {specialInstructions}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
