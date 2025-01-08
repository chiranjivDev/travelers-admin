import { createSlice } from '@reduxjs/toolkit';

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    categories: [],
    loading: false,
    error: null,

    // send package
    sendPackageLoading: false,
    sendPackageSuccess: false,
    sendPackageError: null,

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
    },
    sendPackageSuccess(state) {
      state.sendPackageLoading = false;
      state.sendPackageSuccess = true;
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
} = packagesSlice.actions;

export default packagesSlice.reducer;
