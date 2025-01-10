import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
    loading: false,
    error: null,
    status: null,
    packageId: null,
    deletePackageId: false,
  },
  reducers: {
    // Fetch Packages Actions
    fetchPackagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPackagesSuccess(state, action) {
      state.loading = false;
      state.packages = action.payload;
    },
    fetchPackagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Packages Status
    updatePackagesStatusRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updatePackagesStatusSuccess(state, action) {
      state.loading = false;
      const { id, status } = action.payload;

      if (id && status) {
        state.status = status;
        state.packageId = id;
      }
    },
    updatePackagesStatusFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // delete packages
    deletePackageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deletePackageSuccess(state, action) {
      state.loading = false;
      state.deletePackageId = action.payload.userId;
      state.packages = state.packages.filter(
        (pkg) => pkg.id !== action.payload.userId
      );
    },
    deletePackageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPackagesRequest,
  fetchPackagesSuccess,
  fetchPackagesFailure,
  updatePackagesStatusRequest,
  updatePackagesStatusSuccess,
  updatePackagesStatusFailure,
  deletePackageRequest,
  deletePackageSuccess,
  deletePackageFailure,
} = packageSlice.actions;

export default packageSlice.reducer;
