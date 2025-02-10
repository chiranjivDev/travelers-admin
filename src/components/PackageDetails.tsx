import React from 'react';
import { motion } from 'framer-motion';

interface PackageDetailsProps {
  value: {
    selectedSize?: 'small' | 'medium' | 'large' | 'custom';
  };
  onChange: (value: any) => void;
}

const PACKAGE_SIZES = [
  {
    id: 'small',
    name: 'Small Package',
    dimensions: '30 × 25 × 10 cm',
    maxWeight: 'Up to 5 kg',
    description: 'Perfect for small items like books, clothes, or electronics',
  },
  {
    id: 'medium',
    name: 'Medium Package',
    dimensions: '50 × 35 × 25 cm',
    maxWeight: 'Up to 10 kg',
    description:
      'Ideal for medium-sized items like home appliances or multiple items',
  },
  {
    id: 'large',
    name: 'Large Package',
    dimensions: '70 × 50 × 35 cm',
    maxWeight: 'Up to 20 kg',
    description: 'Suitable for large items like furniture or bulky equipment',
  },
  {
    id: 'custom',
    name: 'Custom Size',
    dimensions: 'Custom dimensions',
    maxWeight: 'Custom weight',
    description: 'Specify custom dimensions for your package',
  },
];

export default function PackageDetails({
  value,
  onChange,
}: PackageDetailsProps) {
  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Package Details</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          Choose Package Size
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PACKAGE_SIZES.map((size) => (
            <motion.div
              key={size.id}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer
                ${
                  value.selectedSize === size.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...value, selectedSize: size.id })}
            >
              <div className="flex flex-col h-full">
                {/* Package Icon */}
                <div className="mb-3">
                  {size.id === 'custom' ? (
                    <div className="text-blue-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="text-blue-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Package Info */}
                <div>
                  <h4 className="font-medium text-gray-900">{size.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {size.dimensions}
                  </p>
                  <p className="text-sm text-gray-600">{size.maxWeight}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {size.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {value.selectedSize === size.id && (
                  <div className="absolute top-2 right-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {value.selectedSize === 'custom' && (
        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter weight"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Length', 'Width', 'Height'].map((dimension) => (
              <div key={dimension}>
                <label className="block text-sm font-medium text-gray-700">
                  {dimension} (cm)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder={dimension}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
