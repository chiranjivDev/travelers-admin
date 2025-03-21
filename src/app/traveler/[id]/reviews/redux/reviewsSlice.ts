import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  reviews: [],
  loading: false,
  error: null,

  createReviewLoading: false,
  createReviewError: null,
  createReviewSuccess: false,

  updateReviewLoading: false,
  updateReviewError: null,
  updateReviewSuccess: false,

  deleteReviewLoading: false,
  deleteReviewError: null,
  deleteReviewSuccess: false,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: INITIAL_STATE,
  reducers: {
    fetchReviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    },
    fetchReviewsFailure: (state, action) => {
      state.error = action.payload;
      state.reviews = [];
      state.loading = false;
    },

    createReviewStart: (state) => {
      state.createReviewLoading = true;
      state.createReviewError = null;
      state.createReviewSuccess = false;
    },
    createReviewSuccess: (state) => {
      state.createReviewLoading = false;
      state.createReviewSuccess = true;
    },
    createReviewFailure: (state, action) => {
      state.createReviewError = action.payload;
      state.createReviewLoading = false;
      state.createReviewSuccess = false;
    },

    updateReviewStart: (state) => {
      state.updateReviewLoading = true;
      state.updateReviewError = null;
      state.updateReviewSuccess = false;
    },
    updateReviewSuccess: (state) => {
      state.updateReviewLoading = false;
      state.updateReviewSuccess = true;
    },
    updateReviewFailure: (state, action) => {
      state.updateReviewError = action.payload;
      state.updateReviewLoading = false;
      state.updateReviewSuccess = false;
    },

    deleteReviewStart: (state) => {
      state.deleteReviewLoading = true;
      state.deleteReviewError = null;
      state.deleteReviewSuccess = false;
    },
    deleteReviewSuccess: (state) => {
      state.deleteReviewSuccess = true;
      state.deleteReviewLoading = false;
    },
    deleteReviewFailure: (state, action) => {
      state.deleteReviewError = action.payload;
      state.deleteReviewLoading = false;
      state.deleteReviewSuccess = false;
    },
    clearState: (state) => INITIAL_STATE,
  },
});

export const {
  fetchReviewsFailure,
  fetchReviewsStart,
  fetchReviewsSuccess,
  createReviewFailure,
  createReviewStart,
  createReviewSuccess,
  updateReviewFailure,
  updateReviewStart,
  updateReviewSuccess,
  deleteReviewFailure,
  deleteReviewStart,
  deleteReviewSuccess,
  clearState,
} = reviewSlice.actions;

export default reviewSlice.reducer;
