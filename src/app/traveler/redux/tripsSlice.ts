import { createSlice } from '@reduxjs/toolkit';

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    trips: [],
    loading: false,
    error: null,

    // Add trip
    addTripLoading: false,
    addTripSuccess: false,
    addTripError: null,

    // Fetch single package
    singlePackage: null,
    singlePackageLoading: false,
    singlePackageError: null,

    // Fetch traveler details
    traveler: null,
    travelerLoading: false,
    travelerError: null,
  },
  reducers: {
    // Fetch Trips Actions
    fetchTripsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTripsSuccess(state, action) {
      console.log('trips from slice', action);
      state.loading = false;
      state.trips = action.payload;
    },
    fetchTripsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Actions for adding a trip
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

    // Fetch single package actions
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

    // Fetch Traveler Details Actions
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

    // Clear state
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

  clearTripsState,
} = tripsSlice.actions;

export default tripsSlice.reducer;
