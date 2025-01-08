'use client'

import React, { useState, useEffect } from 'react';
import { FiInfo, FiChevronDown, FiChevronRight, FiChevronUp, FiMapPin, FiBox, FiMessageCircle } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/Tooltip';
import { TravelerFormData } from '@/app/become-traveler/page'
import AddressInput from '@/components/AddressInput'
import StationSelect from './StationSelect';
import { ReceptionMethodSelect } from './ReceptionMethodSelect';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { cva } from 'class-variance-authority';

interface TripDetailsFormProps {
  formData: TravelerFormData
  onUpdate: (data: TravelerFormData) => void
}

const RECEPTION_METHODS = [
  {
    id: 'departure-point',
    name: 'At Departure Point',
    description: 'Meet at the airport/station on travel day'
  },
  {
    id: 'advance-home',
    name: 'Advance Home Delivery',
    description: 'Receive at your address before travel date'
  },
  {
    id: 'meeting-point',
    name: 'Convenient Meeting Point',
    description: 'Arrange a mutual meeting location'
  }
];

const ADVANCE_NOTICE_OPTIONS = [
  { value: '1', label: '1 day notice' },
  { value: '2', label: '2 days notice' },
  { value: '3', label: '3 days notice' },
  { value: 'flexible', label: 'Flexible (coordinate with sender)' }
];

const WEEKDAY_OPTIONS = [
  { value: 'weekdayMorning', label: 'Morning (6 AM - 12 PM)' },
  { value: 'weekdayAfternoon', label: 'Afternoon (12 PM - 6 PM)' },
  { value: 'weekdayEvening', label: 'Evening (6 PM - 10 PM)' }
];

const WEEKEND_OPTIONS = [
  { value: 'weekendMorning', label: 'Morning (6 AM - 12 PM)' },
  { value: 'weekendAfternoon', label: 'Afternoon (12 PM - 6 PM)' },
  { value: 'weekendEvening', label: 'Evening (6 PM - 10 PM)' }
];

const getSelectedTimesDisplay = (times: any) => {
  if (!times) return 'Select available times';
  
  const selectedTimes = [];
  if (Object.values(times).some(v => v)) {
    if (Object.entries(times).filter(([k, v]) => k.startsWith('weekday') && v).length > 0) {
      selectedTimes.push('Weekdays');
    }
    if (Object.entries(times).filter(([k, v]) => k.startsWith('weekend') && v).length > 0) {
      selectedTimes.push('Weekends');
    }
    return selectedTimes.join(' & ') + ' selected';
  }
  return 'Select available times';
};

const RECURRING_PATTERNS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Bi-weekly' },
  { id: 'monthly', label: 'Monthly' }
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning (6 AM - 12 PM)' },
  { id: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
  { id: 'evening', label: 'Evening (6 PM - 10 PM)' }
];

const PICKUP_PREFERENCES = [
  { 
    id: 'same-day',
    label: 'Same Day Pickup',
    description: 'Receive package at airport/station on travel day'
  },
  { 
    id: 'day-before',
    label: '1 Day Before',
    description: 'Receive package one day before travel'
  },
  { 
    id: 'two-days-before',
    label: '2 Days Before',
    description: 'Receive package two days before travel'
  }
];

const PICKUP_LOCATIONS = [
  { 
    id: 'station',
    label: 'At Station/Airport',
    description: 'Pickup at your departure point'
  },
  { 
    id: 'home',
    label: 'At Your Address',
    description: 'Sender delivers to your specified address'
  },
  { 
    id: 'flexible',
    label: 'Flexible Location',
    description: 'Can arrange convenient meeting point'
  }
];

const cardVariants = cva(
  'rounded-xl overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-900/50 backdrop-blur-sm border border-gray-800',
        ghost: 'bg-gray-800/30 backdrop-blur-sm',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    }
  }
);

const StepIndicator = ({ 
  step, 
  label, 
  isActive, 
  isCompleted 
}: { 
  step: number; 
  label: string; 
  isActive: boolean; 
  isCompleted: boolean;
}) => (
  <div className="flex items-center">
    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
      ${isActive ? 'bg-blue-500' : isCompleted ? 'bg-green-500' : 'bg-gray-700'}`}>
      <span className="text-sm font-medium text-white">{step}</span>
    </div>
    <span className="ml-2 text-sm font-medium text-gray-400">{label}</span>
  </div>
);

const StepDivider = ({ isCompleted }: { isCompleted: boolean }) => (
  <div className="flex-1 mx-4">
    <div className={`h-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`} />
  </div>
);

const Steps = () => (
  <div className="flex items-center justify-between w-full mb-8">
    <StepIndicator step={1} label="Travel route" isActive={true} isCompleted={false} />
    <StepDivider isCompleted={false} />
    <StepIndicator step={2} label="Package details" isActive={false} isCompleted={false} />
    <StepDivider isCompleted={false} />
    <StepIndicator step={3} label="Contact details" isActive={false} isCompleted={false} />
  </div>
);

interface AddressDetails {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface TravelerFormData {
  departureStation?: string;
  arrivalStation?: string;
  departureTerminal?: string;
  arrivalTerminal?: string;
  departureLocation?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  arrivalLocation?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

const LocationSection = ({ 
  title, 
  value, 
  onChange, 
  details,
  isExpanded,
  onExpandToggle,
  terminalValue,
  onTerminalChange,
  type 
}: {
  title: string;
  value: string;
  onChange: (value: string, details: any) => void;
  details: any;
  isExpanded: boolean;
  onExpandToggle: () => void;
  terminalValue: string;
  onTerminalChange: (value: string) => void;
  type: 'departure' | 'arrival';
}) => {
  return (
    <div className="relative">
      <div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
        shadow-lg transition-all duration-200 hover:bg-gray-900/90">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-1">
            <span className={`w-2 h-2 rounded-full ${type === 'departure' ? 'bg-blue-500' : 'bg-purple-500'}`} />
            <h3 className="text-lg font-medium text-black">{title}</h3>
            <Tooltip content={`Select your ${type} airport or station for package ${type === 'departure' ? 'pickup' : 'delivery'}`}>
              <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
            </Tooltip>
          </div>
        </div>

        {/* Airport Select */}
        <div className="mb-4">
          <StationSelect
            value={value}
            onChange={onChange}
            placeholder={`Select ${type} airport`}
            className="w-full"
          />
        </div>

        {/* Expandable Section */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={onExpandToggle}
            className="flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 
              transition-colors group"
          >
            {isExpanded ? (
              <FiChevronDown className="w-4 h-4" />
            ) : (
              <FiChevronRight className="w-4 h-4" />
            )}
            <span>{type === 'departure' ? 'Departure' : 'Arrival'} Location Details</span>
          </button>
          <Tooltip content={`View detailed ${type} location information and terminal details`}>
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Tips Box */}
            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
              <h4 className="text-sm font-medium text-blue-400 mb-2">
                Tips for {type} location:
              </h4>
              <ul className="space-y-1 text-sm text-blue-300">
                {type === 'departure' ? (
                  <>
                    <li>• Use the main airport/station name</li>
                    <li>• Include terminal information if known</li>
                    <li>• This helps senders plan package drop-offs</li>
                  </>
                ) : (
                  <>
                    <li>• Specify your final destination</li>
                    <li>• Include expected arrival terminal if known</li>
                    <li>• This helps recipients plan package collection</li>
                  </>
                )}
              </ul>
            </div>

            {/* Terminal/Gate Input */}
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <label className="text-base font-medium text-black">
                  Terminal/Gate
                </label>
                <Tooltip content={`Specify the ${type} terminal or gate number to help with package ${type === 'departure' ? 'drop-off' : 'pickup'}`}>
                  <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                </Tooltip>
              </div>
              <input
                type="text"
                placeholder={`e.g., Terminal ${type === 'departure' ? '1' : '2'}, Gate ${type === 'departure' ? 'B' : 'C'}`}
                value={terminalValue}
                onChange={(e) => onTerminalChange(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white 
                  placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-200"
              />
            </div>

            {/* Address Details */}
            {details?.address && (
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  <label className="text-base font-medium text-black">
                    Address Details
                  </label>
                  <Tooltip content="Complete address information for the selected location">
                    <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                  </Tooltip>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Street</div>
                      <div className="text-sm text-white">{details.address.street}</div>
                    </div>
                  </div>
                  <div>
                    <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">City</div>
                      <div className="text-sm text-white">{details.address.city}</div>
                    </div>
                  </div>
                  <div>
                    <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">State</div>
                      <div className="text-sm text-white">{details.address.state}</div>
                    </div>
                  </div>
                  <div>
                    <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Country</div>
                      <div className="text-sm text-white">{details.address.country}</div>
                    </div>
                  </div>
                  <div>
                    <div className="p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Postal Code</div>
                      <div className="text-sm text-white">{details.address.postalCode}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ReceptionSection = ({ formData, onUpdate }) => (
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
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-white">Reception Method</label>
          <Tooltip content="Choose how you prefer to receive packages from senders">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <select
          value={formData.receptionMethod || ''}
          onChange={(e) => onUpdate({ receptionMethod: e.target.value })}
          className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg text-white 
            placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <option value="" className="text-gray-400 bg-gray-800">Select a reception method</option>
          {RECEPTION_METHODS.map((method) => (
            <option key={method.id} value={method.id} className="text-white bg-gray-800">
              {method.name} - {method.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-white">Advance Notice Required</label>
          <Tooltip content="How much notice do you need before receiving packages?">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <select
          value={formData.advanceNotice || ''}
          onChange={(e) => onUpdate({ advanceNotice: e.target.value })}
          className="w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg text-white 
            placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <option value="" className="text-gray-400 bg-gray-800">Select required notice period</option>
          {ADVANCE_NOTICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="text-white bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center space-x-1 mb-4">
          <label className="text-base font-medium text-white">Available Reception Times</label>
          <Tooltip content="Select the time slots when you're available to receive packages">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <div className="grid grid-cols-2 gap-6 p-4 bg-gray-800/90 rounded-lg border border-gray-700
          hover:bg-gray-800 transition-colors">
          {/* Weekdays */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1">
              <h4 className="text-lg font-medium text-white">Weekdays</h4>
              <Tooltip content="Select your available time slots during weekdays">
                <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
              </Tooltip>
            </div>
            {WEEKDAY_OPTIONS.map((option) => (
              <label key={option.value} 
                className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                  hover:bg-gray-700/50 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availableTimes?.[option.value] || false}
                  onChange={(e) => onUpdate({
                    availableTimes: { 
                      ...formData.availableTimes, 
                      [option.value]: e.target.checked 
                    }
                  })}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                    focus:ring-blue-500/20 focus:ring-offset-0"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                    {option.label}
                  </span>
                  <Tooltip content={`Available during ${option.label.toLowerCase()}`}>
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
              <label key={option.value} 
                className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                  hover:bg-gray-700/50 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availableTimes?.[option.value] || false}
                  onChange={(e) => onUpdate({
                    availableTimes: { 
                      ...formData.availableTimes, 
                      [option.value]: e.target.checked 
                    }
                  })}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                    focus:ring-blue-500/20 focus:ring-offset-0"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                    {option.label}
                  </span>
                  <Tooltip content={`Available during ${option.label.toLowerCase()}`}>
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
);

const TravelScheduleSection = ({ formData, onUpdate }) => (
  <div className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-lg border border-gray-700 
    shadow-lg transition-all duration-200 hover:bg-gray-900/90">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-1.5 h-8 bg-yellow-500 rounded-full" />
      <h3 className="text-xl font-bold text-white">Travel Schedule</h3>
      <Tooltip content="Specify your travel dates and times to help coordinate package deliveries">
        <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
      </Tooltip>
    </div>

    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Departure Date/Time */}
        <div>
          <div className="flex items-center space-x-1 mb-2">
            <label className="text-base font-medium text-white">Departure</label>
            <Tooltip content="When are you departing? This helps senders plan their deliveries">
              <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Tooltip content="Select your departure date">
                <input
                  type="date"
                  value={formData.departureDate || ''}
                  onChange={(e) => onUpdate({ departureDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    hover:bg-gray-800/90 transition-colors"
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Select your departure time">
                <input
                  type="time"
                  value={formData.departureTime || ''}
                  onChange={(e) => onUpdate({ departureTime: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    hover:bg-gray-800/90 transition-colors"
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Arrival Date/Time */}
        <div>
          <div className="flex items-center space-x-1 mb-2">
            <label className="text-base font-medium text-white">Arrival</label>
            <Tooltip content="When do you arrive? This helps recipients plan package collection">
              <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Tooltip content="Select your arrival date">
                <input
                  type="date"
                  value={formData.arrivalDate || ''}
                  onChange={(e) => onUpdate({ arrivalDate: e.target.value })}
                  min={formData.departureDate || new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    hover:bg-gray-800/90 transition-colors"
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Select your arrival time">
                <input
                  type="time"
                  value={formData.arrivalTime || ''}
                  onChange={(e) => onUpdate({ arrivalTime: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    hover:bg-gray-800/90 transition-colors"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Return Journey Option */}
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors">
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-3 p-2 rounded-lg transition-colors
            hover:bg-gray-700/50 group cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasReturnJourney || false}
              onChange={(e) => onUpdate({ 
                hasReturnJourney: e.target.checked,
                returnDate: e.target.checked ? formData.returnDate : undefined,
                returnTime: e.target.checked ? formData.returnTime : undefined
              })}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                focus:ring-blue-500/20 focus:ring-offset-0"
            />
            <span className="text-base text-white group-hover:text-blue-300 transition-colors">
              I'm also available for return journey deliveries
            </span>
          </label>
          <Tooltip content="Check this if you can also deliver packages on your return journey">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>

        {formData.hasReturnJourney && (
          <div className="mt-4 pl-6 border-l-2 border-blue-500/30">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <label className="text-base font-medium text-white">Return Date & Time</label>
                <Tooltip content="When are you returning? This helps coordinate return deliveries">
                  <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                </Tooltip>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Tooltip content="Select your return date">
                    <input
                      type="date"
                      value={formData.returnDate || ''}
                      onChange={(e) => onUpdate({ returnDate: e.target.value })}
                      min={formData.arrivalDate || formData.departureDate || new Date().toISOString().split('T')[0]}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                        hover:bg-gray-800/90 transition-colors"
                    />
                  </Tooltip>
                </div>
                <div>
                  <Tooltip content="Select your return time">
                    <input
                      type="time"
                      value={formData.returnTime || ''}
                      onChange={(e) => onUpdate({ returnTime: e.target.value })}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                        hover:bg-gray-800/90 transition-colors"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function TripDetailsForm({ formData, onUpdate }: TripDetailsFormProps) {
  const [isDepartureExpanded, setIsDepartureExpanded] = useState(false);
  const [isArrivalExpanded, setIsArrivalExpanded] = useState(false);

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
            title="Departure Airport/Station"
            value={formData.departureStation || ''}
            onChange={(value, details) => {
              onUpdate({
                ...formData,
                departureStation: value,
                departureLocation: details.address
              });
            }}
            details={formData.departureLocation ? { address: formData.departureLocation } : null}
            isExpanded={isDepartureExpanded}
            onExpandToggle={() => setIsDepartureExpanded(!isDepartureExpanded)}
            terminalValue={formData.departureTerminal || ''}
            onTerminalChange={(value) => onUpdate({ ...formData, departureTerminal: value })}
            type="departure"
          />
        </div>

        {/* Arrival Section */}
        <div className="relative z-20">
          <LocationSection
            title="Arrival Airport/Station"
            value={formData.arrivalStation || ''}
            onChange={(value, details) => {
              onUpdate({
                ...formData,
                arrivalStation: value,
                arrivalLocation: details.address
              });
            }}
            details={formData.arrivalLocation ? { address: formData.arrivalLocation } : null}
            isExpanded={isArrivalExpanded}
            onExpandToggle={() => setIsArrivalExpanded(!isArrivalExpanded)}
            terminalValue={formData.arrivalTerminal || ''}
            onTerminalChange={(value) => onUpdate({ ...formData, arrivalTerminal: value })}
            type="arrival"
          />
        </div>

        {/* Package Reception Details */}
        <div className="relative z-10">
          <ReceptionSection formData={formData} onUpdate={onUpdate} />
        </div>

        {/* Travel Schedule */}
        <div className="relative z-10">
          <TravelScheduleSection formData={formData} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
}

