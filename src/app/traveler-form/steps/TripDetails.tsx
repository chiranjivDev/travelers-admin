import { Tooltip } from '@/components/ui/Tooltip';
import { FiInfo } from 'react-icons/fi';

const TripDetails = ({ register, errors }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
        <h2 className="text-2xl font-bold text-black">Trip Details</h2>
        <Tooltip content="Provide your travel information to help coordinate package delivery">
          <FiInfo className="w-5 h-5 text-gray-600 hover:text-gray-500 transition-colors" />
        </Tooltip>
      </div>

      <div className="space-y-6">
        {/* Departure Section */}
        <div className="relative z-30">
          <LocationSection
            type="departure"
            register={register}
            errors={errors}
          />
        </div>

        {/* Arrival Section */}
        <div className="relative z-20">
          <LocationSection type="arrival" register={register} errors={errors} />
        </div>

        {/* Package Reception Details */}
        <div className="relative z-10">
          <ReceptionSection register={register} errors={errors} />
        </div>

        {/* Travel Schedule */}
        <div className="relative z-10">
          <TravelScheduleSection register={register} errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;

// Location Details Component
const LocationSection = ({ type, register, errors }) => {
  return (
    <div className="relative">
      <div
        className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
        shadow-lg transition-all duration-200 hover:bg-gray-900/90"
      >
        <div className="flex items-center space-x-1">
          <span>
            {type === 'departure' ? 'Departure' : 'Arrival'} Location Details
          </span>
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Street</div>
                  <input
                    type="text"
                    {...register(`${type}.street`, { required: true })}
                    className="text-sm text-white bg-transparent outline-none w-full"
                    placeholder="Enter street"
                  />
                  {errors?.[type]?.street && (
                    <p className="text-xs text-red-500 mt-1">
                      {`${type} street is required`}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">City</div>
                  <input
                    type="text"
                    {...register(`${type}.city`, { required: true })}
                    className="text-sm text-white bg-transparent outline-none w-full"
                    placeholder="Enter city"
                  />
                  {errors?.[type]?.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {`${type} city is required`}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">State</div>
                  <input
                    type="text"
                    {...register(`${type}.state`, { required: true })}
                    className="text-sm text-white bg-transparent outline-none w-full"
                    placeholder="Enter state"
                  />
                  {errors?.[type]?.state && (
                    <p className="text-xs text-red-500 mt-1">
                      {`${type} state is required`}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Country</div>
                  <input
                    type="text"
                    {...register(`${type}.country`, { required: true })}
                    className="text-sm text-white bg-transparent outline-none w-full"
                    placeholder="Enter country"
                  />
                  {errors?.[type]?.country && (
                    <p className="text-xs text-red-500 mt-1">
                      {`${type} country is required`}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Postal Code</div>
                  <input
                    type="text"
                    {...register(`${type}.postalCode`, { required: true })}
                    className="text-sm text-white bg-transparent outline-none w-full"
                    placeholder="Enter postal code"
                  />
                  {errors?.[type]?.postalCode && (
                    <p className="text-xs text-red-500 mt-1">
                      {`${type} postalCode is required`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Traveler Schedule Section
const TravelScheduleSection = ({ register, errors }) => {
  return (
    <div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-900/90">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1.5 h-8 bg-yellow-500 rounded-full" />
        <h3 className="text-xl font-bold text-white">Travel Schedule</h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Departure Date/Time */}
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <label className="text-base font-medium text-white">
                Departure
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  {...register('departure.date', {
                    required: 'Departure date is required',
                  })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500"
                />
                {errors.departure?.date && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.departure.date.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="time"
                  {...register('departure.time', {
                    required: 'Departure time is required',
                  })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500"
                />
                {errors.departure?.time && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.departure.time.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Arrival Date/Time */}
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <label className="text-base font-medium text-white">
                Arrival
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  {...register('arrival.date', {
                    required: 'Arrival date is required',
                  })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500"
                />
                {errors.arrival?.date && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.arrival.date.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="time"
                  {...register('arrival.time', {
                    required: 'Arrival time is required',
                  })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500"
                />
                {errors.arrival?.time && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.arrival.time.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Package Reception Section
const ReceptionSection = ({ register, errors }) => {
  // Reception Methods
  const RECEPTION_METHODS = [
    {
      id: 'departure-point',
      name: 'At Departure Point',
      description: 'Meet at the airport/station on travel day',
    },
    {
      id: 'advance-home',
      name: 'Advance Home Delivery',
      description: 'Receive at your address before travel date',
    },
    {
      id: 'meeting-point',
      name: 'Convenient Meeting Point',
      description: 'Arrange a mutual meeting location',
    },
  ];

  const ADVANCE_NOTICE_OPTIONS = [
    { value: '1', label: '1 day notice' },
    { value: '2', label: '2 days notice' },
    { value: '3', label: '3 days notice' },
    { value: 'flexible', label: 'Flexible (coordinate with sender)' },
  ];

  const WEEKDAY_OPTIONS = [
    { value: 'weekdayMorning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'weekdayAfternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'weekdayEvening', label: 'Evening (6 PM - 10 PM)' },
  ];

  const WEEKEND_OPTIONS = [
    { value: 'weekendMorning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'weekendAfternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'weekendEvening', label: 'Evening (6 PM - 10 PM)' },
  ];

  return (
    <div
      className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
      shadow-lg transition-all duration-200 hover:bg-gray-900/90"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1.5 h-8 bg-green-500 rounded-full" />
        <h3 className="text-xl font-bold text-white">
          Package Reception Details
        </h3>
        <Tooltip content="Configure how you want to receive packages from senders">
          <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
        </Tooltip>
      </div>

      {/* Reception method */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-1 mb-2">
            <label className="text-base font-medium text-white">
              Reception Method
            </label>
            <Tooltip content="Choose how you prefer to receive packages from senders">
              <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
            </Tooltip>
          </div>
          <select
            {...register('packageReceptionDetails.receptionMethod', {
              required: 'Please select a reception method',
            })}
            className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg text-white 
            placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <option value="" className="text-gray-400 bg-gray-800">
              Select a reception method
            </option>
            {RECEPTION_METHODS.map((method) => (
              <option
                key={method.id}
                value={method.id}
                className="text-white bg-gray-800"
              >
                {method.name} - {method.description}
              </option>
            ))}
          </select>
          {errors.packageReceptionDetails?.receptionMethod && (
            <span className="text-xs text-red-500 mt-1">
              {errors.packageReceptionDetails.receptionMethod.message}
            </span>
          )}
        </div>
      </div>

      {/* Advanced notice required */}
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-white">
            Advance Notice Required
          </label>
          <Tooltip content="How much notice do you need before receiving packages?">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <select
          {...register('packageReceptionDetails.advancedNotice', {
            required: 'Please select an advanced notice period',
          })}
          className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg text-white 
                  placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <option value="" className="text-gray-400 bg-gray-800">
            Select required notice period
          </option>
          {ADVANCE_NOTICE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-white bg-gray-800"
            >
              {option.label}
            </option>
          ))}
        </select>
        {errors.packageReceptionDetails?.advancedNotice && (
          <span className="text-xs text-red-500 mt-1">
            {errors.packageReceptionDetails.advancedNotice.message}
          </span>
        )}
      </div>

      {/* Available Reception Times */}
      <div>
        <div className="flex items-center space-x-1 mb-4">
          <label className="text-base font-medium text-white">
            Available Reception Times
          </label>
          <Tooltip content="Select the time slots when you're available to receive packages">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <div
          className="grid grid-cols-2 gap-6 p-4 bg-gray-800/90 rounded-lg border border-gray-700
                hover:bg-gray-800 transition-colors"
        >
          {/* Weekdays */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1">
              <h4 className="text-lg font-medium text-white">Weekdays</h4>
              <Tooltip content="Select your available time slots during weekdays">
                <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
              </Tooltip>
            </div>
            {WEEKDAY_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                        hover:bg-gray-700/50 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  {...register(
                    `packageReceptionDetails.availableTimes.${option.value}`
                  )}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                          focus:ring-blue-500/20 focus:ring-offset-0"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                    {option.label}
                  </span>
                  <Tooltip
                    content={`Available during ${option.label.toLowerCase()}`}
                  >
                    <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                  </Tooltip>
                </div>
              </label>
            ))}
          </div>

          {/* Weekends */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1">
              <h4 className="text-lg font-medium text-white">Weekends</h4>
              <Tooltip content="Select your available time slots during weekends">
                <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
              </Tooltip>
            </div>
            {WEEKEND_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                        hover:bg-gray-700/50 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  {...register(
                    `packageReceptionDetails.availableTimes.${option.value}`
                  )}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                          focus:ring-blue-500/20 focus:ring-offset-0"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                    {option.label}
                  </span>
                  <Tooltip
                    content={`Available during ${option.label.toLowerCase()}`}
                  >
                    <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                  </Tooltip>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
