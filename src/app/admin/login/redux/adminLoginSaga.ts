import { put, call } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./adminLoginSlice";
import { axiosInstance } from "@/services/httpServices";
import { API_URL } from "@/services/webConstants";

export function* adminloginSaga(action) {
  try {
    yield put(loginRequest());
    const { username, password } = action.payload;

    const response = yield call(axiosInstance.post, API_URL.AUTH, {
      email: username,
      password: password,
    });

    if (response.status === 200 && response.data) {
      yield put(loginSuccess(response.data));
      console.log("Success", response.data.access_token);
    } else {
      yield put(loginFailure("Invalid credentials"));
    }
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || error.message));
  }
}
