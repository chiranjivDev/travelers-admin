import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

export const DeliveryDetails = ({ control, errors }) => {
  const t = useTranslations('SenderForm.steps.step3');
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {/* Step 3: Delivery Address */}
        {t('title')}
      </h2>

      {/* Delivery Street Field */}
      <div className="mb-4">
        <label className="block text-gray-700">
          {/* Street */}
          {t('fields.deliveryStreet')}
        </label>
        <Controller
          name="destination.street"
          control={control}
          rules={{ required: 'Street is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.destination?.street && (
          <p className="text-red-500 text-sm">
            {errors.destination.street.message}
          </p>
        )}
      </div>

      {/* Delivery Postal Field */}
      <div className="mb-4">
        <label className="block text-gray-700">
          {/* Postal */}
          {t('fields.deliveryPostal')}
        </label>
        <Controller
          name="destination.postal"
          control={control}
          rules={{ required: 'Postal code is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.destination?.postal && (
          <p className="text-red-500 text-sm">
            {errors.destination.postal.message}
          </p>
        )}
      </div>

      {/* Delivery City Field */}
      <div className="mb-4">
        <label className="block text-gray-700">
          {/* City */}
          {t('fields.deliveryCity')}
        </label>
        <Controller
          name="destination.city"
          control={control}
          rules={{ required: 'City is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.destination?.city && (
          <p className="text-red-500 text-sm">
            {errors.destination.city.message}
          </p>
        )}
      </div>

      {/* Delivery State Field */}
      {/* <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <Controller
          name="destination.state"
          control={control}
          rules={{ required: 'State is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.destination?.state && (
          <p className="text-red-500 text-sm">
            {errors.destination.state.message}
          </p>
        )}
      </div> */}

      {/* Delivery Country Field */}
      {/* <div className="mb-4">
        <label className="block text-gray-700">Country</label>
        <Controller
          name="destination.country"
          control={control}
          rules={{ required: 'Country is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.destination?.country && (
          <p className="text-red-500 text-sm">
            {errors.destination.country.message}
          </p>
        )}
      </div> */}

      <div className="mb-4">
        <label className="block text-gray-700">
          {/* Delivery Date */}
          {t('fields.deliveryDate')}
        </label>
        <Controller
          name="deliveryDate"
          control={control}
          rules={{ required: 'Delivery Date is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full text-black"
              type="date"
            />
          )}
        />
        {errors.deliveryDate && (
          <p className="text-red-500 text-sm">{errors.deliveryDate.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          {/* Preferred Delivery Time */}
          {t('fields.preferredDeliveryTime')}
        </label>
        <Controller
          name="preferredDeliveryTime"
          control={control}
          rules={{ required: 'Preferred Delivery Time is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full text-black"
              type="time"
            />
          )}
        />
        {errors.preferredDeliveryTime && (
          <p className="text-red-500 text-sm">
            {errors.preferredDeliveryTime.message}
          </p>
        )}
      </div>
    </div>
  );
};
