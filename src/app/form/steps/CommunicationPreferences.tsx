import { Controller } from 'react-hook-form';

export const CommunicationPreferences = ({ control, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Step 4: Communication Preference
      </h2>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone number is required',
            pattern: {
              value: /^\+(\d{1,3})\d{6,14}$/,
              message:
                'Please enter a valid phone number with country code (e.g., +1234567890)',
            },
          }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Communication Preferences */}
      <div className="mb-4">
        <label className="block text-gray-700">Communication Preference</label>
        <Controller
          name="communication"
          control={control}
          rules={{
            required: 'Please select at least one communication method',
          }}
          render={({ field: { value, onChange } }) => (
            <div className="flex">
              <label className="mr-4 text-gray-700">
                <input
                  type="checkbox"
                  value="whatsapp"
                  checked={value.includes('whatsapp')}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...value, 'whatsapp']
                      : value.filter((val) => val !== 'whatsapp');
                    onChange(newValue);
                  }}
                />{' '}
                WhatsApp
              </label>
              <label className="mr-4 text-gray-700">
                <input
                  type="checkbox"
                  value="email"
                  checked={value.includes('email')}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...value, 'email']
                      : value.filter((val) => val !== 'email');
                    onChange(newValue);
                  }}
                />{' '}
                Email
              </label>
              <label className="mr-4 text-gray-700">
                <input
                  type="checkbox"
                  value="phone"
                  checked={value.includes('phone')}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...value, 'phone']
                      : value.filter((val) => val !== 'phone');
                    onChange(newValue);
                  }}
                />{' '}
                Phone
              </label>
            </div>
          )}
        />
        {errors.communication && (
          <p className="text-red-500 text-sm">{errors.communication.message}</p>
        )}
      </div>
    </div>
  );
};
