import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/Tooltip';

export const CasualTravelerForm = ({ formData, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Travel Frequency */}
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-black">Travel Frequency</label>
          <Tooltip content="How often do you typically travel? This helps match you with appropriate delivery requests">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <select
          value={formData.travelFrequency || ''}
          onChange={(e) => onUpdate({ travelFrequency: e.target.value })}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
            placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="" className="text-gray-400">Select travel frequency</option>
          <option value="weekly" className="text-white">Weekly</option>
          <option value="monthly" className="text-white">Monthly</option>
          <option value="quarterly" className="text-white">Every 3-4 months</option>
          <option value="yearly" className="text-white">Once or twice a year</option>
        </select>
      </div>

      {/* Preferred Routes */}
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-black">Preferred Routes</label>
          <Tooltip content="Select the routes you commonly travel. This helps us match you with relevant delivery requests">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <div className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          {['domestic', 'international'].map((routeType) => (
            <label key={routeType} 
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                hover:bg-gray-700/50 group cursor-pointer">
              <input
                type="checkbox"
                checked={formData.preferredRoutes?.[routeType] || false}
                onChange={(e) => onUpdate({
                  preferredRoutes: {
                    ...formData.preferredRoutes,
                    [routeType]: e.target.checked
                  }
                })}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                  focus:ring-blue-500/20 focus:ring-offset-0"
              />
              <div className="flex items-center space-x-1">
                <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                  {routeType === 'domestic' ? 'Domestic Routes' : 'International Routes'}
                </span>
                <Tooltip 
                  content={routeType === 'domestic' 
                    ? "Flights within the country" 
                    : "Flights between different countries"}
                >
                  <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                </Tooltip>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Package Preferences */}
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-black">Package Preferences</label>
          <Tooltip content="Select the types of packages you're comfortable carrying">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <div className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          {[
            { id: 'small', label: 'Small Packages', desc: 'Items that fit in a carry-on' },
            { id: 'medium', label: 'Medium Packages', desc: 'Items that fit in checked baggage' },
            { id: 'documents', label: 'Documents', desc: 'Letters and important papers' }
          ].map((preference) => (
            <label key={preference.id}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                hover:bg-gray-700/50 group cursor-pointer">
              <input
                type="checkbox"
                checked={formData.packagePreferences?.[preference.id] || false}
                onChange={(e) => onUpdate({
                  packagePreferences: {
                    ...formData.packagePreferences,
                    [preference.id]: e.target.checked
                  }
                })}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                  focus:ring-blue-500/20 focus:ring-offset-0"
              />
              <div className="flex items-center space-x-1">
                <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                  {preference.label}
                </span>
                <Tooltip content={preference.desc}>
                  <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                </Tooltip>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <label className="text-base font-medium text-black">Additional Services</label>
          <Tooltip content="Extra services you can provide to enhance the delivery experience">
            <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
          </Tooltip>
        </div>
        <div className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          {[
            { id: 'insurance', label: 'Package Insurance', desc: 'Provide insurance coverage for valuable items' },
            { id: 'tracking', label: 'Real-time Tracking', desc: 'Share live location updates during delivery' },
            { id: 'packaging', label: 'Secure Packaging', desc: 'Help with proper packaging if needed' }
          ].map((service) => (
            <label key={service.id}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors
                hover:bg-gray-700/50 group cursor-pointer">
              <input
                type="checkbox"
                checked={formData.additionalServices?.[service.id] || false}
                onChange={(e) => onUpdate({
                  additionalServices: {
                    ...formData.additionalServices,
                    [service.id]: e.target.checked
                  }
                })}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                  focus:ring-blue-500/20 focus:ring-offset-0"
              />
              <div className="flex items-center space-x-1">
                <span className="text-base text-white group-hover:text-blue-300 transition-colors">
                  {service.label}
                </span>
                <Tooltip content={service.desc}>
                  <FiInfo className="w-4 h-4 text-gray-600 hover:text-gray-500 transition-colors ml-1" />
                </Tooltip>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 