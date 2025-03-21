import { call, put } from 'redux-saga/effects';
import {
  clearState,
  createReviewFailure,
  createReviewStart,
  createReviewSuccess,
  deleteReviewFailure,
  deleteReviewStart,
  deleteReviewSuccess,
  fetchReviewsFailure,
  fetchReviewsStart,
  fetchReviewsSuccess,
  updateReviewFailure,
  updateReviewStart,
  updateReviewSuccess,
} from './reviewsSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { fetchTripsFailure } from '@/app/traveler/redux/tripsSlice';
import { error } from 'console';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function* fetchReviewsByTraveler(action) {
  try {
    yield put(fetchReviewsStart());
    const response = yield call(
      axiosInstance.get,
      `${API_URL.REVIEWS}/${action.payload}`,
    );
    yield put(fetchReviewsSuccess(response.data));
  } catch (error) {
    fetchReviewsFailure(error.response?.data?.message || error.message);
  }
}

export function* createReview(action) {
  try {
    yield put(createReviewStart());
    yield call(axiosInstance.post, API_URL.REVIEWS, action.payload);
    yield put(createReviewSuccess());
    toast.success('Review created successfully !');
  } catch (error) {
    yield put(
      createReviewFailure(error.response?.data?.message || error.message),
    );
    toast.error('Something went wrong');
  }
}

export function* updateReview(action) {
  try {
    yield put(updateReviewStart());
    const response = yield call(
      axiosInstance.patch,
      `${API_URL.REVIEWS}/${action.payload.id}`,
      action.payload,
    );
    toast.success('Review updated successfully');
    yield put(updateReviewSuccess());
  } catch (error) {
    yield put(
      updateReviewFailure(error.response?.data?.message || error.message),
    );
    toast.error('Something went wrong');
  }
}

export function* deleteReview(action) {
  try {
    yield put(deleteReviewStart());
    const response = yield call(
      axiosInstance.delete,
      `${API_URL.REVIEWS}/${action.payload.reviewId}`,
    );
    yield put(deleteReviewSuccess(response.data));
    yield call(fetchReviewsByTraveler, {
      payload: action.payload.travelerId,
    });
    toast.success('Review deleted successfully');
  } catch (error) {
    yield put(
      deleteReviewFailure(error.response?.data?.message || error.message),
    );
    toast.error('Something went wrong');
  }
}
