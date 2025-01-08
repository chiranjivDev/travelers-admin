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

// Fetch Trips Saga
export function* fetchTripsSaga() {
  console.log('Inside trips saga');
  try {
    yield put(fetchTripsRequest());

    // const response = yield call(axiosInstance.get, API_URL.TRIPS);
    // console.log('Fetch trips saga response', response);
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

    // Construct the payload dynamically
    // const payload = {
    //   name: 'Traveler Package', // Default or dynamic as required
    //   email: data.communicationPreferences?.email || '',
    //   phone: data.communicationPreferences?.phone || '',
    //   contactMethods:
    //     data.communicationPreferences?.contactMethods?.join(', ') || '',
    //   availability:
    //     data.communicationPreferences?.availability?.join(', ') || '',
    //   departureLocation: `${data.departureLocation.city}, ${data.departureLocation.country}`,
    //   arrivalLocation: `${data.arrivalLocation.city}, ${data.arrivalLocation.country}`,
    //   receptionMethod: data.receptionMethod || '',
    //   advanceNoticeRequired: !!data.advanceNotice,
    //   availableReceptionTimes: data.availableTimes?.weekdayAfternoon
    //     ? 'Afternoon'
    //     : '',
    //   departureDate: data.departureDate,
    //   arrivalDate: data.arrivalDate,
    //   baseRate: data.pricing?.baseRate || 0,
    //   perKgRate: data.pricing?.perKgRate || 0,
    //   urgentDeliveryRate: data.pricing?.urgentDeliveryRate || 0,
    //   specialHandlingRate: data.pricing?.specialHandlingRate || 0,
    //   distance: data.pricing?.distance || 0,
    //   totalPrice:
    //     (data.pricing?.baseRate || 0) +
    //     (data.pricing?.perKgRate || 0) * (data.pricing?.weight || 0),
    //   maxWeightCapacity: data.transportCapacity?.maxWeight || 0,
    //   preferences: data.handlingPreferences?.specialInstructions || '',
    //   specialHandling: data.pricing?.urgentDelivery
    //     ? 'Urgent Delivery Required'
    //     : '',
    // };

    // Construct the newPayload dynamically
    const newPayload = {
      name: 'John Doe', // Placeholder name, can be dynamic
      email: data.communicationPreferences?.email || '',
      phone: data.communicationPreferences?.phone || '',
      contactMethods:
        data.communicationPreferences?.contactMethods?.join(', ') || '',
      availability:
        data.communicationPreferences?.availability?.join(', ') || '',
      tripDetails: {
        departureLocation: `${data.departureLocation.city}, ${data.departureLocation.country}`,
        arrivalLocation: `${data.arrivalLocation.city}, ${data.arrivalLocation.country}`,
        receptionMethod: data.receptionMethod || '',
        advanceNoticeRequired: !!data.advanceNotice,
        availableReceptionTimes: data.availableTimes?.weekdayAfternoon
          ? 'Afternoon'
          : '',
        departureDate: data.departureDate || '',
        arrivalDate: data.arrivalDate || '',
        id: '5a51e312-e3ea-4400-ba77-cb6f687c943c', // Placeholder ID, can be dynamic
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      transportDetails: {
        maxWeightCapacity: data.transportCapacity?.maxWeight || 0,
        preferences: data.handlingPreferences?.specialInstructions || '',
        specialHandling: data.pricing?.urgentDelivery
          ? 'Urgent Delivery Required'
          : '',
        id: '52842e6d-717d-4313-932f-687645c6fe89', // Placeholder ID, can be dynamic
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        id: '2746dc7a-9f30-4ddd-9b1a-43aa83cba96a', // Placeholder ID, can be dynamic
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      id: '022f9e6f-e056-4849-a730-936aef7f7d1e', // Placeholder ID, can be dynamic
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('Constructed newPayload:', newPayload);

    const response = yield call(
      axiosInstance.post,
      API_URL.TRAVELER_PACKAGE,
      newPayload
    );
    console.log('Add trip saga response', response);
    yield put(addTripSuccess());
  } catch (error) {
    yield put(addTripFailure(error.response?.data?.message || error.message));
  }
}
