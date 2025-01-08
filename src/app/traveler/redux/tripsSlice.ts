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
  },
});

export const {
  fetchTripsRequest,
  fetchTripsSuccess,
  fetchTripsFailure,

  addTripRequest,
  addTripSuccess,
  addTripFailure,
} = tripsSlice.actions;

export default tripsSlice.reducer;
