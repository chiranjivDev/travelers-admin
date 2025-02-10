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
} from './packagesSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';
import { toast } from 'react-toastify';

// import { MOCK_PACKAGES } from '@/data/mockPackages';
// import { packageCategories } from '@/app/send-package/packageCategories';

// Fetch Packages Saga
export function* fetchPackagesSaga() {
  console.log('inside packages saga');
  try {
    yield put(fetchPackagesRequest());

    const response = yield call(axiosInstance.get, API_URL.ACTIVE_PACKAGES);
    console.log('fetch packages saga response', response);
    yield put(fetchPackagesSuccess(response.data));

    // send mock packages for now
    // yield put(fetchPackagesSuccess(MOCK_PACKAGES));
  } catch (error) {
    yield put(
      fetchPackagesFailure(error.response?.data?.message || error.message)
    );
  }
}

// Saga for sending a package (previous form)
// export function* sendPackageSaga(action: {
//   type: string;
//   payload: { userId: string; data: any };
// }) {
//   console.log('inside send package saga', action);
//   try {
//     yield put(sendPackageRequest());

//     const { data } = action.payload;
//     console.log('inside send package saga payload data ===> ', data);

//     // Construct a test payload as per our API
//     const payload = {
//       name: data?.packageName || '',
//       categoryId: data.category,
//       subcategoryId: data.subcategory,
//       price: Number(data?.price) || 50,
//       description: data?.description || 'place holder description',
//       requiresCarefulHandling:
//         data.pickupMethod.packageHandling.requiresCarefulHandling || false,
//       isFragile: data.pickupMethod.packageHandling.isFragile || false,
//       specialInstructions:
//         data.pickupMethod.packageHandling.specialInstructions || '',
//       packagePhotos: [
//         'https://example.com/photo1.jpg',
//         'https://example.com/photo2.jpg',
//       ],
//       availabilityDates: '2025-01-07T11:03:47.523Z',
//       pickupLocation: data.pickupMethod.defaultLocation.city || '',
//       deliveryLocation: data.deliveryMethod.defaultLocation.city || '',
//       deliveryDate:
//         data.pickupMethod.timing.deliveryDate.preferredDate || '2025-01-02',
//       // dimensions: data.selectedSize || '',
//       dimensions: 10,
//       weight: 10,
//       insurance: true,
//       priority: true,
//       tracking: 'tracking',
//       communicationPreferences: 'whatsApp',
//       preferredTimes: 'Weekdays after 5 PM',
//       preferredDate: '2025-01-02',
//       allowPostalDelivery: true,
//       postalDeliveryDetails: 'Postal code 12345',
//       restricted: false,

//       // size: data.selectedSize || ''
//     };

//     console.log('Constructed payload for create package API ===>', payload);

//     const response = yield call(
//       axiosInstance.post,
//       `${API_URL.PACKAGES}`,
//       payload
//     );

//     yield put(sendPackageSuccess(response.data));
//     toast.success('Package Created successfully!');
//   } catch (error) {
//     yield put(
//       sendPackageFailure(error.response?.data?.message || error.message)
//     );
//     toast.error('Package Creation Failed', error);
//   }
// }

// Fetch Categories Saga
export function* fetchCategoriesSaga() {
  console.log('inside fetch categories saga');
  try {
    yield put(fetchCategoriesRequest());

    // Uncomment and use the actual API call to fetch categories
    const response = yield call(axiosInstance.get, API_URL.PACKAGE_CATEGORIES);
    yield put(fetchCategoriesSuccess(response.data));

    // send mock categories for now
    // yield put(fetchCategoriesSuccess(packageCategories));
  } catch (error) {
    yield put(
      fetchCategoriesFailure(error.response?.data?.message || error.message)
    );
  }
}

// Fetch Sender-Specific Packages Saga
export function* fetchSenderPackagesSaga(action) {
  console.log('inside fetchSenderPackagesSaga');
  try {
    yield put(fetchSenderPackagesRequest());

    const { senderId } = action.payload;
    const response = yield call(
      axiosInstance.get,
      `${API_URL.SENDER_PACKAGES}/${senderId}`
    );

    console.log('fetch sender packages saga response', response);
    yield put(fetchSenderPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchSenderPackagesFailure(error.response?.data?.message || error.message)
    );
  }
}

// send package saga for new form
export function* sendPackageSaga(action) {
  console.log('inside send package saga', action);
  try {
    yield put(sendPackageRequest());
    console.log('inside send package saga payload data ===> ', action.payload);
    const response = yield call(
      axiosInstance.post,
      `${API_URL.PACKAGES}`,
      action.payload
    );
    yield put(sendPackageSuccess(response.data));
    toast.success('Package Created successfully!');
  } catch (error) {
    yield put(
      sendPackageFailure(error.response?.data?.message || error.message)
    );
    toast.error('Package Creation Failed', error);
  }
}

// Search Sender Packages Saga
export function* searchSenderPackageSaga(action) {
  const { searchKeyword, startDate, endDate } = action.payload;
  console.log(
    'Searching for sender packages with keyword/dates:',
    searchKeyword,
    startDate,
    endDate
  );
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
      }
    );
    console.log('Search sender packages saga response', response);
    yield put(fetchPackagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchPackagesFailure(error.response?.data?.message || error.message)
    );
  }
}

// Mock package categories
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
