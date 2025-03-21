import { useTranslations } from 'next-intl';
import React from 'react';

const ProgressHeaders = ({ currentStep }) => {
  const t = useTranslations('SenderForm.progressHeaders');
  const steps = [
    {
      id: 1,
      title: t('packageDetails'),
      subtitle: t('packageDetailsSubtitle'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: t('packagePickup'),
      subtitle: t('packagePickupSubtitle'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: t('deliveryDetails'),
      subtitle: t('deliveryDetailsSubtitle'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: t('communicationPreference'),
      subtitle: t('communicationPreferenceSubtitle'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: t('reviewAndSubmit'),
      subtitle: t('reviewAndSubmitSubtitle'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },

    {
      id: 6,
      title: t('travelerPackage'),
      subtitle: t('travelerPackageSubtitle'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4h10M4 7h16M4 10h16M7 13h10M4 16h16M4 19h16"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {steps.map((s) => (
        <div
          key={s.id}
          className={`flex flex-col items-center max-sm:w-10 ${s.id === currentStep ? 'opacity-100' : 'opacity-60'} `}
        >
          {/* Icon */}
          <div
            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center transition-all justify-center mb-2
                  ${s.id <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                  ${s.id === currentStep ? 'ring-2 ring-blue-400 max-sm:scale-125 ring-offset-2' : ''}`}
          >
            {s.icon}
          </div>

          {/* Step title and subtitle */}
          <div className="text-center">
            <p
              className={`text-xs break-words max-w-12 sm:max-w-28 sm:text-sm font-light sm:font-medium mb-1 ${s.id === currentStep ? 'text-blue-600' : 'text-gray-600'}`}
            >
              {s.title}
            </p>
            <p className="text-xs max-sm:hidden text-gray-500 max-w-[120px] mx-auto">
              {s.subtitle}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProgressHeaders;
