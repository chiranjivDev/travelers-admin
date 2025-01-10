import {
  PACKAGE_CATEGORIES,
  PACKAGES,
  SEND_PACKAGE,
} from '@/app/sender/dashboard/redux/packagesAction';
import {
  fetchCategoriesSaga,
  fetchPackagesSaga,
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
import { LOGIN, REGISTER } from '@/app/signup/redux/authActions';
import { loginSaga, signupSaga } from '@/app/signup/redux/authSaga';
import { CREATE_TRIP, TRIPS } from '@/app/traveler/redux/tripsAction';
import { addTripSaga, fetchTripsSaga } from '@/app/traveler/redux/tripsSaga';
import { all, takeLatest } from 'redux-saga/effects';
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

export default function* rootSaga() {
  yield all([
    yield takeLatest(REGISTER, signupSaga),
    yield takeLatest(LOGIN, loginSaga),

    // packages
    yield takeLatest(PACKAGES, fetchPackagesSaga), // fetch all packages
    yield takeLatest(SEND_PACKAGE, sendPackageSaga), // send a package i,e the send package flow
    yield takeLatest(PACKAGE_CATEGORIES, fetchCategoriesSaga), // package categories

    // traveler packages
    yield takeLatest(TRIPS, fetchTripsSaga),
    yield takeLatest(CREATE_TRIP, addTripSaga),

    // admin
    yield takeLatest(GET_ALL_USERS, fetchUsersSaga),
    yield takeLatest(UPDATE_USER_STATUS, updateUserStatusSaga),
    yield takeLatest(DELETE_USER, deleteUserSaga),
    yield takeLatest(ADMIN_LOGIN, adminloginSaga),
    yield takeLatest(GET_ALL_PACKAGES, PackagesSaga),
    yield takeLatest(UPDATE_PACKAGE_STATUS, updatepackagesStatusSaga),
    yield takeLatest(DELETE_PACKAGE, deletePackageSaga),
  ]);
}
