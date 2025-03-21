import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { call, put } from 'redux-saga/effects';
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  fetchOrdersFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
} from './orderSlice';
import { toast } from 'react-toastify';
export function* fetchOrdersSaga() {
  try {
    yield put(fetchOrdersRequest());
    const response = yield call(axiosInstance.get, API_URL.ORDERS);
    yield put(fetchOrdersSuccess(response.data));
    toast.success('Orders fetched successfully!');
  } catch (error) {
    yield put(
      fetchOrdersFailure(error.response?.data?.message || error.message),
    );
    toast.error('Failed to fetch orders. Please try again.');
  }
}
export function* createOrderSaga(action) {
  try {
    yield put(createOrderRequest());
    const response = yield call(
      axiosInstance.post,
      API_URL.ORDERS,
      action.payload,
    );
    yield put(createOrderSuccess(response.data));
    toast.success('Order placed successfully!');
  } catch (error) {
    yield put(
      createOrderFailure(error.response?.data?.message || error.message),
    );
    toast.error('Failed to place order. Please try again.');
  }
}
