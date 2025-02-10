import { put, call } from "redux-saga/effects";
import {
  fetchTravelerRequest,
  fetchTravelerSuccess,
  fetchTravelerFailure,
  updateTravelerStatusRequest,
  updateTravelerStatusSuccess,
  updateTravelerStatusFailure,
  deleteTravelerRequest,
  deleteTravelerSuccess,
  deleteTravelerFailure,
} from "./travelerSlice";
import { axiosInstance } from "@/services/httpServices";
import { API_URL } from "@/services/webConstants";
import { GET_ALL_TRAVELLERS } from "./travelerAction";

// Fetch Traveler Saga
export function* fetchTravelerSaga(action) {
  try {
    const { role } = action.payload;
    yield put(fetchTravelerRequest());
    const roleData = {
      role: role || "",
    };
    const response = yield call(axiosInstance.get, API_URL.USERS, {
      params: roleData,
    });

    yield put(fetchTravelerSuccess(response.data));
  } catch (error) {
    yield put(
      fetchTravelerFailure(error.response?.data?.message || error.message)
    );
  }
}

// Update Traveler Status Saga
export function* updateTravelerStatusSaga(action) {
  try {
    yield put(updateTravelerStatusRequest());
    const { id, status } = action.payload;
    const newStatus = status === "active" ? "inactive" : "active";
    const TravelerStatus = {
      status: newStatus,
    };

    const response = yield call(
      axiosInstance.patch,
      `${API_URL.USERS}/${id}`,
      TravelerStatus
    );
    if (response.status === 200) {
      yield put(updateTravelerStatusSuccess());
      const payload = {
        role: "traveler",
      };
      yield put({ type: GET_ALL_TRAVELLERS, payload });
    }
  } catch (error) {
    yield put(
      updateTravelerStatusFailure(
        error.response?.data?.message || error.message
      )
    );
  }
}

// DELETE TRAVELERS SAGA
export function* deleteTravelerSaga(action) {
  try {
    yield put(deleteTravelerRequest());
    const { userId } = action.payload;
    yield call(axiosInstance.delete, `${API_URL.USERS}/${userId}`);
    yield put(deleteTravelerSuccess({ userId }));
  } catch (error) {
    yield put(
      deleteTravelerFailure(error.response?.data?.message || error.message)
    );
  }
}
