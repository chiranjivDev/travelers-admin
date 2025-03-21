import {
  FETCH_PACKAGE_BY_ID,
  PACKAGE_CATEGORIES,
  PACKAGES,
  SEARCH_SENDER_PACKAGE,
  SEND_PACKAGE,
  SENDER_PACKAGES,
} from '@/app/sender/dashboard/redux/packagesAction';
import {
  fetchCategoriesSaga,
  fetchPackageByIdSaga,
  fetchPackagesSaga,
  fetchSenderPackagesSaga,
  searchSenderPackageSaga,
  sendPackageSaga,
} from '@/app/sender/dashboard/redux/packagesSaga';
import { ADMIN_LOGIN } from '@/app/admin/login/redux/adminLoginAction';
import { adminloginSaga } from '@/app/admin/login/redux/adminLoginSaga';
import {
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_USER_STATUS,
} from '@/app/admin/users/redux/userAction';
import {
  deleteUserSaga,
  fetchUsersSaga,
  updateUserStatusSaga,
} from '@/app/admin/users/redux/userSaga';
import {
  LOGIN,
  REGISTER,
  USER_LOGGED_IN,
} from '@/app/signup/redux/authActions';
import { loginSaga, signupSaga } from '@/app/signup/redux/authSaga';
import {
  CREATE_TRIP,
  SEARCH_TRAVELER_PACKAGE,
  TRAVELER_DETAIL,
  TRAVELER_PACKAGES,
  TRIP_DETAIL,
  TRIPS,
} from '@/app/traveler/redux/tripsAction';
import {
  addTripSaga,
  fetchSingleTripSaga,
  fetchTravelerDetailsSaga,
  fetchTravelerPackagesSaga,
  fetchTripsSaga,
  searchTravelerPackageSaga,
} from '@/app/traveler/redux/tripsSaga';
import { all, fork, takeLatest } from 'redux-saga/effects';
import {
  DELETE_PACKAGE,
  GET_ALL_PACKAGES,
  UPDATE_PACKAGE_STATUS,
} from '@/app/admin/packages/redux/packagesAction';
import {
  deletePackageSaga,
  PackagesSaga,
  updatepackagesStatusSaga,
} from '@/app/admin/packages/redux/packagesSaga';
import {
  CREATE_ORDER,
  FETCH_ORDERS,
} from '@/app/sender/dashboard/redux/orderAction';
import {
  createOrderSaga,
  fetchOrdersSaga,
} from '@/app/sender/dashboard/redux/orderSaga';
import {
  DELETE_TRAVELLERS,
  GET_ALL_TRAVELLERS,
  UPDATE_TRAVELLERS_STATUS,
} from '@/app/admin/travelers/redux/travelerAction';
import {
  deleteTravelerSaga,
  fetchTravelerSaga,
  updateTravelerStatusSaga,
} from '@/app/admin/travelers/redux/travelerSaga';
import {
  changeOfferStatusSaga,
  fetchChatMessagesSaga,
  uploadFileSaga,
  watchOnPings,
} from '@/app/chat/redux/chatsSaga';
import {
  CHANGE_OFFER_STATUS,
  FETCH_CHAT_MESSAGES,
  UPLOAD_FILE,
} from '@/app/chat/redux/chatsAction';
import {
  CREATE_REVIEW,
  DELETE_REVIEW,
  TRAVELER_REVIEWS,
  UPDATE_REVIEW,
} from '@/app/traveler/[id]/reviews/redux/reviewsAction';
import {
  createReview,
  deleteReview,
  fetchReviewsByTraveler,
  updateReview,
} from '@/app/traveler/[id]/reviews/redux/reviewsSaga';
import {
  CREATE_ISSUE,
  DELETE_ISSUE,
  ISSUES,
  UPDATE_ISSUE,
  USER_ISSUES,
} from '@/app/issue/redux/issueAction';
import {
  createIssue,
  deleteIssue,
  fetchAllIssues,
  fetchIssuesByUser,
  updateIssue,
} from '@/app/issue/redux/issueSaga';

function* startWatchOnPingsSaga() {
  yield fork(watchOnPings);
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(REGISTER, signupSaga),
    yield takeLatest(LOGIN, loginSaga),

    yield takeLatest(PACKAGES, fetchPackagesSaga),
    yield takeLatest(SEND_PACKAGE, sendPackageSaga),
    yield takeLatest(PACKAGE_CATEGORIES, fetchCategoriesSaga),
    yield takeLatest(SENDER_PACKAGES, fetchSenderPackagesSaga),
    yield takeLatest(FETCH_PACKAGE_BY_ID, fetchPackageByIdSaga),
    yield takeLatest(TRIPS, fetchTripsSaga),
    yield takeLatest(CREATE_TRIP, addTripSaga),
    yield takeLatest(TRIP_DETAIL, fetchSingleTripSaga),
    yield takeLatest(TRAVELER_DETAIL, fetchTravelerDetailsSaga),
    yield takeLatest(TRAVELER_PACKAGES, fetchTravelerPackagesSaga),

    yield takeLatest(TRAVELER_REVIEWS, fetchReviewsByTraveler),
    yield takeLatest(CREATE_REVIEW, createReview),
    yield takeLatest(UPDATE_REVIEW, updateReview),
    yield takeLatest(DELETE_REVIEW, deleteReview),

    yield takeLatest(GET_ALL_USERS, fetchUsersSaga),
    yield takeLatest(UPDATE_USER_STATUS, updateUserStatusSaga),
    yield takeLatest(DELETE_USER, deleteUserSaga),
    yield takeLatest(ADMIN_LOGIN, adminloginSaga),
    yield takeLatest(GET_ALL_PACKAGES, PackagesSaga),
    yield takeLatest(UPDATE_PACKAGE_STATUS, updatepackagesStatusSaga),
    yield takeLatest(DELETE_PACKAGE, deletePackageSaga),
    yield takeLatest(GET_ALL_TRAVELLERS, fetchTravelerSaga),
    yield takeLatest(UPDATE_TRAVELLERS_STATUS, updateTravelerStatusSaga),
    yield takeLatest(DELETE_TRAVELLERS, deleteTravelerSaga),

    yield takeLatest(CREATE_ORDER, createOrderSaga),
    yield takeLatest(FETCH_ORDERS, fetchOrdersSaga),

    yield takeLatest(SEARCH_TRAVELER_PACKAGE, searchTravelerPackageSaga),
    yield takeLatest(SEARCH_SENDER_PACKAGE, searchSenderPackageSaga),
    yield takeLatest(USER_LOGGED_IN, startWatchOnPingsSaga),

    yield takeLatest(FETCH_CHAT_MESSAGES, fetchChatMessagesSaga),
    yield takeLatest(UPLOAD_FILE, uploadFileSaga),
    yield takeLatest(CHANGE_OFFER_STATUS, changeOfferStatusSaga),

    yield takeLatest(USER_ISSUES, fetchIssuesByUser),
    yield takeLatest(ISSUES, fetchAllIssues),
    yield takeLatest(CREATE_ISSUE, createIssue),
    yield takeLatest(DELETE_ISSUE, deleteIssue),
    yield takeLatest(UPDATE_ISSUE, updateIssue),
  ]);
}
