import { put, call } from 'redux-saga/effects';
import {
  fetchPackagesRequest,
  fetchPackagesSuccess,
  fetchPackagesFailure,
  sendPackageRequest,
  sendPackageSuccess,
  sendPackageFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchSenderPackagesRequest,
  fetchSenderPackagesSuccess,
  fetchSenderPackagesFailure,
  fetchPackageByIdSuccess,
  fetchPackageByIdFailure,
  fetchPackageByIdRequest,
} from './packagesSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { toast } from 'react-toastify';

export function* fetchPackagesSaga() {
  try {
    yield put(fetchPackagesRequest());

    const response = yield call(axiosInstance.get, API_URL.ACTIVE_PACKAGES);

    yield put(fetchPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPackagesFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* fetchCategoriesSaga() {
  try {
    yield put(fetchCategoriesRequest());

    const response = yield call(axiosInstance.get, API_URL.PACKAGE_CATEGORIES);
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchCategoriesFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* fetchSenderPackagesSaga(action) {
  try {
    yield put(fetchSenderPackagesRequest());

    const { senderId } = action.payload;
    const response = yield call(
      axiosInstance.get,
      `${API_URL.SENDER_PACKAGES}/${senderId}`,
    );

    yield put(fetchSenderPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchSenderPackagesFailure(
        error.response?.data?.message || error.message,
      ),
    );
  }
}
export function* sendPackageSaga(action) {
  try {
    yield put(sendPackageRequest());
    const response = yield call(
      axiosInstance.post,
      `${API_URL.PACKAGES}`,
      action.payload,
    );
    yield put(sendPackageSuccess(response.data));
    toast.success('Package Created successfully!');
  } catch (error) {
    yield put(
      sendPackageFailure(error.response?.data?.message || error.message),
    );
    toast.error('Package Creation Failed', error);
  }
}
export function* searchSenderPackageSaga(action) {
  const { searchKeyword, startDate, endDate } = action.payload;

  try {
    yield put(fetchPackagesRequest());

    const params = {
      ...(searchKeyword && { keyword: searchKeyword }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    const response = yield call(
      axiosInstance.get,
      `${API_URL.PACKAGES}/search`,
      {
        params,
      },
    );
    yield put(fetchPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPackagesFailure(error.response?.data?.message || error.message),
    );
  }
}

export function* fetchPackageByIdSaga(action) {
  yield put(fetchPackageByIdRequest());
  try {
    const response = yield call(
      axiosInstance.get,
      `${API_URL.PACKAGES}/${action.payload}`,
    );

    yield put(fetchPackageByIdSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPackageByIdFailure(error.response?.data?.message || error.message),
    );
  }
}
const packageCategories = [
  {
    categoryId: '9b3a0cd0-e791-4aca-8e8b-d7cb8bd9225d',
    name: 'Electronics',
    description: 'Category for electronic items',
    subcategories: [
      {
        subcategoryId: '546a67ac-5b59-47f6-b2c7-1da7623db82e',
        name: 'Gadgets',
      },
      {
        subcategoryId: '406a7e1b-e2a5-436e-8d99-6cd09d41db2e',
        name: 'Cameras',
      },
      {
        subcategoryId: 'f5ebd3a1-f6ee-4d13-a089-7731ccfd38db',
        name: 'Laptops',
      },
    ],
  },
  {
    categoryId: 'ea472b11-d303-436f-ab63-ec00cfd531c6',
    name: 'Books and Stationery',
    description: 'Category for Books and Stationery items',
    subcategories: [
      {
        subcategoryId: '0a4eca54-fb7f-4474-8382-09166666e807',
        name: 'Comedy Books',
      },
      {
        subcategoryId: '98d4e29d-eace-4716-806b-194aab760f14',
        name: 'Religious Books',
      },
      {
        subcategoryId: '5c1a59bf-3eae-41e7-959a-7e711380873d',
        name: 'Notebooks',
      },
    ],
  },
];

const MOCK_PACKAGES = [
  {
    packageID: '3e2db2f3-c64b-4620-9bc3-c64f6b89f986',
    description: 'This is a basic package that includes a set of features.',
    availabilityDates: '2025-01-07T08:42:19.847Z',
    deliveryLocation: '2',
    pickupLocation: '1',
    price: '49.99',
    requiresCarefulHandling: true,
    isFragile: false,
    specialInstructions: 'Handle with care.',
    packagePhotos: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
    communicationPreferences: 'Email and phone',
    preferredTimes: 'Weekdays after 5 PM',
    preferredDate: '2025-01-02',
    allowPostalDelivery: true,
    postalDeliveryDetails: 'Postal code 12345',
    deliveryDate: '2025-01-07T08:42:19.847Z',
    dimensions: 2,
    weight: 2,
    insurance: true,
    priority: true,
    tracking: 'tracking',
    status: 'inactive',
    restricted: false,
    moderationStatus: 'rejected',
    createdAt: '2025-01-07T08:43:37.293Z',
    updatedAt: '2025-01-07T08:43:37.293Z',
    category: {
      categoryId: '9b3a0cd0-e791-4aca-8e8b-d7cb8bd9225d',
      name: 'Electronics',
      description: 'Category for electronic items',
    },
    sender: {
      id: 'd29242bc-beb3-4af2-823d-ee8f8d843c84',
      email: 'mailto:hello@gmail.com',
      password: '$2b$10$32HFNlqtFshhr1t.Uf7sQ.o4ZQRYjS5x1sFtxoEv32ltTF5ZdwcKu',
      name: 'manish chandra',
      picture_url: null,
      permissions: 'sender',
      passwordReset: null,
      status: 'active',
      phone: '+1234567890',
      is_email_verified: false,
      created_at: '2025-01-02T09:19:31.535Z',
      updated_at: '2025-01-02T09:22:55.863Z',
    },
  },
];
