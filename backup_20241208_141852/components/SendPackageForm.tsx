import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packageCategories } from '../data/packageCategories';

interface FormData {
  category: string;
  subcategory: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  pickupLocation: string;
  deliveryLocation: string;
  preferredDate: string;
  specialInstructions: string;
}

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-gray-200 overflow-hidden">
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <h3 className="font-medium text-gray-900">{title}</h3>
    </div>
    <div className="p-4 bg-white space-y-4">
      {children}
    </div>
  </div>
);

const SendPackageForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    subcategory: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    pickupLocation: '',
    deliveryLocation: '',
    preferredDate: '',
    specialInstructions: ''
  });

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
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <FormSection title="Package Information">
              <div className="grid gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Package Category
                  </label>
                  <select
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                      focus:ring-blue-500 transition-all duration-200 text-gray-900"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    {packageCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.category && (
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Subcategory
                    </label>
                    <select
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                        focus:ring-blue-500 transition-all duration-200 text-gray-900"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    >
                      <option value="">Select a subcategory</option>
                      {packageCategories
                        .find((cat) => cat.id === formData.category)
                        ?.subcategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </FormSection>

            <FormSection title="Package Size & Weight">
              <div className="grid gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Weight
                  </label>
                  <div className="relative rounded-lg">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                        focus:ring-blue-500 transition-all duration-200 pr-12 text-gray-900"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="0.0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">kg</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Dimensions
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative rounded-lg">
                      <input
                        type="number"
                        min="0"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                          focus:ring-blue-500 transition-all duration-200 pr-12 text-gray-900"
                        value={formData.dimensions.length}
                        onChange={(e) => setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, length: e.target.value }
                        })}
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">cm</span>
                      </div>
                    </div>
                    <div className="relative rounded-lg">
                      <input
                        type="number"
                        min="0"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                          focus:ring-blue-500 transition-all duration-200 pr-12 text-gray-900"
                        value={formData.dimensions.width}
                        onChange={(e) => setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, width: e.target.value }
                        })}
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">cm</span>
                      </div>
                    </div>
                    <div className="relative rounded-lg">
                      <input
                        type="number"
                        min="0"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                          focus:ring-blue-500 transition-all duration-200 pr-12 text-gray-900"
                        value={formData.dimensions.height}
                        onChange={(e) => setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, height: e.target.value }
                        })}
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">cm</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Length × Width × Height</p>
                </div>
              </div>
            </FormSection>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <FormSection title="Pickup and Delivery Information">
              <div className="grid gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                      focus:ring-blue-500 transition-all duration-200 text-gray-900"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    placeholder="Enter pickup location"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                      focus:ring-blue-500 transition-all duration-200 text-gray-900"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    placeholder="Enter delivery location"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                      focus:ring-blue-500 transition-all duration-200 text-gray-900"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Special Instructions
                  </label>
                  <textarea
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 
                      focus:ring-blue-500 transition-all duration-200 text-gray-900"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                    placeholder="Enter special instructions"
                  />
                </div>
              </div>
            </FormSection>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <FormSection title="Review Your Package Details">
              <div className="grid gap-6">
                <div className="space-y-1.5">
                  <p>
                    <span className="text-gray-700 font-medium">Package Category:</span> {formData.category}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Subcategory:</span> {formData.subcategory}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Weight (kg):</span> {formData.weight}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Dimensions (cm):</span> {formData.dimensions.length} x {formData.dimensions.width} x {formData.dimensions.height}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Pickup Location:</span> {formData.pickupLocation}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Delivery Location:</span> {formData.deliveryLocation}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Preferred Date:</span> {formData.preferredDate}
                  </p>
                  <p>
                    <span className="text-gray-700 font-medium">Special Instructions:</span> {formData.specialInstructions}
                  </p>
                </div>
              </div>
            </FormSection>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center ${stepNumber !== 3 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber !== 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait" initial={false}>
          {renderStep()}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendPackageForm;
