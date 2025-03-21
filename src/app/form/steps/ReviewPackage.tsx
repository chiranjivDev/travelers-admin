import { useTranslations } from 'next-intl';
import React from 'react';

export const ReviewPackage = ({ formData }: any) => {
  const t = useTranslations('SenderForm.steps.step5');
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {/* Step 5: Review & Submit */}
        {t('title')}
      </h2>
      <div className="space-y-4 text-gray-700">
        {/* General Information */}
        <div className="p-4 bg-white shadow-sm rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {/* General Information */}
            {t('generalInformation')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                {/* Name */}
                {t('name')}
              </span>
              <span className="text-gray-800">{formData.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                {/* Price */}
                {t('price')}
              </span>
              <span className="text-gray-800">{formData.price || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                {/* Description */}
                {t('description')}
              </span>
              <span className="text-gray-800">
                {formData.description || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {/* Dimensions */}
            {t('dimensions')}
          </h3>
          <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-gray-800">
            <div className="flex items-center max-sm:w-full justify-between gap-2">
              <span className="font-medium">
                {/* Length: */}
                {t('length')}
              </span>
              <span>{formData.dimension?.length || 'N/A'}</span>
            </div>
            <div className="flex items-center max-sm:w-full justify-between gap-2">
              <span className="font-medium">
                {/* Width: */}
                {t('width')}
              </span>
              <span>{formData.dimension?.width || 'N/A'}</span>
            </div>
            <div className="flex items-center max-sm:w-full justify-between gap-2">
              <span className="font-medium">
                {/* Height: */}
                {t('height')}
              </span>
              <span>{formData.dimension?.height || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Origin */}
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {/* Origin */}
            {t('origin')}
          </h3>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Street */}
              {t('street')}
            </span>
            <span>{formData.origin?.street || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Postal */}
              {t('postal')}
            </span>
            <span>{formData.origin?.postal || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* City */}
              {t('city')}
            </span>
            <span>{formData.origin?.city || 'N/A'}</span>
          </div>
        </div>

        {/* Destination */}
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {/* Destination */}
            {t('destination')}
          </h3>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Street */}
              {t('street')}
            </span>
            <span>{formData.destination?.street || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Postal */}
              {t('postal')}
            </span>
            <span>{formData.destination?.postal || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* City */}
              {t('city')}
            </span>
            <span>{formData.destination?.city || 'N/A'}</span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {/* Additional Information */}
            {t('additionalInformation')}
          </h3>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Pickup Date */}
              {t('pickupDate')}
            </span>
            <span>{formData.pickupDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Preferred */}
              {t('preferredTime')}
            </span>
            <span>{formData.preferredTime || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Delivery Date */}
              {t('deliveryDate')}
            </span>
            <span>{formData.deliveryDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Prefered Delivery Time */}
              {t('preferredDeliveryTime')}
            </span>
            <span>{formData.preferredDeliveryTime || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Phone */}
              {t('phone')}
            </span>
            <span>{formData.phone || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Communication */}
              {t('communication')}
            </span>
            <span>{formData.communication?.join(', ') || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Requires Careful Handling */}
              {t('requiresCarefulHandling')}
            </span>
            <span>{formData.requiresCarefulHandling ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Is Fragile */}
              {t('isFragile')}
            </span>
            <span>{formData.isFragile ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Insurance */}
              {t('insurance')}
            </span>
            <span>{formData.insurance ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Priority */}
              {t('priority')}
            </span>
            <span>{formData.priority ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {/* Special Instructions */}
              {t('specialInstructions')}
            </span>
            <span>{formData.specialInstructions || 'N/A'}</span>
          </div>
        </div>
      </div>
    </>
  );
};
