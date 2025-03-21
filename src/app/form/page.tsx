'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PackageDetails } from './steps/PackageDetails';
import { PickupDetails } from './steps/PickupDetails';
import { DeliveryDetails } from './steps/DeliveryDetails';
import { CommunicationPreferences } from './steps/CommunicationPreferences';
import { ReviewPackage } from './steps/ReviewPackage';
import { PlaceOrder } from './steps/PlaceOrder';
import { useDispatch, useSelector } from 'react-redux';
import { clearPackagesState } from '../sender/dashboard/redux/packagesSlice';
import { SEND_PACKAGE } from '../sender/dashboard/redux/packagesAction';
import { useTranslations } from 'next-intl';
import ProgressHeaders from './steps/ProgressSteps';

const PackageCreationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { sendPackageSuccess, sendPackageLoading } = useSelector(
    (state) => state.packages,
  );

  const t = useTranslations('SenderForm');
  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      category: '',
      subcategory: '',
      price: '',
      description: '',
      dimension: {
        length: '',
        width: '',
        height: '',
      },
      weight: '',
      origin: {
        street: '',
        postal: '',
        city: '',
      },
      destination: {
        street: '',
        postal: '',
        city: '',
      },
      pickupDate: '',
      preferredTime: '',
      phone: '',
      communication: [],
      packagePhotos: [],
      deliveryDate: '',
      preferredDeliveryTime: '',
      requiresCarefulHandling: false,
      isFragile: false,
      insurance: false,
      priority: false,
      specialInstructions: '',
    },
  });

  const dispatch = useDispatch();

  const nextStep = async () => {
    const isValid = await trigger();

    if (isValid) {
      if (currentStep === 5) {
        submitForm(getValues());
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const submitForm = (data) => {
    const createPackagePayload = {
      name: data?.name,
      categoryId: data?.category,
      subcategoryId: data?.subcategory,
      price: Number(data?.price),
      description: data?.description,
      packagePhotos: data?.packagePhotos || [],
      weight: Number(data?.weight),
      pickupLocation: data?.origin?.city || '',
      deliveryLocation: data?.destination?.city || '',

      dimensions: 20,
      preferredTimes: data?.preferredTime,
      preferredDate: data?.pickupDate,
      communicationPreferences: data?.communication?.join(', '),
      deliveryDate: data?.deliveryDate,

      requiresCarefulHandling: data?.requiresCarefulHandling,
      isFragile: data?.isFragile,
      specialInstructions: data?.specialInstructions || '',
      insurance: data?.insurance,
      priority: data?.priority,

      availabilityDates: data?.pickupDate,
      tracking: '',
      allowPostalDelivery: false,
      postalDeliveryDetails: '',
      restricted: false,
    };

    const mappedPayload = {
      name: data?.name || '',
      price: Number(data?.price) || 0,
      description: data?.description || '',
      requiresCarefulHandling: data?.requiresCarefulHandling || false,
      isFragile: data?.isFragile || false,
      specialInstructions: data?.specialInstructions || '',
      packagePhotos: data?.packagePhotos || [],
      weight: Number(data?.weight) || 0,
      insurance: data?.insurance || false,
      priority: data?.priority || false,
      communicationPreferences: data?.communicationPreferences || '',
      categoryId: data?.category || '',
      subcategoryId: data?.subcategory || '',

      dimension: {
        length: Number(data?.dimension?.length) || 0,
        width: Number(data?.dimension?.width) || 0,
        height: Number(data?.dimension?.height) || 0,
      },

      origin: {
        street: data?.origin?.street || '',
        postal: data?.origin?.postal || '',
        city: data?.origin?.city || '',
      },
      destination: {
        street: data?.destination?.street || '',
        postal: data?.destination?.postal || '',
        city: data?.destination?.city || '',
      },

      pickupDate: data?.pickupDate || '',
      pickupTime: data?.preferredTime || '',
      deliveryDate: data?.deliveryDate || '',
      deliveryTime: data?.preferredDeliveryTime || '',

      phone: data?.phone || '',
    };

    dispatch({
      type: SEND_PACKAGE,
      payload: mappedPayload,
    });
  };

  useEffect(() => {
    if (sendPackageSuccess) {
      setCurrentStep((prevStep) => prevStep + 1);
      dispatch(clearPackagesState());
    }
  }, [sendPackageSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            {/* Progress Indicator */}
            <div className="flex flex-col items-center sm:p-6">
              {/* Steps container */}
              <div className="flex justify-between items-start w-full">
                {/* progress bar */}

                <ProgressHeaders
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              {currentStep === 1 && (
                <PackageDetails
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                />
              )}
              {currentStep === 2 && (
                <PickupDetails control={control} errors={errors} />
              )}
              {currentStep === 3 && (
                <DeliveryDetails control={control} errors={errors} />
              )}
              {currentStep === 4 && (
                <CommunicationPreferences control={control} errors={errors} />
              )}
              {currentStep === 5 && <ReviewPackage formData={getValues()} />}
              {currentStep === 6 && <PlaceOrder />}
            </div>

            {/* Navigation buttons */}
            {currentStep < 6 && (
              <div
                className={`flex items-center mt-6 ${
                  currentStep === 1 ? 'justify-end' : 'justify-between'
                }`}
              >
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 focus:outline-none"
                  >
                    {t('buttons.back')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-6 py-2 rounded-lg font-semibold focus:outline-none transition-all ${
                    sendPackageLoading
                      ? 'bg-gray-400 text-gray-800'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={sendPackageLoading}
                >
                  {sendPackageLoading
                    ? t('buttons.loading')
                    : currentStep === 5
                      ? t('buttons.createPackage')
                      : t('buttons.next')}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageCreationForm;
