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

// fetch orders
export function* fetchOrdersSaga() {
  console.log('Inside fetch orders saga');
  try {
    yield put(fetchOrdersRequest());
    const response = yield call(axiosInstance.get, API_URL.ORDERS);
    console.log('Fetch orders saga response:', response);
    yield put(fetchOrdersSuccess(response.data));
    toast.success('Orders fetched successfully!');
  } catch (error) {
    yield put(
      fetchOrdersFailure(error.response?.data?.message || error.message)
    );
    toast.error('Failed to fetch orders. Please try again.');
  }
}

// create order
export function* createOrderSaga(action) {
  console.log('Inside create order saga');
  try {
    yield put(createOrderRequest());
    const response = yield call(
      axiosInstance.post,
      API_URL.ORDERS,
      action.payload
    );
    console.log('Create order saga response:', response);
    yield put(createOrderSuccess(response.data));
    toast.success('Order placed successfully!');
  } catch (error) {
    yield put(
      createOrderFailure(error.response?.data?.message || error.message)
    );
    toast.error('Failed to place order. Please try again.');
  }
}
