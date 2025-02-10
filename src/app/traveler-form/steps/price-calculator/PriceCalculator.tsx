import React, { useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/Tooltip';

const PriceCalculator = ({ register, errors, setValue, watch }) => {
  // Simplified pricing constants
  const RATES = {
    DISTANCE_FACTOR: 1, // €1 per 1000km
    PACKAGE_TYPE_MULTIPLIERS: {
      documents: 1.0,
      electronics: 1.15,
      personal: 1.0,
      gifts: 1.0,
      medical: 1.2,
    },
    URGENT_DELIVERY_MULTIPLIER: 1.2, // 20% increase for urgent delivery
  };

  // Watch form values
  const baseRate = watch('pricing.ratePerKg', 0);
  const weight = watch('pricing.weight', 0);
  const distance = watch('pricing.distance', 0);
  const packageType = watch('pricing.packageType', '');
  const urgentDelivery = watch('pricing.urgentDelivery', false);
  const totalCost = watch('pricing.totalCost');

  // Calculate total Price
  // Total Price = Base Rate Cost + Package Cost + Distance Cost + Urgent Delivery Cost (if any)

  const calculateTotalCost = ({
    baseRate,
    weight,
    distance,
    packageType,
    urgentDelivery,
    rates,
  }) => {
    if (!baseRate || !weight || !distance || !packageType) {
      return '';
    }

    const baseCost = parseFloat(baseRate) * parseFloat(weight);
    const distanceCost = (parseFloat(distance) / 1000) * rates.DISTANCE_FACTOR;
    const packageMultiplier =
      rates.PACKAGE_TYPE_MULTIPLIERS[packageType] || 1.0;
    const urgentMultiplier = urgentDelivery
      ? rates.URGENT_DELIVERY_MULTIPLIER
      : 1.0;

    const totalCost =
      (baseCost + distanceCost) * packageMultiplier * urgentMultiplier;

    return {
      baseCost: baseCost.toFixed(2), // Base cost with 2 decimal places
      totalCost: totalCost.toFixed(2), // Total cost with 2 decimal places
    };
  };

  useEffect(() => {
    const result = calculateTotalCost({
      baseRate,
      weight,
      distance,
      packageType,
      urgentDelivery,
      rates: RATES,
    });

    if (result) {
      setValue('pricing.baseRate', result.baseCost); // Set the base cost
      setValue('pricing.totalCost', result.totalCost); // Set the total cost
    } else {
      setValue('pricing.totalCost', ''); // Reset total cost if inputs are invalid
    }
  }, [baseRate, weight, distance, packageType, urgentDelivery, setValue]);

  return (
    <div className="relative">
      {/* Optimized cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-800/15 to-pink-900/20 rounded-xl blur-2xl -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div
        className="bg-[#0c1222]/90 backdrop-blur-md rounded-xl p-6 shadow-lg ring-1 ring-white/10 relative
        will-change-transform
        transition-all duration-150
        hover:ring-2 hover:ring-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]
        hover:translate-y-[-2px]"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span
            className="text-2xl filter drop-shadow-md transition-transform duration-150 hover:scale-105"
            role="img"
            aria-label="Calculator"
          >
            💫
          </span>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Price Calculator
          </h3>
          <Tooltip content="Calculate your delivery price">
            <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
              <FiInfo className="w-4 h-4 text-indigo-300" />
            </div>
          </Tooltip>
        </div>

        <div className="space-y-4">
          {/* Base Rate */}
          <div
            className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            will-change-transform
            transition-all duration-150
            hover:ring-2 hover:ring-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.05),transparent_70%)] pointer-events-none" />
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Base Rate
              </h4>
              <Tooltip content="Your base delivery rate per kg">
                <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
                  <FiInfo className="w-4 h-4 text-purple-300" />
                </div>
              </Tooltip>
            </div>
            <div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-[#1a2235]/50 border border-gray-700/50 rounded-lg text-white
                  placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                  transition-all duration-150"
                  placeholder="Enter base rate..."
                  {...register('pricing.ratePerKg', {
                    required: 'Per Kg Rate is required',
                  })}
                />
                <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                  <span className="text-gray-400">€/kg</span>
                </div>
              </div>
              {errors.pricing?.ratePerKg && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.pricing?.ratePerKg.message}
                </span>
              )}
            </div>
          </div>

          {/* Package Details */}
          <div
            className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            will-change-transform
            transition-all duration-150
            hover:ring-2 hover:ring-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Package Details
              </h4>
              <Tooltip content="Specify package type and weight">
                <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
                  <FiInfo className="w-4 h-4 text-blue-300" />
                </div>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Package Type
                </label>
                <div className="relative">
                  <select
                    className="w-full p-3 bg-[#1a2235]/50 border border-gray-700/50 rounded-lg text-white
                      appearance-none cursor-pointer
                      transition-all duration-150"
                    {...register('pricing.packageType', {
                      required: 'Please select a package type',
                    })}
                  >
                    <option value="" className="bg-[#0c1222]">
                      Select type...
                    </option>
                    {Object.keys(RATES.PACKAGE_TYPE_MULTIPLIERS).map((type) => (
                      <option key={type} value={type} className="bg-[#0c1222]">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.pricing?.packageType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricing.packageType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Weight (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full p-3 bg-[#1a2235]/50 border border-gray-700/50 rounded-lg text-white
                      placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                      transition-all duration-150"
                    placeholder="Enter weight..."
                    {...register('pricing.weight', {
                      required: 'Weight is required',
                    })}
                  />
                  {errors.pricing?.weight && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.pricing?.weight.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Distance and Urgency */}
          <div
            className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            will-change-transform
            transition-all duration-150
            hover:ring-2 hover:ring-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                Distance & Urgency
              </h4>
              <Tooltip content="Specify travel distance and delivery urgency">
                <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
                  <FiInfo className="w-4 h-4 text-indigo-300" />
                </div>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Distance (km)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="w-full p-3 bg-[#1a2235]/50 border border-gray-700/50 rounded-lg text-white
                      placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                      transition-all duration-150"
                    placeholder="Enter distance..."
                    {...register('pricing.distance', {
                      required: 'Distance is required',
                    })}
                  />
                  {errors.pricing?.distance && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.pricing?.distance.message}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="flex items-center space-x-3 p-2 rounded-lg
                transition-all duration-150 group/urgent relative"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-indigo-800 text-indigo-500 
                    focus:ring-indigo-500 focus:ring-offset-0 
                    transition-transform duration-150 
                    group-hover/urgent:scale-110
                    cursor-pointer"
                  {...register('pricing.urgentDelivery')}
                />
                <label className="text-sm text-gray-200 cursor-pointer">
                  Urgent Delivery (+20%)
                </label>
              </div>
            </div>
          </div>

          {/* Total Price Display */}
          <div
            className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            will-change-transform
            transition-all duration-150
            hover:ring-2 hover:ring-emerald-400/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(52,211,153,0.05),transparent_70%)] pointer-events-none" />
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Total Price
              </h4>
              <span className="text-2xl font-bold text-emerald-400">
                € {totalCost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
