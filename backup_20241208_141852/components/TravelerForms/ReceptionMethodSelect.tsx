import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/Tooltip';
import { TravelerFormData } from './types';

interface ReceptionMethodSelectProps {
  formData: TravelerFormData;
  onUpdate: (data: Partial<TravelerFormData>) => void;
}

const RECEPTION_METHODS = [
  { 
    id: 'departure-point', 
    name: 'At Departure Point', 
    description: 'Meet at the airport/station on travel day',
    tooltip: 'Exchange packages directly at your departure location before your flight'
  },
  { 
    id: 'advance-home', 
    name: 'Advance Home Delivery', 
    description: 'Receive at your address before travel date',
    tooltip: 'Have packages delivered to your home address before your travel date'
  },
  { 
    id: 'meeting-point', 
    name: 'Convenient Meeting Point', 
    description: 'Arrange a mutual meeting location',
    tooltip: 'Meet at a safe, public location that works for both parties'
  }
];

export const ReceptionMethodSelect: React.FC<ReceptionMethodSelectProps> = ({ formData, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Reception Method */}
      <div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
        shadow-lg transition-all duration-200 hover:bg-gray-900/90">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1.5 h-8 bg-green-500 rounded-full" />
          <h3 className="text-xl font-bold text-white">Package Reception Details</h3>
          <Tooltip content="Configure how you want to receive packages from senders">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>

        <div className="space-y-6">
          {/* Reception Method */}
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <label className="text-base font-medium text-white">Reception Method</label>
              <Tooltip content="Choose how you prefer to receive packages from senders">
                <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
              </Tooltip>
            </div>
            <select
              aria-label="Reception Method"
              value={formData.receptionMethod || ''}
              onChange={(e) => onUpdate({ receptionMethod: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                hover:bg-gray-800/90 transition-colors"
            >
              <option value="" className="text-gray-400">Select a reception method</option>
              {RECEPTION_METHODS.map((method) => (
                <option key={method.id} value={method.id} className="text-white bg-gray-800">
                  {method.name} - {method.description}
                </option>
              ))}
            </select>
          </div>

          {/* Advance Notice Required */}
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <label className="text-base font-medium text-white">Advance Notice Required</label>
              <Tooltip content="How much notice do you need before receiving packages?">
                <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
              </Tooltip>
            </div>
            <select
              aria-label="Advance Notice Required"
              value={formData.advanceNotice || ''}
              onChange={(e) => onUpdate({ advanceNotice: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                hover:bg-gray-800/90 transition-colors"
            >
              <option value="" className="text-gray-400">Select required notice period</option>
              {['same-day', '1-day', '2-days', '3-days'].map((period) => (
                <option key={period} value={period} className="text-white bg-gray-800">
                  {period === 'same-day' ? 'Same day delivery' : `${period.split('-')[0]} day notice`}
                </option>
              ))}
            </select>
          </div>

          {/* Available Reception Times */}
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <label className="text-base font-medium text-white">Available Reception Times</label>
              <Tooltip content="Select the time slots when you're available to receive packages">
                <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700
              hover:bg-gray-800/70 transition-colors">
              {/* Weekdays */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  <h4 className="text-lg font-medium text-white">Weekdays</h4>
                  <Tooltip content="Select your available time slots during weekdays">
                    <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                  </Tooltip>
                </div>
                {['morning', 'afternoon', 'evening'].map((timeSlot) => (
                  <label key={`weekday-${timeSlot}`} 
                    className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                      hover:bg-gray-700/50 group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availableTimeSlots?.[`weekday-${timeSlot}`] || false}
                      onChange={(e) => onUpdate({
                        availableTimeSlots: { 
                          ...formData.availableTimeSlots, 
                          [`weekday-${timeSlot}`]: e.target.checked 
                        }
                      })}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                        focus:ring-blue-500/20 focus:ring-offset-0"
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                        {timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}
                      </span>
                      <Tooltip content={`Available during ${timeSlot} hours on weekdays`}>
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
                {['morning', 'afternoon', 'evening'].map((timeSlot) => (
                  <label key={`weekend-${timeSlot}`} 
                    className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                      hover:bg-gray-700/50 group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availableTimeSlots?.[`weekend-${timeSlot}`] || false}
                      onChange={(e) => onUpdate({
                        availableTimeSlots: { 
                          ...formData.availableTimeSlots, 
                          [`weekend-${timeSlot}`]: e.target.checked 
                        }
                      })}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                        focus:ring-blue-500/20 focus:ring-offset-0"
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                        {timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}
                      </span>
                      <Tooltip content={`Available during ${timeSlot} hours on weekends`}>
                        <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                      </Tooltip>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 