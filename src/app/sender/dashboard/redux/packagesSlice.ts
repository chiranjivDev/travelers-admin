import { createSlice } from '@reduxjs/toolkit';

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    categories: [],
    loading: true,
    error: null,

    senderPackages: [],
    fetchSenderPackagesLoading: false,
    fetchSenderPackagesError: null,

    sendPackageLoading: false,
    sendPackageSuccess: false,
    sendPackageError: null,
    sendPackageResponse: null,

    fetchCategoriesLoading: false,
    fetchCategoriesSuccess: false,
    fetchCategoriesError: null,

    package: null,
  },
  reducers: {
    fetchPackagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPackagesSuccess(state, action) {
      state.packages = action.payload;
      state.loading = false;
    },
    fetchPackagesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    fetchPackageByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPackageByIdSuccess(state, action) {
      state.loading = false;
      state.package = action.payload;
    },
    fetchPackageByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    sendPackageRequest(state) {
      state.sendPackageLoading = true;
      state.sendPackageSuccess = false;
      state.sendPackageError = null;
      state.sendPackageResponse = null;
    },
    sendPackageSuccess(state, action) {
      state.sendPackageLoading = false;
      state.sendPackageSuccess = true;
      state.sendPackageResponse = action.payload;
    },
    sendPackageFailure(state, action) {
      state.sendPackageLoading = false;
      state.sendPackageSuccess = false;
      state.sendPackageError = action.payload;
    },

    fetchCategoriesRequest(state) {
      state.fetchCategoriesLoading = true;
      state.fetchCategoriesError = null;
    },
    fetchCategoriesSuccess(state, action) {
      state.fetchCategoriesLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action) {
      state.fetchCategoriesLoading = false;
      state.fetchCategoriesError = action.payload;
    },

    fetchSenderPackagesRequest(state) {
      state.fetchSenderPackagesLoading = true;
      state.fetchSenderPackagesError = null;
    },
    fetchSenderPackagesSuccess(state, action) {
      state.fetchSenderPackagesLoading = false;
      state.senderPackages = action.payload;
    },
    fetchSenderPackagesFailure(state, action) {
      state.fetchSenderPackagesLoading = false;
      state.fetchSenderPackagesError = action.payload;
    },

    clearPackagesState(state) {
      state.sendPackageSuccess = false;
    },
  },
});

export const {
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

  clearPackagesState,

  fetchPackageByIdRequest,
  fetchPackageByIdSuccess,
  fetchPackageByIdFailure,
} = packagesSlice.actions;

export default packagesSlice.reducer;
