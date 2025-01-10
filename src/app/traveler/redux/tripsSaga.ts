import { put, call } from 'redux-saga/effects';
import {
  fetchTripsRequest,
  fetchTripsSuccess,
  fetchTripsFailure,
  addTripRequest,
  addTripSuccess,
  addTripFailure,
} from './tripsSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { MOCK_TRIPS } from '@/data/mockTrips';
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
    // yield put(fetchTripsSuccess(response.data));
    // use mock trips for now
    yield put(fetchTripsSuccess(MOCK_TRIPS));
  } catch (error) {
    yield put(
      fetchTripsFailure(error.response?.data?.message || error.message)
    );
  }
}

// Add Trip Saga
export function* addTripSaga(action) {
  console.log('Inside add trip saga', action);
  try {
    yield put(addTripRequest());

    const { data } = action.payload;
    console.log('data from trip saga', data);

    // Construct the newPayload dynamically
    const newPayload = {
      name: 'Package Name', // Placeholder name, can be dynamic
      email: data.communicationPreferences?.email || '',
      phone: data.communicationPreferences?.phone || '+918719087038',
      contactMethods:
        data.communicationPreferences?.contactMethods?.join(', ') || '',
      availability:
        data.communicationPreferences?.availability?.join(', ') || '',
      receptionMethod: data.receptionMethod || '',
      tripDetails: {
        departureLocation: `${data.departureLocation.city}, ${data.departureLocation.country}`,
        arrivalLocation: `${data.arrivalLocation.city}, ${data.arrivalLocation.country}`,
        receptionMethod: data.receptionMethod || '',
        advanceNoticeRequired: !!data.advanceNotice,
        availableReceptionTimes: data.availableTimes?.weekdayAfternoon
          ? 'Afternoon'
          : '',
        departureDateTime: data.departureDate || '',
        arrivalDateTime: data.arrivalDate || '',
        vehicleDetail: '',
      },
      transportDetails: {
        maxWeightCapacity: Number(data.transportCapacity?.maxWeight) || 0,
        preferences: data.handlingPreferences?.specialInstructions || '',
        specialHandling: data.pricing?.urgentDelivery
          ? 'Urgent Delivery Required'
          : '',
        acceptsShippedPackage: true,
        willPickup: true,
        meetAtAirport: true,
        willDeliver: true,
        speicalInstructions: '',
        departureDateTime: data.departureDate,
        arrivalDateTime: data.arrivalDate,
      },
      pricingDetails: {
        baseRate: data.pricing?.baseRate || 0,
        perKgRate: data.pricing?.perKgRate || 0,
        urgentDeliveryRate: data.pricing?.urgentDeliveryRate || 0,
        specialHandlingRate: data.pricing?.specialHandlingRate || 0,
        distance: data.pricing?.distance || 0,
        totalPrice:
          (data.pricing?.baseRate || 0) +
          (data.pricing?.perKgRate || 0) * (data.pricing?.weight || 0),

        weight: data.pricing.weight || 0,
      },
    };

    console.log('Constructed newPayload:', newPayload);

    const response = yield call(
      axiosInstance.post,
      API_URL.TRAVELER_PACKAGES,
      newPayload
    );
    console.log('Add trip saga response', response);
    yield put(addTripSuccess());
    toast.success('Package Created successfully!');
  } catch (error) {
    yield put(addTripFailure(error.response?.data?.message || error.message));
    toast.error(error.response?.data?.message || error.message);
  }
}
