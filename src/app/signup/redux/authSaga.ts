import { put, call } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from './authSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';

// Signup Saga
export function* signupSaga(action) {
  try {
    yield put(signupRequest());

    const response = yield call(
      axiosInstance.post,
      API_URL.REGISTER,
      action.payload
    );

    yield put(signupSuccess(response.data));
  } catch (error) {
    yield put(signupFailure(error.response?.data?.message || error.message));
  }
}

// Login Saga
export function* loginSaga(action) {
  console.log('inside login saga', action);
  try {
    yield put(loginRequest());
    const response = yield call(
      axiosInstance.post,
      API_URL.LOGIN,
      action.payload
    );
    console.log('login response', response.data);
    yield put(
      loginSuccess({
        user: {
          id: response.data.userId,
          email: response.data.email,
          role: response.data.permissions,
        },
        token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      })
    );
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || error.message));
  }
}
