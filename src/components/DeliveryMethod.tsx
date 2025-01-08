'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeliveryMethodProps {
  type: 'pickup' | 'delivery';
  value: any;
  onChange: (method: any) => void;
  className?: string;
}

interface LocationDetails {
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
}

interface PreferredTimes {
  morning?: boolean;
  afternoon?: boolean;
  evening?: boolean;
  specific?: string;
  flexibleDays?: boolean;
  preferredDays?: string[];
}

interface CommunicationPreferences {
  whatsapp?: boolean;
  phone?: boolean;
  email?: boolean;
  inApp?: boolean;
  preferredNumber?: string;
  preferredEmail?: string;
  languagePreference?: string;
  allowDirectMessaging: boolean;
  availableHours?: {
    start: string;
    end: string;
  };
  preferredLanguages: string[];
}

interface DateRange {
  startDate: string;
  endDate: string;
  isFlexible: boolean;
  preferredTimes?: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
}

interface DeliveryTiming {
  sendingDate: {
    preferredDate: string;
    isFlexible: boolean;
    flexibleRange?: {
      startDate: string;
      endDate: string;
    };
  };
  deliveryDate: {
    preferredDate: string;
    isFlexible: boolean;
    flexibleRange?: {
      startDate: string;
      endDate: string;
    };
  };
}

interface PackageDetails {
  weight: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

interface DeliverySetupValue {
  defaultLocation: LocationDetails;
  allowPostalDelivery: boolean;
  postalDeliveryDetails?: {
    senderCity: string;
    travelerCity: string;
    senderPaysPostal: boolean;
  };
  timing: DeliveryTiming;
  preferredTimes: PreferredTimes;
  flexibleLocation: boolean;
  isOpenOffer: boolean;
  communicationPreferences: CommunicationPreferences;
  notes: string;
  packageHandling?: {
    requiresCarefulHandling: boolean;
    isFragile: boolean;
    specialInstructions?: string;
  };
  packageDetails?: PackageDetails;
}

const Tooltip = ({ content, children }: { content: string; children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  
  const handleMouseEnter = () => {
    setIsVisible(true);
    if (!hasBeenSeen) {
      setHasBeenSeen(true);
    }
  };

  return (
    <div className="relative inline-flex items-center group">
      <div className="mr-3">{children}</div>
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex items-center justify-center cursor-help relative"
        whileHover={{ scale: 1.15 }}
        animate={hasBeenSeen ? {} : {
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <div className={`
          relative flex items-center justify-center
          w-6 h-6 rounded-full
          bg-gradient-to-br from-blue-400 to-blue-600
          dark:from-blue-500 dark:to-blue-700
          ${!hasBeenSeen ? 'animate-pulse' : ''}
          group-hover:from-blue-500 group-hover:to-blue-700
          dark:group-hover:from-blue-400 dark:group-hover:to-blue-600
          transition-all duration-300 ease-in-out
          shadow-md hover:shadow-lg
          border-2 border-white dark:border-gray-800
        `}>
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full animate-[ripple_2s_infinite] bg-blue-400 opacity-0"/>
          
          {/* Attention indicator */}
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-[ping_2s_infinite]"/>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"/>
          </div>

          {/* Info icon */}
          <span className="text-white dark:text-white text-sm font-semibold">i</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={isVisible ? { 
          opacity: 1, 
          scale: 1, 
          x: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        } : { 
          opacity: 0, 
          scale: 0.9, 
          x: -20
        }}
        className={`
          absolute z-50 w-80 p-5
          bg-gradient-to-br from-white via-blue-50 to-white
          dark:from-gray-800 dark:via-gray-850 dark:to-gray-800
          rounded-xl shadow-2xl
          border border-blue-100/50 dark:border-blue-900/50
          ${isVisible ? 'visible' : 'invisible pointer-events-none'}
          left-full ml-3
          backdrop-blur-sm
          after:content-['']
          after:absolute
          after:top-[50%]
          after:-left-2.5
          after:w-5
          after:h-5
          after:bg-gradient-to-br
          after:from-white
          after:to-blue-50
          after:dark:from-gray-800
          after:dark:to-gray-850
          after:transform
          after:rotate-45
          after:-translate-y-1/2
          after:border-l
          after:border-b
          after:border-blue-100/50
          after:dark:border-blue-900/50
        `}
      >
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.1 }
          } : { 
            opacity: 0, 
            y: 10 
          }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-blue-500"
            >
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-gray-900 dark:text-white text-base">Help Info</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ContactDetails Component
const ContactDetails = ({ 
  value,
  onChange,
  className 
}: { 
  value: any;
  onChange: (value: any) => void;
  className?: string;
}) => {
  return (
    <div 
      className="space-y-3 pl-4 border-l-2 border-gray-200 transition-all duration-200 ease-in-out"
    >
      <div className="space-y-3">
        <input
          type="tel"
          placeholder="Phone number (for calls/WhatsApp)"
          value={value?.communicationPreferences?.preferredNumber || ''}
          onChange={(e) => onChange({
            ...value,
            communicationPreferences: {
              ...value?.communicationPreferences,
              preferredNumber: e.target.value
            }
          })}
          className={className}
        />
        <input
          type="email"
          placeholder="Email address"
          value={value?.communicationPreferences?.preferredEmail || ''}
          onChange={(e) => onChange({
            ...value,
            communicationPreferences: {
              ...value?.communicationPreferences,
              preferredEmail: e.target.value
            }
          })}
          className={className}
        />
        <select
          value={value?.communicationPreferences?.languagePreference || ''}
          onChange={(e) => onChange({
            ...value,
            communicationPreferences: {
              ...value?.communicationPreferences,
              languagePreference: e.target.value
            }
          })}
          className={className}
        >
          <option value="">Preferred Language</option>
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="fa">Persian</option>
        </select>
      </div>
    </div>
  );
};

// Add these constants for the weight categories
const WEIGHT_CATEGORIES = [
  { label: '1-5 kg', value: '1-5' },
  { label: '6-10 kg', value: '6-10' },
  { label: '11-15 kg', value: '11-15' },
  { label: '16-20 kg', value: '16-20' },
  { label: '20+ kg', value: '20+' }
];

const SIZE_CATEGORIES = [
  { 
    label: 'Small', 
    value: 'small',
    description: 'Up to 35x25x10 cm'
  },
  { 
    label: 'Medium', 
    value: 'medium',
    description: 'Up to 50x35x25 cm'
  },
  { 
    label: 'Large', 
    value: 'large',
    description: 'Up to 70x50x35 cm'
  },
  { 
    label: 'Custom', 
    value: 'custom',
    description: 'Specify dimensions'
  }
];

export default function DeliveryMethod({ type, value, onChange, className }: DeliveryMethodProps) {
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const totalSteps = 3;

  const inputClassName = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm transition-colors duration-200 placeholder-gray-500";
  const checkboxClassName = "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors duration-200";
  const labelClassName = "text-sm font-medium text-gray-700 mb-1 block";
  const selectClassName = "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm transition-colors duration-200";

  const steps = [
    {
      id: 1,
      title: "Package Origin",
      subtitle: type === 'pickup' ? "Where should the traveler collect your package?" : "Where are you sending from?",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Delivery Setup",
      subtitle: "Set your package handling and timing preferences",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Coordination Details",
      subtitle: "How would you like to coordinate with the traveler?",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      )
    }
  ];

  const handleLocationChange = (field: keyof LocationDetails, fieldValue: string) => {
    onChange({
      ...value,
      defaultLocation: {
        ...value.defaultLocation,
        [field]: fieldValue
      }
    });
  };

  const handleTimeChange = (time: keyof PreferredTimes, checked: boolean) => {
    onChange({
      ...value,
      preferredTimes: {
        ...value.preferredTimes,
        [time]: checked
      }
    });
  };

  const handleCommunicationChange = (method: keyof CommunicationPreferences, checked: boolean) => {
    onChange({
      ...value,
      communicationPreferences: {
        ...value.communicationPreferences,
        [method]: checked
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center w-1/3 ${
                step.id === currentStep ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${step.id <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                  ${step.id === currentStep ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                `}
              >
                {step.icon}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-0.5">{step.title}</p>
                <p className="text-xs text-gray-500 max-w-[120px] mx-auto">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-200 rounded">
          <div
            className="absolute h-full bg-blue-600 rounded transition-all duration-300 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {/* Step Header */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg shrink-0">
              {steps[currentStep - 1].icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Step 1: Package Origin */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Tooltip content={type === 'pickup' 
                      ? "Enter your preferred location for package handover. This could be your address or a convenient meeting point."
                      : "Enter the recipient's location for package delivery."}>
                      Default {type === 'pickup' ? 'Pickup' : 'Delivery'} Location
                    </Tooltip>
                  </h3>
                  <div className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="address" className={labelClassName}>
                        Street Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={value?.defaultLocation?.address || ''}
                        onChange={(e) => handleLocationChange('address', e.target.value)}
                        className={inputClassName}
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="city" className={labelClassName}>
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={value?.defaultLocation?.city || ''}
                          onChange={(e) => handleLocationChange('city', e.target.value)}
                          className={inputClassName}
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="postalCode" className={labelClassName}>
                          Postal Code
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          value={value?.defaultLocation?.postalCode || ''}
                          onChange={(e) => handleLocationChange('postalCode', e.target.value)}
                          className={inputClassName}
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Setup */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Tooltip content="Specify any special handling requirements for your package.">
                      Package Handling
                    </Tooltip>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value?.packageHandling?.requiresCarefulHandling || false}
                          onChange={(e) => onChange({
                            ...value,
                            packageHandling: {
                              ...value?.packageHandling,
                              requiresCarefulHandling: e.target.checked
                            }
                          })}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">Requires Careful Handling</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value?.packageHandling?.isFragile || false}
                          onChange={(e) => onChange({
                            ...value,
                            packageHandling: {
                              ...value?.packageHandling,
                              isFragile: e.target.checked
                            }
                          })}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">Fragile Items</span>
                      </label>
                    </div>
                    <textarea
                      placeholder="Special handling instructions..."
                      value={value?.packageHandling?.specialInstructions || ''}
                      onChange={(e) => onChange({
                        ...value,
                        packageHandling: {
                          ...value?.packageHandling,
                          specialInstructions: e.target.value
                        }
                      })}
                      className={inputClassName}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      <Tooltip content="Select your preferred dates for sending and receiving the package">
                        Package Timeline
                      </Tooltip>
                    </h3>

                    {/* Sending Date */}
                    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="text-md font-medium text-gray-900">Sending Date</h4>
                      <div>
                        <label className={labelClassName}>When do you want to send the package?</label>
                        <input
                          type="date"
                          value={value?.timing?.sendingDate?.preferredDate || ''}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => onChange({
                            ...value,
                            timing: {
                              ...value?.timing,
                              sendingDate: {
                                ...value?.timing?.sendingDate,
                                preferredDate: e.target.value
                              }
                            }
                          })}
                          className={inputClassName}
                          required
                          aria-label="Select sending date"
                        />
                      </div>

                      <label className="flex items-center space-x-2 mt-2">
                        <input
                          type="checkbox"
                          checked={value?.timing?.sendingDate?.isFlexible || false}
                          onChange={(e) => onChange({
                            ...value,
                            timing: {
                              ...value?.timing,
                              sendingDate: {
                                ...value?.timing?.sendingDate,
                                isFlexible: e.target.checked
                              }
                            }
                          })}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">I'm flexible with the sending date</span>
                      </label>

                      {value?.timing?.sendingDate?.isFlexible && (
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <label className={labelClassName}>Earliest Possible Date</label>
                            <input
                              type="date"
                              value={value?.timing?.sendingDate?.flexibleRange?.startDate || ''}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => onChange({
                                ...value,
                                timing: {
                                  ...value?.timing,
                                  sendingDate: {
                                    ...value?.timing?.sendingDate,
                                    flexibleRange: {
                                      ...value?.timing?.sendingDate?.flexibleRange,
                                      startDate: e.target.value
                                    }
                                  }
                                }
                              })}
                              className={inputClassName}
                              aria-label="Earliest possible sending date"
                            />
                          </div>
                          <div>
                            <label className={labelClassName}>Latest Possible Date</label>
                            <input
                              type="date"
                              value={value?.timing?.sendingDate?.flexibleRange?.endDate || ''}
                              min={value?.timing?.sendingDate?.flexibleRange?.startDate || new Date().toISOString().split('T')[0]}
                              onChange={(e) => onChange({
                                ...value,
                                timing: {
                                  ...value?.timing,
                                  sendingDate: {
                                    ...value?.timing?.sendingDate,
                                    flexibleRange: {
                                      ...value?.timing?.sendingDate?.flexibleRange,
                                      endDate: e.target.value
                                    }
                                  }
                                }
                              })}
                              className={inputClassName}
                              aria-label="Latest possible sending date"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Delivery Date */}
                    <div className="space-y-4 mt-6 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="text-md font-medium text-gray-900">Delivery Date</h4>
                      <div>
                        <label className={labelClassName}>When should the package be delivered?</label>
                        <input
                          type="date"
                          value={value?.timing?.deliveryDate?.preferredDate || ''}
                          min={value?.timing?.sendingDate?.preferredDate || new Date().toISOString().split('T')[0]}
                          onChange={(e) => onChange({
                            ...value,
                            timing: {
                              ...value?.timing,
                              deliveryDate: {
                                ...value?.timing?.deliveryDate,
                                preferredDate: e.target.value
                              }
                            }
                          })}
                          className={inputClassName}
                          required
                          aria-label="Select delivery date"
                        />
                      </div>

                      <label className="flex items-center space-x-2 mt-2">
                        <input
                          type="checkbox"
                          checked={value?.timing?.deliveryDate?.isFlexible || false}
                          onChange={(e) => onChange({
                            ...value,
                            timing: {
                              ...value?.timing,
                              deliveryDate: {
                                ...value?.timing?.deliveryDate,
                                isFlexible: e.target.checked
                              }
                            }
                          })}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">I'm flexible with the delivery date</span>
                      </label>

                      {value?.timing?.deliveryDate?.isFlexible && (
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <label className={labelClassName}>Earliest Acceptable Date</label>
                            <input
                              type="date"
                              value={value?.timing?.deliveryDate?.flexibleRange?.startDate || ''}
                              min={value?.timing?.sendingDate?.preferredDate || new Date().toISOString().split('T')[0]}
                              onChange={(e) => onChange({
                                ...value,
                                timing: {
                                  ...value?.timing,
                                  deliveryDate: {
                                    ...value?.timing?.deliveryDate,
                                    flexibleRange: {
                                      ...value?.timing?.deliveryDate?.flexibleRange,
                                      startDate: e.target.value
                                    }
                                  }
                                }
                              })}
                              className={inputClassName}
                              aria-label="Earliest acceptable delivery date"
                            />
                          </div>
                          <div>
                            <label className={labelClassName}>Latest Acceptable Date</label>
                            <input
                              type="date"
                              value={value?.timing?.deliveryDate?.flexibleRange?.endDate || ''}
                              min={value?.timing?.deliveryDate?.flexibleRange?.startDate || new Date().toISOString().split('T')[0]}
                              onChange={(e) => onChange({
                                ...value,
                                timing: {
                                  ...value?.timing,
                                  deliveryDate: {
                                    ...value?.timing?.deliveryDate,
                                    flexibleRange: {
                                      ...value?.timing?.deliveryDate?.flexibleRange,
                                      endDate: e.target.value
                                    }
                                  }
                                }
                              })}
                              className={inputClassName}
                              aria-label="Latest acceptable delivery date"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      <Tooltip content="Specify delivery preferences and postal options">
                        Delivery Preferences
                      </Tooltip>
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value?.allowPostalDelivery || false}
                          onChange={(e) => onChange({
                            ...value,
                            allowPostalDelivery: e.target.checked
                          })}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">Allow postal delivery if needed</span>
                      </label>
                      
                      {value?.allowPostalDelivery && (
                        <div className="ml-6 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800 mb-2">
                            Note: If the traveler is in a different city, postal delivery costs will be covered by you (the sender).
                          </p>
                          <div className="space-y-3">
                            <div>
                              <label className={labelClassName}>Your City</label>
                              <input
                                type="text"
                                value={value?.postalDeliveryDetails?.senderCity || ''}
                                onChange={(e) => onChange({
                                  ...value,
                                  postalDeliveryDetails: {
                                    ...value?.postalDeliveryDetails,
                                    senderCity: e.target.value,
                                    senderPaysPostal: true
                                  }
                                })}
                                className={inputClassName}
                                placeholder="Enter your city"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Tooltip content="Select your preferred time slots for the handover. This helps travelers know when you're available.">
                      Preferred Times
                    </Tooltip>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value?.preferredTimes?.morning || false}
                          onChange={(e) => handleTimeChange('morning', e.target.checked)}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">Morning (8 AM - 12 PM)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value?.preferredTimes?.afternoon || false}
                          onChange={(e) => handleTimeChange('afternoon', e.target.checked)}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">Afternoon (12 PM - 5 PM)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value?.preferredTimes?.evening || false}
                          onChange={(e) => handleTimeChange('evening', e.target.checked)}
                          className={checkboxClassName}
                        />
                        <span className="text-sm text-gray-700">Evening (5 PM - 9 PM)</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value?.preferredTimes?.flexibleDays || false}
                        onChange={(e) => handleTimeChange('flexibleDays', e.target.checked)}
                        className={checkboxClassName}
                        title="Indicate if you are flexible with delivery days"
                      />
                      <span className="text-sm text-gray-700">Flexible with days</span>
                    </div>
                    <div className="mt-2">
                      <input
                        type="time"
                        value={value?.preferredTimes?.specific || ''}
                        onChange={(e) => onChange({
                          ...value,
                          preferredTimes: {
                            ...value.preferredTimes,
                            specific: e.target.value
                          }
                        })}
                        className={inputClassName}
                        placeholder="Specific time (optional)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional: Set a specific preferred time</p>
                    </div>
                  </div>
                </div>

                {currentStep === 3 && type === 'pickup' && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Package Verification</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Please verify the package details during pickup. This helps ensure smooth delivery and proper handling.
                    </p>
                    
                    {/* Weight Input */}
                    <div className="mb-6">
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Package Weight (kg)
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          id="weight"
                          min="0.1"
                          step="0.1"
                          value={value?.packageDetails?.weight || ''}
                          onChange={(e) => {
                            const newValue = {
                              ...value,
                              packageDetails: {
                                ...value?.packageDetails,
                                weight: e.target.value
                              }
                            };
                            onChange(newValue);
                          }}
                          className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter weight"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Package Dimensions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Dimensions (cm)
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['length', 'width', 'height'].map((dimension) => (
                          <div key={dimension}>
                            <label htmlFor={dimension} className="block text-xs text-gray-500 capitalize mb-1">
                              {dimension}
                            </label>
                            <div className="relative rounded-md shadow-sm">
                              <input
                                type="number"
                                id={dimension}
                                min="1"
                                value={value?.packageDetails?.dimensions?.[dimension as keyof typeof value.packageDetails.dimensions] || ''}
                                onChange={(e) => {
                                  const newValue = {
                                    ...value,
                                    packageDetails: {
                                      ...value?.packageDetails,
                                      dimensions: {
                                        ...value?.packageDetails?.dimensions,
                                        [dimension]: parseFloat(e.target.value)
                                      }
                                    }
                                  };
                                  onChange(newValue);
                                }}
                                className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">cm</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Please measure the package accurately to ensure proper handling and delivery.
                      </p>
                    </div>

                    {/* Package Verification Checklist */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Verification Checklist</h4>
                      <div className="space-y-3">
                        {[
                          'Package is properly sealed and secure',
                          'Weight and dimensions are accurately measured',
                          'Package contents match the description',
                          'No prohibited items included'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                            </div>
                            <label className="ml-3 text-sm text-gray-600">
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Communication & Notes */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Tooltip content="Set up how you want to communicate with travelers">
                      Communication Preferences
                    </Tooltip>
                  </h3>

                  {/* Primary Communication Method */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Secure In-App Messaging</h4>
                        <p className="text-sm text-blue-600 mt-1">
                          Our secure in-app messaging system protects your privacy by keeping your contact details private until you choose to share them.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* In-App Messaging Toggle */}
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value?.communicationPreferences?.allowDirectMessaging || false}
                        onChange={(e) => onChange({
                          ...value,
                          communicationPreferences: {
                            ...value?.communicationPreferences,
                            allowDirectMessaging: e.target.checked
                          }
                        })}
                        className={checkboxClassName}
                      />
                      <span className="text-sm text-gray-700">Enable secure in-app messaging</span>
                    </label>
                  </div>

                  {/* Optional Additional Contact Methods */}
                  <div className="mt-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Additional Contact Methods (Optional)</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your contact information will remain private and will only be shared with matched travelers after you approve them.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 ml-4">
                      {/* Contact Method Toggles */}
                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={value?.communicationPreferences?.whatsapp || false}
                            onChange={(e) => onChange({
                              ...value,
                              communicationPreferences: {
                                ...value?.communicationPreferences,
                                whatsapp: e.target.checked
                              }
                            })}
                            className={checkboxClassName}
                          />
                          <span className="text-sm text-gray-700">WhatsApp</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={value?.communicationPreferences?.phone || false}
                            onChange={(e) => onChange({
                              ...value,
                              communicationPreferences: {
                                ...value?.communicationPreferences,
                                phone: e.target.checked
                              }
                            })}
                            className={checkboxClassName}
                          />
                          <span className="text-sm text-gray-700">Phone Call</span>
                        </label>
                      </div>

                      {/* Contact Details Section */}
                      {(value?.communicationPreferences?.whatsapp || value?.communicationPreferences?.phone) && (
                        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                          <div>
                            <label className={labelClassName}>Phone Number</label>
                            <input
                              type="tel"
                              placeholder="Will be shared only after your approval"
                              value={value?.communicationPreferences?.preferredNumber || ''}
                              onChange={(e) => onChange({
                                ...value,
                                communicationPreferences: {
                                  ...value?.communicationPreferences,
                                  preferredNumber: e.target.value
                                }
                              })}
                              className={inputClassName}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              ⚠️ Your number will remain private until you approve a specific traveler
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Language Preference */}
                      <div>
                        <label className={labelClassName}>Preferred Language</label>
                        <select
                          value={value?.communicationPreferences?.languagePreference || ''}
                          onChange={(e) => onChange({
                            ...value,
                            communicationPreferences: {
                              ...value?.communicationPreferences,
                              languagePreference: e.target.value
                            }
                          })}
                          className={selectClassName}
                          aria-label="Select preferred language"
                        >
                          <option value="" className="text-gray-900">Select language</option>
                          <option value="en" className="text-gray-900">English</option>
                          <option value="de" className="text-gray-900">German</option>
                          <option value="fr" className="text-gray-900">French</option>
                          <option value="es" className="text-gray-900">Spanish</option>
                          <option value="ar" className="text-gray-900">Arabic</option>
                          <option value="fa" className="text-gray-900">Persian</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    <Tooltip content="Add any additional information that might be helpful for coordinating the delivery.">
                      Additional Notes
                    </Tooltip>
                  </h3>
                  <textarea
                    placeholder="Add any special instructions or notes for coordination..."
                    value={value?.notes || ''}
                    onChange={(e) => onChange({ ...value, notes: e.target.value })}
                    className={inputClassName}
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => currentStep > 1 && setCurrentStep(prev => prev - 1)}
          className={`
            px-6 py-2 rounded-md flex items-center space-x-2
            ${currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }
            transition-colors duration-200
          `}
          disabled={currentStep === 1}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </button>

        <button
          onClick={() => currentStep < totalSteps && setCurrentStep(prev => prev + 1)}
          className={`
            px-6 py-2 rounded-md flex items-center space-x-2 text-white
            ${currentStep === totalSteps
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
            }
            transition-colors duration-200
          `}
        >
          <span>{currentStep === totalSteps ? 'Complete' : 'Continue'}</span>
          {currentStep !== totalSteps && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
