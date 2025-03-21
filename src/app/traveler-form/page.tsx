'use client';

import { useEffect, useState } from 'react';
import { getButtonText, steps } from './steps/steps';
import { motion } from 'framer-motion';
import TripDetails from './steps/TripDetails';
import TransportDetails from './steps/TransportDetails';
import Communication from './steps/Communication';
import ReviewOffer from './steps/ReviewOffer';
import { useForm } from 'react-hook-form';
import PriceCalculator from './steps/price-calculator/PriceCalculator';
import { CREATE_TRIP } from '../traveler/redux/tripsAction';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearTripsState } from '../traveler/redux/tripsSlice';
import { ProgressHeader } from './steps/ProgressHeader';
import { useTranslations } from 'next-intl';

const TravelerForm = () => {
  const { addTripSuccess } = useSelector((state) => state.trips);
  const [step, setStep] = useState(1);
  const t = useTranslations('travellerForm'); // language translation

  // Initialize React Hook Form
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    control,
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      // step 1: Trip details
      departure: {
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        date: '',
        time: '',
      },
      arrival: {
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        date: '',
        time: '',
      },
      packageReceptionDetails: {
        receptionMethod: '',
        advancedNotice: '',
        availableTimes: {
          weekdayMorning: false,
          weekdayAfternoon: false,
          weekdayEvening: false,
          weekendMorning: false,
          weekendAfternoon: false,
          weekendEvening: false,
        },
      },

      // step 2: package preferences/transport step
      packagePreferences: {
        maxWeight: '',
        secureHandling: false,
        expressDelivery: false,
        preferences: '',
      },
      responsibilities: {
        verifyContents: false,
        noRestrictedItems: false,
        reportSuspicious: false,
        legalResponsibilities: false,
      },

      // step 3: communication preferences
      travelPackageName: '',
      email: '',
      phone: '',
      // Availability for prefered contact hours
      availability: {
        morning: false,
        afternoon: false,
        evening: false,
      },
      contactMethods: {
        email: false,
        phone: false,
        chat: false,
      },

      // Pricing information
      pricing: {
        baseRate: '', // might not be required to be sent to backend
        ratePerKg: '',
        distance: '',
        urgentDelivery: false, // might not be required to be sent to backend
        urgentDeliveryCost: '', // might not be required to be sent to backend
        totalCost: '',
        packageType: '',
        weight: '',
      },
    },
  });

  const dispatch = useDispatch(); // dispatch
  const router = useRouter(); // router

  // Navigation handler
  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (step === 5) {
        submitForm(getValues());
      } else {
        setStep((prevStep) => prevStep + 1);
      }
    } else {
      console.log('Validation failed for step:', step);
    }
  };

  // handle back navigation
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  // handle multistep form submit
  const submitForm = (data) => {
    console.log('Form Submitted:', data);

    // format availability
    const availability = Object.keys(data.availability)
      .filter((key) => data.availability[key]) // Include only `true` values
      .join(', ');
    // format contact details
    const contactDetails = Object.keys(data.contactMethods)
      .filter((key) => data.contactMethods[key]) // Include only `true` values
      .join(', ');

    // format available reception times
    const availableReceptionTimes = Object.keys(
      data.packageReceptionDetails?.availableTimes,
    )
      .filter((key) => data.packageReceptionDetails?.availableTimes[key]) // Include only `true` values
      .join(', ');

    // Create payload
    const travelerPackagePayload = {
      name: data.travelPackageName,
      email: data.email,
      phone: data.phone,
      // updated location payload fields
      departureLocation: {
        latitude: parseFloat(data.departure?.latitude) || 0, // no latitude field in form
        longitude: parseFloat(data.departure?.longitude) || 0, // no longitude field in form
        state: data.departure.state,
        city: data.departure.city,
        country: data.departure.country,
        street_address: data.departure.street,
        postalcode: data.departure.postalCode,
        type: 'departure',
      },
      arrivalLocation: {
        latitude: parseFloat(data.arrival?.latitude) || 0, // no latitude field in form
        longitude: parseFloat(data.arrival?.longitude) || 0, // no longitude field in form
        state: data.arrival.state,
        city: data.arrival.city,
        country: data.arrival.country,
        street_address: data.arrival.street,
        postalcode: data.arrival.postalCode,
        type: 'arrival',
      },
      pricingDetails: {
        // baseRate: data.pricing?.baseRate || 0,
        // perKgRate: data.pricing?.ratePerKg || 0,
        // distance: data.pricing?.distance || 0,
        // urgentDeliveryRate: data.pricing?.urgentDeliveryCost || 0,
        // totalPrice: data.pricing?.totalCost || 0,
        // weight: data.pricing?.weight || 0,
        // specialHandlingRate: 0,

        baseRate: parseFloat(data.pricing?.baseRate) || 0,
        perKgRate: parseFloat(data.pricing?.ratePerKg) || 0,
        distance: parseFloat(data.pricing?.distance) || 0,
        urgentDeliveryRate: parseFloat(data.pricing?.urgentDeliveryCost) || 0,
        totalPrice: parseFloat(data.pricing?.totalCost) || 0,
        weight: parseFloat(data.pricing?.weight) || 0,
        specialHandlingRate: 0, // Defaulting to 0
      },
      transportDetails: {
        maxWeightCapacity: parseFloat(data.packagePreferences?.maxWeight),
        preferences: data.packagePreferences?.preferences || '',

        departureDateTime: data.departure.date, // date time
        arrivalDateTime: data.arrival.date, // date time

        // dont have these on my form data: HARDCODED FOR NOW
        acceptsShippedPackage: true,
        willPickup: true,
        meetAtAirport: true,
        willDeliver: true,
        speicalInstructions: 'hardcoded instructions',
        specialHandling: 'hardcoded handling',
      },
      receptionMethod: data.packageReceptionDetails?.receptionMethod || '',
      // need to modify: duplicate fields added
      tripDetails: {
        departureLocation: `${data.departure.city}, ${data.departure.country}`,
        arrivalLocation: `${data.arrival.city}, ${data.arrival.country}`,
        receptionMethod: data.packageReceptionDetails?.receptionMethod,
        advanceNoticeRequired: !!data.packageReceptionDetails?.advancedNotice,
        availableReceptionTimes: availableReceptionTimes,
        departureDateTime: data.departure.date,
        arrivalDateTime: data.arrival.date,
        vehicleDetail: '', // no field in form
      },
      availability: availability,
      contactMethods: contactDetails,

      // new as per sandhya ma'am
      communicationPref: {
        emailEnabled: true,
        smsEnabled: true,
        pushNotificationEnabled: true,
        availability: true,
      },
    };

    // dispatch action
    dispatch({
      type: CREATE_TRIP,
      payload: travelerPackagePayload,
    });
  };

  // handle success
  useEffect(() => {
    if (addTripSuccess) {
      console.log('trip added successfully');
      router.push('/');
      dispatch(clearTripsState());
    }
  }, [addTripSuccess]);

  return (
    <div className="min-h-screen bg-[#0f172a] py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-start sm:items-center">
            <ProgressHeader step={step} setStep={setStep} />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <form>
            <div>
              {step === 1 && (
                <TripDetails register={register} errors={errors} />
              )}
              {step === 2 && (
                <TransportDetails
                  register={register}
                  errors={errors}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
              )}
              {step === 3 && (
                <Communication register={register} errors={errors} />
              )}
              {step === 4 && (
                <PriceCalculator
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {step === 5 && <ReviewOffer formData={getValues()} />}
            </div>

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
                  {/* Back */}
                  {t('buttons.back')}
                </motion.button>
              )}
              <motion.button
                type={'button'}
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getButtonText(step, t)}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TravelerForm;
