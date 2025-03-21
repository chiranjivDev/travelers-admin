import { createSlice } from '@reduxjs/toolkit';

const travelerSlice = createSlice({
  name: 'travelers',
  initialState: {
    travelers: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTravelerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTravelerSuccess: (state, action) => {
      state.loading = false;
      state.travelers = action.payload;
    },
    fetchTravelerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTravelerStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTravelerStatusSuccess: (state) => {
      state.loading = false;
    },
    updateTravelerStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTravelerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTravelerSuccess: (state, action) => {
      state.loading = false;
      const { userId } = action.payload;

      state.travelers = state.travelers.filter(
        (traveler) => traveler.id !== userId,
      );
    },
    deleteTravelerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTravelerRequest,
  fetchTravelerSuccess,
  fetchTravelerFailure,
  updateTravelerStatusRequest,
  updateTravelerStatusSuccess,
  updateTravelerStatusFailure,
  deleteTravelerRequest,
  deleteTravelerSuccess,
  deleteTravelerFailure,
} = travelerSlice.actions;

export default travelerSlice.reducer;
