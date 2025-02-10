import { put, call } from 'redux-saga/effects';
import {
  fetchTripsRequest,
  fetchTripsSuccess,
  fetchTripsFailure,
  addTripRequest,
  addTripSuccess,
  addTripFailure,
  fetchSinglePackageRequest,
  fetchSinglePackageSuccess,
  fetchSinglePackageFailure,
  fetchTravelerDetailsRequest,
  fetchTravelerDetailsSuccess,
  fetchTravelerDetailsFailure,
} from './tripsSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
// import { MOCK_TRIPS } from '@/data/mockTrips';
import { toast } from 'react-toastify';

// Fetch Trips Saga
export function* fetchTripsSaga() {
  console.log('Inside trips saga');
  try {
    yield put(fetchTripsRequest());

    const response = yield call(
      axiosInstance.get,
      API_URL.ACTIVE_TRAVELER_PACKAGES
    );
    console.log('Fetch trips saga response', response);
    yield put(fetchTripsSuccess(response.data));
    // use mock trips for now
    // yield put(fetchTripsSuccess(MOCK_TRIPS));
  } catch (error) {
    yield put(
      fetchTripsFailure(error.response?.data?.message || error.message)
    );
  }
}

// Add Trip Saga
// export function* addTripSaga(action) {
//   console.log('Inside add trip saga', action);
//   try {
//     yield put(addTripRequest());

//     const { data } = action.payload;
//     console.log('data from trip saga', data);

//     // Construct the newPayload dynamically
//     const newPayload = {
//       name: 'Package Name test', // Placeholder name, can be dynamic
//       email: data.communicationPreferences?.email || '',
//       phone: data.communicationPreferences?.phone || '+918719087038',
//       contactMethods:
//         data.communicationPreferences?.contactMethods?.join(', ') || '',
//       availability:
//         data.communicationPreferences?.availability?.join(', ') || '',
//       receptionMethod: data.receptionMethod || '',
//       tripDetails: {
//         departureLocation: `${data.departureLocation.city}, ${data.departureLocation.country}`,
//         arrivalLocation: `${data.arrivalLocation.city}, ${data.arrivalLocation.country}`,
//         receptionMethod: data.receptionMethod || '',
//         advanceNoticeRequired: !!data.advanceNotice,
//         availableReceptionTimes: data.availableTimes?.weekdayAfternoon
//           ? 'Afternoon'
//           : '',
//         departureDateTime: data.departureDate || '',
//         arrivalDateTime: data.arrivalDate || '',
//         vehicleDetail: '',
//       },
//       transportDetails: {
//         maxWeightCapacity: Number(data.transportCapacity?.maxWeight) || 0,
//         preferences: data.handlingPreferences?.specialInstructions || '',
//         specialHandling: data.pricing?.urgentDelivery
//           ? 'Urgent Delivery Required'
//           : '',
//         departureDateTime: data.departureDate,
//         arrivalDateTime: data.arrivalDate,
//         acceptsShippedPackage: true,
//         willPickup: true,
//         meetAtAirport: true,
//         willDeliver: true,
//         speicalInstructions: '',
//       },
//       pricingDetails: {
//         baseRate: data.pricing?.baseRate || 0,
//         perKgRate: data.pricing?.perKgRate || 0,
//         urgentDeliveryRate: data.pricing?.urgentDeliveryRate || 0,
//         specialHandlingRate: data.pricing?.specialHandlingRate || 0,
//         distance: data.pricing?.distance || 0,
//         totalPrice:
//           (data.pricing?.baseRate || 0) +
//           (data.pricing?.perKgRate || 0) * (data.pricing?.weight || 0),

//         weight: data.pricing.weight || 0,
//       },

//       // updated payload
//       arrivalLocation: {
//         latitude: data.arrivalLocation.coordinates.lat,
//         longitude: data.arrivalLocation.coordinates.lng,
//         state: data.arrivalLocation.state,
//         city: data.arrivalLocation.city || '',
//         country: data.arrivalLocation.country || '',
//         street_address: data.arrivalLocation.street,
//         postalcode: data.arrivalLocation.postalCode,
//         type: 'arrival',
//       },
//       departureLocation: {
//         latitude: data?.departureLocation?.coordinates?.lat,
//         longitude: data?.departureLocation?.coordinates?.lng,
//         state: data.departureLocation.state,
//         city: data.departureLocation.city,
//         country: data.departureLocation.country,
//         street_address: data?.departureLocation?.street,
//         postalcode: data?.departureLocation?.postalCode,
//         type: 'departure',
//       },
//     };

//     console.log('Constructed newPayload:', newPayload);

//     const response = yield call(
//       axiosInstance.post,
//       API_URL.TRAVELER_PACKAGES,
//       newPayload
//     );
//     console.log('Add trip saga response', response);
//     yield put(addTripSuccess());
//     toast.success('Package Created successfully!');
//   } catch (error) {
//     yield put(addTripFailure(error.response?.data?.message || error.message));
//     toast.error(error.response?.data?.message || error.message);
//   }
// }

// Fetch Single Trip/Package Saga
export function* fetchSingleTripSaga(action) {
  console.log('Fetching single package with ID:', action.payload);
  // try {
  //   yield put(fetchSinglePackageRequest());
  //   const response = yield call(
  //     axiosInstance.get,
  //     `${API_URL.ACTIVE_TRAVELER_PACKAGES}/${action.payload}`
  //   );
  //   console.log('Single package fetch response:', response);
  //   yield put(fetchSinglePackageSuccess(response.data));
  // } catch (error) {
  //   yield put(
  //     fetchSinglePackageFailure(error.response?.data?.message || error.message)
  //   );
  //   toast.error(
  //     `Failed to fetch package: ${error.response?.data?.message || error.message}`
  //   );
  // }
}

// Fetch Traveler Details Saga
export function* fetchTravelerDetailsSaga(action) {
  console.log('Fetching traveler details with ID:', action.payload);
  try {
    yield put(fetchTravelerDetailsRequest());

    const response = yield call(
      axiosInstance.get,
      `${API_URL.USERS}/${action.payload}`
    );
    console.log('Fetching traveler detail response:', response);
    yield put(fetchTravelerDetailsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTravelerDetailsFailure(
        error.response?.data?.message || error.message
      )
    );
    toast.error(
      `Failed to fetch traveler details: ${error.response?.data?.message || error.message}`
    );
  }
}

// Search Traveler Package Saga
export function* searchTravelerPackageSaga(action) {
  const { searchKeyword, startDate, endDate } = action.payload;
  console.log(
    'Searching for traveler package with keyword/dates:',
    searchKeyword,
    startDate,
    endDate
  );
  try {
    yield put(fetchTripsRequest());

    // Filter out empty or undefined parameters
    const params = {
      ...(searchKeyword && { keyword: searchKeyword }), // Only add if not empty
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    const response = yield call(
      axiosInstance.get,
      `${API_URL.ACTIVE_TRAVELER_PACKAGES}/search`,
      {
        params,
      }
    );

    // const response = yield call(
    //   axiosInstance.get,
    //   `${API_URL.ACTIVE_TRAVELER_PACKAGES}/search`,
    //   {
    //     params: {
    //       keyword: searchKeyword || '',
    //       startDate: startDate || undefined,
    //       endDate: endDate || undefined,
    //     },
    //   }
    // );

    // const response = yield call(
    //   axiosInstance.get,
    //   `${API_URL.ACTIVE_TRAVELER_PACKAGES}/search?keyword=${searchKeyword}`
    // );
    console.log('Search trips saga response', response);
    yield put(fetchTripsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTripsFailure(error.response?.data?.message || error.message)
    );
  }
}

// Create trip saga for new travelers form
export function* addTripSaga(action) {
  console.log('Inside add trip saga', action);
  try {
    yield put(addTripRequest());
    console.log(
      'inside create traveler package saga payload ===> ',
      action.payload
    );

    const response = yield call(
      axiosInstance.post,
      API_URL.TRAVELER_PACKAGES,
      action.payload
    );
    console.log('Add trip saga response', response);
    yield put(addTripSuccess());
    toast.success('Package Created successfully!');
  } catch (error) {
    yield put(addTripFailure(error.response?.data?.message || error.message));
    toast.error(error.response?.data?.message || error.message);
  }
}

// Mock data for now
export const MOCK_TRIPS = [
  {
    id: '300cfe73-1f59-4010-9424-81116a31d9f9',
    name: 'Test',
    email: 'mailto:asd123@gmail.com',
    phone: '+916755677655',
    contactMethods: 'Email',
    availability: 'yesss',
    tripDetails: {
      vehicleDetail: 'Airplane',
      arrivalDateTime: '2025-01-18T04:37:40.785Z',
      arrivalLocation: 'Varanasi',
      receptionMethod: 'Airport',
      departureDateTime: '2025-01-17T04:37:40.785Z',
      departureLocation: 'Bilaspur',
      advanceNoticeRequired: true,
      availableReceptionTimes: 'string',
      // to be added in the backend
      // stops:[''],
      // flexibility:'',
      // description:''.
    },
    pricingDetails: {
      weight: 10,
      baseRate: 30,
      distance: 0,
      perKgRate: 100,
      totalPrice: 0,
      urgentDeliveryRate: 0,
      specialHandlingRate: 0,
      // to be added in the backend
      // express: 20,
    },
    transportDetails: {
      willPickup: true,
      preferences: 'string',
      willDeliver: true,
      meetAtAirport: true,
      arrivalDateTime: '2025-01-19T04:37:40.785Z',
      specialHandling: 'string',
      departureDateTime: '2025-01-18T04:37:40.785Z',
      maxWeightCapacity: 20,
      speicalInstructions: 'string',
      acceptsShippedPackage: true,
    },
    createdAt: '2025-01-13T04:57:26.619Z',
    updatedAt: '2025-01-13T04:57:26.619Z',
    communicationPref: {
      id: 'c2cf7664-8ea0-4344-808b-c0c9134dd4e4',
      emailEnabled: true,
      smsEnabled: false,
      pushNotificationEnabled: true,
      availability: true,
    },
    traveler: {
      id: 'traveler2',
      email: 'mailto:amit12@gmail.com',
      password: '$2b$10$uL61gROTfuRQ75lMGCYAMeA2v9CEs5rCmvsbUi.ImujXcvSEnphV2',
      name: 'amit11',
      picture_url: null,
      permissions: 'traveler',
      passwordReset: null,
      status: 'inactive',
      phone: '+1234567890',
      is_email_verified: false,
      created_at: '2025-01-09T08:50:38.840Z',
      updated_at: '2025-01-09T08:50:38.840Z',
      // to be added in the backend
      // isVerified: true,
      // isSuperTraveler: true,
    },

    // needed fields as per the ui
    // stats: {
    //   reviewCount: 5,
    //   rating: 10,
    //   successRate: '',
    //   completedTrips: '',
    //   responseTime: '',
    // },
    // preferences: {
    //   accepted: [],
    //   restricted: [],
    // },
  },
];
