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
  fetchTravelerPackagesRequest,
  fetchTravelerPackagesSuccess,
  fetchTravelerPackagesFailure,
} from './tripsSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { toast } from 'react-toastify';

export function* fetchTripsSaga() {
  try {
    yield put(fetchTripsRequest());

    const response = yield call(
      axiosInstance.get,
      API_URL.ACTIVE_TRAVELER_PACKAGES,
    );
    yield put(fetchTripsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTripsFailure(error.response?.data?.message || error.message),
    );
  }
}

export function* fetchSingleTripSaga(action) {
  try {
    yield put(fetchSinglePackageRequest());
    const response = yield call(
      axiosInstance.get,
      `${API_URL.ACTIVE_TRAVELER_PACKAGES}/${action.payload}`,
    );
    yield put(fetchSinglePackageSuccess(response.data));
  } catch (error) {
    yield put(
      fetchSinglePackageFailure(error.response?.data?.message || error.message),
    );
    toast.error(
      `Failed to fetch package: ${error.response?.data?.message || error.message}`,
    );
  }
}

export function* fetchTravelerDetailsSaga(action) {
  try {
    yield put(fetchTravelerDetailsRequest());

    const response = yield call(
      axiosInstance.get,
      `${API_URL.USERS}/${action.payload}`,
    );
    yield put(fetchTravelerDetailsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTravelerDetailsFailure(
        error.response?.data?.message || error.message,
      ),
    );
    toast.error(
      `Failed to fetch traveler details: ${error.response?.data?.message || error.message}`,
    );
  }
}
export function* searchTravelerPackageSaga(action) {
  const { searchKeyword, startDate, endDate } = action.payload;

  try {
    yield put(fetchTripsRequest());

    const params = {
      ...(searchKeyword && { keyword: searchKeyword }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    const response = yield call(
      axiosInstance.get,
      `${API_URL.ACTIVE_TRAVELER_PACKAGES}/search`,
      {
        params,
      },
    );
    yield put(fetchTripsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTripsFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* addTripSaga(action) {
  try {
    yield put(addTripRequest());

    const response = yield call(
      axiosInstance.post,
      API_URL.TRAVELER_PACKAGES,
      action.payload,
    );
    yield put(addTripSuccess());
    toast.success('Package Created successfully!');
  } catch (error) {
    yield put(addTripFailure(error.response?.data?.message || error.message));
    toast.error(error.response?.data?.message || error.message);
  }
}

export function* fetchTravelerPackagesSaga(action) {
  try {
    yield put(fetchTravelerPackagesRequest());

    const { travelerId } = action.payload;
    const response = yield call(
      axiosInstance.get,
      `${API_URL.TRAVELER_PACKAGES}/traveler/${travelerId}`,
    );
    yield put(fetchTravelerPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTravelerPackagesFailure(
        error.response?.data?.message || error.message,
      ),
    );
  }
}
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
    },
    pricingDetails: {
      weight: 10,
      baseRate: 30,
      distance: 0,
      perKgRate: 100,
      totalPrice: 0,
      urgentDeliveryRate: 0,
      specialHandlingRate: 0,
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
    },
  },
];
