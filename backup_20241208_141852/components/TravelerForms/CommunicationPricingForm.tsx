'use client'

import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { Tooltip } from '@/components/ui/Tooltip';
import PriceCalculator from './PriceCalculator';
import { TravelerFormData } from './types';

interface CommunicationPricingFormProps {
  formData: TravelerFormData;
  onUpdate: (data: Partial<TravelerFormData>) => void;
}

const CommunicationPricingForm: React.FC<CommunicationPricingFormProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <div className="space-y-6 relative">
      {/* Cosmic background elements - Reduced blur and simplified gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-800/15 to-pink-900/20 rounded-xl blur-2xl -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>
      
      {/* Communication Preferences Section */}
      <div className="bg-[#0c1222]/90 backdrop-blur-md rounded-xl p-6 shadow-lg ring-1 ring-white/10
        will-change-transform
        transition-all duration-150
        hover:ring-2 hover:ring-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]
        hover:translate-y-[-2px]">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-2xl filter drop-shadow-md transition-transform duration-150 group-hover:scale-105" role="img" aria-label="Communication">🌟</span>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Communication Preferences</h3>
          <Tooltip content="Choose how senders can contact you">
            <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
              <FiInfo className="w-4 h-4 text-indigo-300" />
            </div>
          </Tooltip>
        </div>

        <div className="space-y-4">
          {/* Contact Methods - Optimized transitions */}
          <div className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            will-change-transform
            transition-all duration-150
            hover:ring-2 hover:ring-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.05),transparent_70%)] pointer-events-none" />
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Contact Methods</h4>
              <Tooltip content="Select your preferred ways to communicate">
                <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
                  <FiInfo className="w-4 h-4 text-purple-300" />
                </div>
              </Tooltip>
            </div>
            <div className="space-y-2">
              {['Email', 'Phone', 'Chat'].map((method) => (
                <div key={method} 
                  className="flex items-center p-3 rounded-lg bg-[#1a2235]/50
                  will-change-transform
                  transition-all duration-150 
                  hover:bg-[#1e2943]/50 hover:translate-x-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-purple-800 text-indigo-500 
                      focus:ring-indigo-500 focus:ring-offset-0 
                      transition-transform duration-150
                      hover:scale-105"
                    checked={formData.communicationPreferences?.contactMethods?.includes(method) || false}
                    onChange={(e) => {
                      const currentMethods = formData.communicationPreferences?.contactMethods || [];
                      const updatedMethods = e.target.checked
                        ? [...currentMethods, method]
                        : currentMethods.filter((m) => m !== method);
                      onUpdate({
                        communicationPreferences: {
                          ...formData.communicationPreferences,
                          contactMethods: updatedMethods,
                        },
                      });
                    }}
                  />
                  <div className="ml-3">
                    <span className="text-sm text-gray-200">{method}</span>
                    <Tooltip content={`Enable ${method.toLowerCase()} communication with senders`}>
                      <FiInfo className="inline-block w-3 h-3 ml-1 text-gray-400" />
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            transition-all duration-150
            hover:ring-2 hover:ring-emerald-400/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-emerald-300 to-indigo-300 bg-clip-text text-transparent">Contact Details</h4>
              <Tooltip content="Your contact information will only be shared after booking">
                <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
                  <FiInfo className="w-4 h-4 text-emerald-300" />
                </div>
              </Tooltip>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-sm font-medium text-gray-200">Email Address</label>
                  <Tooltip content="Enter the email you want to use for communications">
                    <FiInfo className="w-3 h-3 text-gray-400" />
                  </Tooltip>
                </div>
                <input
                  type="email"
                  value={formData.communicationPreferences?.email || ''}
                  onChange={(e) =>
                    onUpdate({
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        email: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter your email"
                  className="w-full p-3 bg-[#1a2235]/50 border border-gray-700/50 rounded-lg text-white
                    placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                    transition-all duration-150"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-sm font-medium text-gray-200">Phone Number</label>
                  <Tooltip content="Include country code (e.g., +1 for USA)">
                    <FiInfo className="w-3 h-3 text-gray-400" />
                  </Tooltip>
                </div>
                <input
                  type="tel"
                  value={formData.communicationPreferences?.phone || ''}
                  onChange={(e) =>
                    onUpdate({
                      communicationPreferences: {
                        ...formData.communicationPreferences,
                        phone: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter your phone number"
                  className="w-full p-3 bg-[#1a2235]/50 border border-gray-700/50 rounded-lg text-white
                    placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                    transition-all duration-150"
                />
              </div>
            </div>
          </div>

          {/* Availability Section - Optimized transitions */}
          <div className="bg-[#131b2e]/90 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10
            will-change-transform
            transition-all duration-150
            hover:ring-2 hover:ring-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">Availability</h4>
              <Tooltip content="Set your preferred contact hours">
                <div className="p-1 rounded-full hover:bg-white/5 transition-colors duration-150">
                  <FiInfo className="w-4 h-4 text-blue-300" />
                </div>
              </Tooltip>
            </div>
            <div className="space-y-2">
              {['Morning', 'Afternoon', 'Evening'].map((time) => (
                <div key={time} 
                  className="flex items-center p-3 rounded-lg bg-[#1a2235]/50
                  will-change-transform
                  transition-all duration-150 
                  hover:bg-[#1e2943]/50 hover:translate-x-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-blue-800 text-blue-500 
                      focus:ring-blue-500 focus:ring-offset-0 
                      transition-transform duration-150
                      hover:scale-105"
                    checked={formData.communicationPreferences?.availability?.includes(time) || false}
                    onChange={(e) => {
                      const currentAvailability = formData.communicationPreferences?.availability || [];
                      const updatedAvailability = e.target.checked
                        ? [...currentAvailability, time]
                        : currentAvailability.filter((t) => t !== time);
                      onUpdate({
                        communicationPreferences: {
                          ...formData.communicationPreferences,
                          availability: updatedAvailability,
                        },
                      });
                    }}
                  />
                  <div className="ml-3">
                    <span className="text-sm text-gray-200">{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Calculator Section */}
      <PriceCalculator formData={formData} onUpdate={onUpdate} />
    </div>
  );
};

export default CommunicationPricingForm;
