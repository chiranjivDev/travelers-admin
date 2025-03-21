import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { call, put } from 'redux-saga/effects';
import {
  createIssueFailure,
  createIssueStart,
  createIssueSuccess,
  deleteIssueFailure,
  deleteIssueStart,
  deleteIssueSuccess,
  fetchIssuesFailure,
  fetchIssuesStart,
  fetchIssuesSuccess,
  fetchUserIssuesFailure,
  fetchUserIssuesStart,
  fetchUserIssuesSuccess,
  updateIssueFailure,
  updateIssueStart,
  updateIssueSuccess,
} from './issueSlice';
import { toast } from 'react-toastify';

export function* fetchAllIssues() {
  try {
    yield put(fetchIssuesStart());
    const response = yield call(axiosInstance.get, API_URL.ISSUES);

    yield put(fetchIssuesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchIssuesFailure(error.response?.data?.message || error.message),
    );
    toast.error(error.response?.data?.message || error.message);
  }
}

export function* fetchIssuesByUser(action) {
  try {
    console.log(action.payload);
    yield put(fetchUserIssuesStart());
    const response = yield call(
      axiosInstance.get,
      `${API_URL.USER_ISSUES}/${action.payload}`,
    );
    console.log(response);

    yield put(fetchUserIssuesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchUserIssuesFailure(error.response?.data?.message || error.message),
    );
    toast.error(error.response?.data?.message || error.message);
  }
}

export function* createIssue(action) {
  try {
    console.log(action.payload);
    yield put(createIssueStart());
    const response = yield call(
      axiosInstance.post,
      API_URL.ISSUES,
      action.payload,
    );
    yield put(createIssueSuccess());
    toast.success(
      'Thank you for submitting this issue, our team will look into it!',
    );
  } catch (error) {
    yield put(
      createIssueFailure(error.response?.data?.message || error.message),
    );
    toast.error(error.response?.data?.message || error.message);
  }
}

export function* updateIssue(action) {
  try {
    console.log(action.payload);
    yield put(updateIssueStart());
    const response = yield call(
      axiosInstance.patch,
      `${API_URL.ISSUES}/${action.payload.id}`,
      action.payload.body,
    );
    yield put(updateIssueSuccess());
    yield call(fetchAllIssues);
    toast.success('Issue updated');
  } catch (error) {
    yield put(
      updateIssueFailure(error.response?.data?.message || error.message),
    );
    toast.error(error.response?.data?.message || error.message);
  }
}

export function* deleteIssue(action) {
  try {
    yield put(deleteIssueStart());
    const response = yield call(
      axiosInstance.delete,
      `${API_URL.ISSUES}/${action.payload.issue_id}`,
    );
    yield put(deleteIssueSuccess());
    yield call(fetchIssuesByUser, {
      payload: action.payload.user_id,
    });
  } catch (error) {
    yield put(
      deleteIssueFailure(error.response?.data?.message || error.message),
    );
    toast.error(error.response?.data?.message || error.message);
  }
}
