import { createSlice } from '@reduxjs/toolkit';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    loading: false,
    error: null,

    addTripLoading: false,
    addTripSuccess: false,
    addTripError: null,

    singlePackage: null,
    singlePackageLoading: false,
    singlePackageError: null,

    traveler: null,
    travelerLoading: false,
    travelerError: null,

    travelerPackages: [],
    fetchTravelerPackagesLoading: false,
    fetchTravelerPackagesError: null,
  },
  reducers: {
    fetchTripsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTripsSuccess(state, action) {
      state.trips = action.payload;
      state.loading = false;
    },
    fetchTripsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    fetchTravelerPackagesRequest(state) {
      state.fetchTravelerPackagesLoading = true;
      state.fetchTravelerPackagesError = null;
    },
    fetchTravelerPackagesSuccess(state, action) {
      state.fetchTravelerPackagesLoading = false;
      state.travelerPackages = action.payload;
    },
    fetchTravelerPackagesFailure(state, action) {
      state.fetchTravelerPackagesLoading = false;
      state.fetchTravelerPackagesError = action.payload;
    },

    addTripRequest(state) {
      state.addTripLoading = true;
      state.addTripSuccess = false;
      state.addTripError = null;
    },
    addTripSuccess(state) {
      state.addTripLoading = false;
      state.addTripSuccess = true;
    },
    addTripFailure(state, action) {
      state.addTripLoading = false;
      state.addTripSuccess = false;
      state.addTripError = action.payload;
    },

    fetchSinglePackageRequest(state) {
      state.singlePackageLoading = true;
      state.singlePackageError = null;
    },
    fetchSinglePackageSuccess(state, action) {
      state.singlePackageLoading = false;
      state.singlePackage = action.payload;
    },
    fetchSinglePackageFailure(state, action) {
      state.singlePackageLoading = false;
      state.singlePackageError = action.payload;
    },

    fetchTravelerDetailsRequest(state) {
      state.travelerLoading = true;
      state.travelerError = null;
    },
    fetchTravelerDetailsSuccess(state, action) {
      state.travelerLoading = false;
      state.traveler = action.payload;
    },
    fetchTravelerDetailsFailure(state, action) {
      state.travelerLoading = false;
      state.travelerError = action.payload;
    },

    clearTripsState(state) {
      state.addTripSuccess = false;
    },
  },
});

export const {
  fetchTripsRequest,
  fetchTripsSuccess,
  fetchTripsFailure,

  addTripRequest,
  addTripSuccess,
  addTripFailure,

  fetchSinglePackageRequest,
  fetchSinglePackageSuccess,
  fetchSinglePackageFailure,

  fetchTravelerDetailsRequest,
  fetchTravelerDetailsSuccess,
  fetchTravelerDetailsFailure,

  fetchTravelerPackagesRequest,
  fetchTravelerPackagesSuccess,
  fetchTravelerPackagesFailure,

  clearTripsState,
} = tripsSlice.actions;

export default tripsSlice.reducer;
