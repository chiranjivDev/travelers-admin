import { Controller } from 'react-hook-form';

export const PickupDetails = ({ control, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Step 2: Package Pickup Details
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700">Origin Street</label>
        <Controller
          name="origin.street"
          control={control}
          rules={{ required: 'Origin street is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.origin?.street && (
          <p className="text-red-500 text-sm">{errors.origin.street.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Origin Postal</label>
        <Controller
          name="origin.postal"
          control={control}
          rules={{ required: 'Origin postal code is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.origin?.postal && (
          <p className="text-red-500 text-sm">{errors.origin.postal.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Origin City</label>
        <Controller
          name="origin.city"
          control={control}
          rules={{ required: 'Origin city is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.origin?.city && (
          <p className="text-red-500 text-sm">{errors.origin.city.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Pickup Date</label>
        <Controller
          name="pickupDate"
          control={control}
          rules={{ required: 'Pickup Date is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full text-black"
              type="date"
            />
          )}
        />
        {errors.pickupDate && (
          <p className="text-red-500 text-sm">{errors.pickupDate.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Preferred Time</label>
        <Controller
          name="preferredTime"
          control={control}
          rules={{ required: 'Preferred Time is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full text-black"
              type="time"
            />
          )}
        />
        {errors.preferredTime && (
          <p className="text-red-500 text-sm">{errors.preferredTime.message}</p>
        )}
      </div>
    </div>
  );
};
