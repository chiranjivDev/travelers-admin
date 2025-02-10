'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { packageCategories } from './packageCategories';
import AddressInput from '@/components/AddressInput';
import DeliveryMethod, {
  DeliveryMethodDetails,
} from '@/components/DeliveryMethod';
import PackageDetails from '@/components/PackageDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
  PACKAGE_CATEGORIES,
  SEND_PACKAGE,
} from '../sender/dashboard/redux/packagesAction';
import { useRouter } from 'next/navigation';
import { clearPackagesState } from '../sender/dashboard/redux/packagesSlice';
import { TRIPS } from '../traveler/redux/tripsAction';
import { CREATE_ORDER } from '../sender/dashboard/redux/orderAction';
import { useAuth } from '@/contexts/AuthContext';
import { clearOrdersState } from '../sender/dashboard/redux/orderSlice';

interface AddressDetails {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  instructions?: string;
}

interface FormData {
  packageName: string; // package name
  price: number; // price
  description: string; // description
  category: string;
  subcategory: string;
  selectedSize?: 'small' | 'medium' | 'large' | 'custom';
  customDimensions?: {
    weight?: string;
    length?: string;
    width?: string;
    height?: string;
  };
  pickupMethod: DeliveryMethodDetails;
  deliveryMethod: DeliveryMethodDetails;
  pickupLocation: AddressDetails;
  deliveryLocation: AddressDetails;
  preferredDate: string;
  specialInstructions: string;
  packageHandling: {
    requiresCarefulHandling: boolean;
    isFragile: boolean;
    specialInstructions?: string;
  };
  communicationPreferences: {
    whatsapp: boolean;
    phone: boolean;
    email: boolean;
    inApp: boolean;
    preferredNumber: string;
    preferredEmail: string;
    languagePreference: string;
  };
  preferredTimes: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    specific: string;
    flexibleDays: boolean;
    preferredDays: string[];
  };
  packagePhotos: string[];
  pickupFlexibility: {
    isFlexible: boolean;
    maxDistance: number;
    preferredCities: string[];
    canShipToTraveler: boolean;
    shippingPreferences: {
      maxCost: number;
      preferredServices: string[];
    };
  };
}

export default function SendPackage() {
  // use selector for categories
  const [showOrderComponent, setShowOrderComponent] = useState(false);
  const {
    categories: packageCategories,
    sendPackageSuccess,
    sendPackageResponse,
  } = useSelector((state) => state.packages);

  const dispatch = useDispatch();

  console.log('send package response ==> ', sendPackageResponse);

  useEffect(() => {
    if (sendPackageSuccess) {
      setShowOrderComponent(true);
      dispatch(clearPackagesState());
    }
  }, [sendPackageSuccess]);

  useEffect(() => {
    dispatch({ type: PACKAGE_CATEGORIES });
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    packageName: '', // package name
    price: '', // price
    description: '', // description
    category: '',
    subcategory: '',
    selectedSize: undefined,
    customDimensions: {
      weight: '',
      length: '',
      width: '',
      height: '',
    },
    pickupMethod: {
      type: 'station',
      stationDetails: {
        stationName: '',
        stationAddress: '',
        preferredTime: '',
      },
    },
    deliveryMethod: {
      type: 'station',
      stationDetails: {
        stationName: '',
        stationAddress: '',
        preferredTime: '',
      },
    },
    pickupLocation: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      instructions: '',
    },
    deliveryLocation: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      instructions: '',
    },
    preferredDate: '',
    specialInstructions: '',
    packageHandling: {
      requiresCarefulHandling: false,
      isFragile: false,
      specialInstructions: '',
    },
    communicationPreferences: {
      whatsapp: false,
      phone: false,
      email: false,
      inApp: false,
      preferredNumber: '',
      preferredEmail: '',
      languagePreference: '',
    },
    preferredTimes: {
      morning: false,
      afternoon: false,
      evening: false,
      specific: '',
      flexibleDays: false,
      preferredDays: [],
    },
    packagePhotos: [],
    pickupFlexibility: {
      isFlexible: false,
      maxDistance: 50,
      preferredCities: [],
      canShipToTraveler: false,
      shippingPreferences: {
        maxCost: 0,
        preferredServices: [],
      },
    },
  });

  const steps = [
    {
      id: 1,
      title: 'Package Type',
      subtitle: "Tell us what you're sending",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Package Pickup',
      subtitle: 'Set pickup details',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      // title: 'Review',
      // subtitle: 'Confirm details',
      title: 'Package Delivery',
      subtitle: 'Set Delivery details',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -1000,
      opacity: 0,
    },
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  // Handle send package form submit
  const handleSubmit = (e: React.FormEvent) => {
    console.log('current step', step);
    e.preventDefault();
    console.log('Send package Form submitted:', formData);

    // dispatch send package
    dispatch({
      type: SEND_PACKAGE,
      payload: {
        data: formData,
      },
    });
  };

  const handleParentStep = () => {
    setStep((prev) => prev + 1);
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    console.log('inside handle file upload');
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    console.log('new photos', newPhotos);
    setFormData((prev) => ({
      ...prev,
      packagePhotos: [...prev.packagePhotos, ...newPhotos],
    }));
  };

  const removePhoto = (index) => {
    const updatedPhotos = formData.packagePhotos.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, packagePhotos: updatedPhotos }));
  };

  const renderStep = () => {
    switch (step) {
      // What are you sending
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
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black">
                  What are you sending?
                </h2>
                <p className="text-gray-600 mt-2">
                  Tell us about what you're sending to help travelers understand
                  your package better.
                </p>
              </div>

              {/* Additional Fields as per our DB degin */}
              <div>
                {/* Add a package name */}
                <div className="mb-6">
                  <label
                    htmlFor="packageName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Package Name
                  </label>
                  <input
                    type="text"
                    id="packageName"
                    className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={formData.packageName}
                    onChange={(e) =>
                      setFormData({ ...formData, packageName: e.target.value })
                    }
                    aria-label="Enter package name"
                    placeholder="Enter package name"
                  />
                </div>
              </div>

              <div>
                {/* Add a package description */}
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Package Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    aria-label="Enter package Description"
                    placeholder="Enter package Description"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Package Category
                  </label>
                  <select
                    id="category"
                    className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    aria-label="Select package category"
                  >
                    <option value="">Select Category</option>
                    {packageCategories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory: conditionally visible based on category selection */}
                {formData.category && (
                  <div>
                    <label
                      htmlFor="subcategory"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Package Type
                    </label>
                    <select
                      id="subcategory"
                      className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      value={formData.subcategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subcategory: e.target.value,
                        })
                      }
                      aria-label="Select package type"
                    >
                      <option value="">Select Type</option>
                      {packageCategories
                        .find(
                          (category) =>
                            category.categoryId === formData.category
                        )
                        ?.subcategories.map((subcategory) => (
                          <option
                            key={subcategory.subcategoryId}
                            value={subcategory.subcategoryId}
                          >
                            {subcategory.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Package Details : size and custom size */}
                <PackageDetails
                  value={{ selectedSize: formData.selectedSize }}
                  onChange={(details) => {
                    setFormData({
                      ...formData,
                      selectedSize: details.selectedSize,
                      customDimensions:
                        details.selectedSize === 'custom'
                          ? formData.customDimensions
                          : undefined,
                    });
                  }}
                />

                {/* Add a Price */}
                <div className="mb-6">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    aria-label="Enter price"
                    placeholder="Enter price"
                  />
                </div>

                {/* Package Photos Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4  text-gray-700">
                    Package Photos
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add photos of your package to help travelers better
                    understand its appearance and condition. This also helps
                    with package verification during pickup and delivery.
                  </p>

                  <div className="relative">
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                      <div className="space-y-2 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload photos</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              multiple
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB each
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.packagePhotos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Uploaded Photos
                      </h4>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {formData.packagePhotos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={photo}
                                alt={`Package photo ${index + 1}`}
                                className="object-cover"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                // onClick={() => {
                                //   const newPhotos =
                                //     formData.packagePhotos.filter(
                                //       (_, i) => i !== index
                                //     );
                                //   setFormData({
                                //     ...formData,
                                //     packagePhotos: newPhotos,
                                //   });
                                // }}
                                onClick={() => removePhoto(index)}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Information about photos */}
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      Photo Guidelines
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • Take clear, well-lit photos from multiple angles
                      </li>
                      <li>• Include any fragile/handling labels if present</li>
                      <li>• Show the packaging condition clearly</li>
                      <li>
                        • Avoid including personal or sensitive information in
                        photos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      // Pick up details
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
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black">
                  Package Handling
                </h2>
                <p className="text-gray-600 mt-2">
                  Set your package handling preferences and requirements.
                </p>
              </div>
              <div className="space-y-6">
                <DeliveryMethod
                  type="pickup"
                  value={formData.pickupMethod}
                  onChange={(method) =>
                    setFormData({ ...formData, pickupMethod: method })
                  }
                  className="w-full"
                  triggerParentStep={handleParentStep} // add this
                />
              </div>
              {/* Step Navigation */}
              {/* <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => handlePickupStepChange(currentPickupStep - 1)}
                  className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md text-sm font-medium"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handlePickupStepChange(currentPickupStep + 1)}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium"
                >
                  Continue
                </button>
              </div> */}
            </div>
          </motion.div>
        );

      // Confirm details
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
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black">
                  {/* Communication Preferences */}
                  Delivery Address
                </h2>
                <p className="text-gray-600 mt-2">
                  {/* Choose how you'd like to coordinate with the traveler. */}
                  Where this packages is to be delivered
                </p>
              </div>

              <div className="space-y-6">
                <DeliveryMethod
                  type="delivery" // modified for testing
                  value={formData.deliveryMethod} // modified for testing
                  onChange={
                    (method) =>
                      setFormData({ ...formData, deliveryMethod: method }) // modified for testing
                  }
                  className="w-full"
                  triggerParentStep={handleParentStep} // added for testing
                />
              </div>

              {/* Step Navigation */}
              {/* Comment out for now */}
              {/* <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => handlePickupStepChange(currentPickupStep - 1)}
                  className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md text-sm font-medium"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handlePickupStepChange(currentPickupStep + 1)}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium"
                  disabled
                >
                  Continue
                </button>
              </div> */}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Additional step for placing order
  if (showOrderComponent) {
    return <SelectTraveler sendPackageResponse={sendPackageResponse} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center p-6">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`flex flex-col items-center w-1/3 ${
                    s.id === step ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2
                      ${
                        s.id <= step
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }
                      ${s.id === step ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                    `}
                  >
                    {s.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-0.5">{s.title}</p>
                    <p className="text-xs text-gray-500 max-w-[120px] mx-auto">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-1 bg-gray-200 rounded">
              <div
                className="absolute h-full bg-blue-600 rounded transition-all duration-300 ease-out"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Render send package steps conditionally */}
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 
                    ${
                      step === 1
                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium 
                      hover:bg-blue-700 transition-all duration-200 focus:ring-4 focus:ring-blue-100"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium 
                      hover:bg-green-700 transition-all duration-200 focus:ring-4 focus:ring-green-100"
                  >
                    Submit Package
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// compoent for selecting a traveler and placing an order
const SelectTraveler = ({ sendPackageResponse }) => {
  const [selectedTrip, setSelectedTrip] = useState('');
  const { trips } = useSelector((state) => state.trips);
  const { createOrderSuccess } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const router = useRouter();

  // fetch user information
  const { user } = useAuth();

  useEffect(() => {
    dispatch({ type: TRIPS });
  }, [dispatch]);

  // handle create Order
  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!selectedTrip) {
      alert('Please select a traveler package.');
      return;
    }
    const payload = {
      senderId: sendPackageResponse?.sender?.id,
      traveler_package_id: selectedTrip,
      sender_package_id: sendPackageResponse?.packageID,
    };
    dispatch({ type: CREATE_ORDER, payload });
  };

  useEffect(() => {
    if (createOrderSuccess) {
      router.push('/');
      dispatch(clearOrdersState());
    }
  }, [createOrderSuccess]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Select a Traveler and Place Your Order
      </h2>
      {/* Select a trip/traveler package */}
      <select
        value={selectedTrip}
        onChange={(e) => setSelectedTrip(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="">Select a Trip</option>
        {trips?.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.name}
          </option>
        ))}
      </select>
      {/* Place Order Button */}
      <button
        onClick={handleCreateOrder}
        className="py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        Submit and Place Order
      </button>
    </div>
  );
};
