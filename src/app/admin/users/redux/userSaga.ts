import { put, call } from 'redux-saga/effects';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserStatusRequest,
  updateUserStatusSuccess,
  updateUserStatusFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from './userSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { GET_ALL_USERS } from './userAction';
export function* fetchUsersSaga() {
  try {
    yield put(fetchUsersRequest());

    const response = yield call(axiosInstance.get, API_URL.USERS);

    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(
      fetchUsersFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* updateUserStatusSaga(action) {
  try {
    yield put(updateUserStatusRequest());

    const { id, status } = action.payload;

    const userStatus = {
      status: status,
    };

    const response = yield call(
      axiosInstance.patch,
      `${API_URL.USERS}/${id}`,
      userStatus,
    );
    if (response.status === 200) {
      yield put(updateUserStatusSuccess());
      yield put({ type: GET_ALL_USERS });
    }
  } catch (error) {
    yield put(
      updateUserStatusFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* deleteUserSaga(action) {
  try {
    yield put(deleteUserRequest());

    const { userId } = action.payload;
    yield call(axiosInstance.delete, `${API_URL.USERS}/${userId}`);

    yield put(deleteUserSuccess({ userId }));
  } catch (error) {
    yield put(
      deleteUserFailure(error.response?.data?.message || error.message),
    );
  }
}
