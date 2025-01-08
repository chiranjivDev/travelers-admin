import { put, call } from "redux-saga/effects";
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
} from "./userSlice"; // Assuming userSlice handles user-related actions
import { axiosInstance } from "@/services/httpServices";
import { API_URL } from "@/services/webConstants";

// Fetch Users Saga
export function* fetchUsersSaga() {
  try {
    yield put(fetchUsersRequest());

    const response = yield call(axiosInstance.get, API_URL.USERS);

    yield put(fetchUsersSuccess(response.data)); // Assuming API response has user data in `response.data`
  } catch (error) {
    yield put(
      fetchUsersFailure(error.response?.data?.message || error.message)
    );
  }
}

// Update User Status Saga
export function* updateUserStatusSaga(action) {
  console.log("updateUserStatusSaga called", action);

  try {
    console.log("updateUserStatusSaga called", action);
    yield put(updateUserStatusRequest());

    const { id } = action.payload;
    console.log("UserId ", id);

    const status = {
      status: "active",
    };

    const response = yield call(
      axiosInstance.patch,
      `${API_URL.USERS}/${id}`,
      status
    );
    console.log("response=======>>", response);
    const responseStatus = response.data.status;
    const responseStatusId = response.data.id;
    console.log("Response from API:", response);

    yield put(updateUserStatusSuccess({ responseStatus, responseStatusId }));
  } catch (error) {
    yield put(
      updateUserStatusFailure(error.response?.data?.message || error.message)
    );
  }
}

// DELETE USER SAGA
export function* deleteUserSaga(action) {
  try {
    yield put(deleteUserRequest());

    const { userId } = action.payload;

    // Make the DELETE API call
    yield call(axiosInstance.delete, `${API_URL.USERS}/${userId}`);

    // Dispatch success action with userId
    yield put(deleteUserSuccess({ userId }));
  } catch (error) {
    // Dispatch failure action with error message
    yield put(
      deleteUserFailure(error.response?.data?.message || error.message)
    );
  }
}
