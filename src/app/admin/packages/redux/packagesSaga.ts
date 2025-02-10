import { put, call } from "redux-saga/effects";
import {
  fetchPackagesRequest,
  fetchPackagesSuccess,
  fetchPackagesFailure,
  updatePackagesStatusFailure,
  updatePackagesStatusSuccess,
  updatePackagesStatusRequest,
  deletePackageRequest,
  deletePackageSuccess,
  deletePackageFailure,
} from "./packagesSlice";
import { axiosInstance } from "@/services/httpServices";
import { API_URL } from "@/services/webConstants";
import { GET_ALL_PACKAGES } from "./packagesAction";

// Fetch Packages Saga
export function* PackagesSaga() {
  try {
    yield put(fetchPackagesRequest());
    const response = yield call(axiosInstance.get, API_URL.ADMIN_PACKAGES);
    yield put(fetchPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPackagesFailure(error.response?.data?.message || error.message)
    );
  }
}

// Update Packages Status
export function* updatepackagesStatusSaga(action) {
  try {
    yield put(updatePackagesStatusRequest());
    const { id, status } = action.payload;
    const newStatus = status === "active" ? "inactive" : "active";
    const payload = {
      status: newStatus,
    };

    const response = yield call(
      axiosInstance.patch,
      `${API_URL.ADMIN_PACKAGES}/${id}`,
      payload
    );
    if (response.status === 200) {
      yield put(updatePackagesStatusSuccess());
      yield put({ type: GET_ALL_PACKAGES });
    }
  } catch (error) {
    yield put(updatePackagesStatusFailure(error.message));
  }
}

// delete packages
export function* deletePackageSaga(action) {
  try {
    yield put(deletePackageRequest());

    const { userId } = action.payload;
    const response = yield call(
      axiosInstance.delete,
      `${API_URL.ADMIN_PACKAGES}/${userId}`
    );
    if (response.status === 200) {
      yield put(deletePackageSuccess({ userId }));
      yield put({ type: GET_ALL_PACKAGES });
    }
  } catch (error) {
    yield put(
      deletePackageFailure(error.response?.data?.message || error.message)
    );
  }
}
