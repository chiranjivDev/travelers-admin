import { createSlice } from '@reduxjs/toolkit';

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    categories: [],
    loading: false,
    error: null,

    // Fetch sender-specific packages
    senderPackages: [],
    fetchSenderPackagesLoading: false,
    fetchSenderPackagesError: null,

    // send package
    sendPackageLoading: false,
    sendPackageSuccess: false,
    sendPackageError: null,
    sendPackageResponse: null,

    // Fetch category actions
    fetchCategoriesLoading: false,
    fetchCategoriesSuccess: false,
    fetchCategoriesError: null,
  },
  reducers: {
    // Fetch Packages Actions
    fetchPackagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPackagesSuccess(state, action) {
      console.log('packages from slice', action);
      state.loading = false;
      state.packages = action.payload;
    },
    fetchPackagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Actions for sending a package
    sendPackageRequest(state) {
      state.sendPackageLoading = true;
      state.sendPackageSuccess = false;
      state.sendPackageError = null;
      state.sendPackageResponse = null;
    },
    sendPackageSuccess(state, action) {
      console.log('package response', action);
      state.sendPackageLoading = false;
      state.sendPackageSuccess = true;
      state.sendPackageResponse = action.payload;
    },
    sendPackageFailure(state, action) {
      state.sendPackageLoading = false;
      state.sendPackageSuccess = false;
      state.sendPackageError = action.payload;
    },

    // Fetch Categories Actions
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

    // Fetch Sender-specific Packages Actions
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

    // Clear state
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
} = packagesSlice.actions;

export default packagesSlice.reducer;
