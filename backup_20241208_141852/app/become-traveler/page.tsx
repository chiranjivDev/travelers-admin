'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TripDetailsForm from '@/components/TravelerForms/TripDetailsForm'
import TransportDetailsForm from '@/components/TravelerForms/TransportDetailsForm'
import CommunicationPricingForm from '@/components/TravelerForms/CommunicationPricingForm'
import ReviewOffer from '@/components/TravelerForms/ReviewOffer'
import { TravelerFormData } from '@/components/TravelerForms/types'

export default function BecomeTraveler() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<TravelerFormData>({
    origin: {
      city: '',
      country: ''
    },
    destination: {
      city: '',
      country: ''
    },
    travelDates: {
      isRecurring: false,
      recurringPattern: '',
      specificDate: '',
      transportNumber: ''
    },
    transportCapacity: {
      maxWeight: '',
      acceptedSizes: [],
      transportType: '',
      vehicleDetails: ''
    },
    handlingPreferences: {
      acceptsShippedPackages: false,
      willPickup: false,
      meetAtAirport: false,
      willDeliver: false,
      specialInstructions: ''
    },
    pricing: {
      baseRate: 0,
      perKgRate: 0,
      urgentDeliveryRate: 0,
      specialHandlingRate: 0
    }
  })

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4))
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1))
  const handleSubmit = async () => {
    // TODO: Implement submission logic
    console.log('Submitting form data:', formData)
  }

  const updateFormData = (data: Partial<TravelerFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const getButtonText = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return 'Continue to Transport Details'
      case 2:
        return 'Continue to Communication'
      case 3:
        return 'Continue to Review'
      case 4:
        return 'Submit Offer'
      default:
        return 'Continue'
    }
  }

  const steps = [
    { 
      icon: '📍', 
      title: 'What is your travel route?'
    },
    { 
      icon: '✈️', 
      title: 'Transport Details'
    },
    { 
      icon: '💬', 
      title: 'Communication & Pricing'
    },
    {
      icon: '✓',
      title: 'Review your offer'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f172a] py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((stepItem, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index !== steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="text-center flex-1">
                  <div
                    className={`
                      w-12 h-12 mx-auto rounded-full flex items-center justify-center
                      ${step > index + 1 
                        ? 'bg-green-500 text-white' 
                        : step === index + 1 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200/10 text-gray-500'
                      }
                      mb-2 text-xl
                    `}
                  >
                    {stepItem.icon}
                  </div>
                  <p className="text-sm text-gray-300 mt-2 max-w-[150px] mx-auto">
                    {stepItem.title}
                  </p>
                </div>
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4">
                    <div className="h-full bg-gray-700 rounded">
                      <div
                        className={`h-full ${
                          step > index + 1 ? 'bg-green-500' : 'bg-gray-700'
                        } rounded transition-all duration-300`}
                        style={{
                          width: step > index + 1 ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <AnimatePresence mode='wait'>
            <motion.div
              key={step}
              custom={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {step === 1 && (
                <TripDetailsForm
                  formData={formData}
                  onUpdate={updateFormData}
                />
              )}
              {step === 2 && (
                <TransportDetailsForm
                  formData={formData}
                  onUpdate={updateFormData}
                />
              )}
              {step === 3 && (
                <CommunicationPricingForm
                  formData={formData}
                  onUpdate={updateFormData}
                />
              )}
              {step === 4 && (
                <ReviewOffer
                  formData={formData}
                  onSubmit={handleSubmit}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            )}
            <motion.button
              type={step === 4 ? 'submit' : 'button'}
              onClick={step === 4 ? handleSubmit : handleNext}
              className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getButtonText(step)}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
