import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    createOrderLoading: false,
    createOrderSuccess: false,
    createOrderError: null,

    // Orders
    orders: [],
    fetchOrdersLoading: false,
    fetchOrdersSuccess: false,
    fetchOrdersError: null,
  },
  reducers: {
    // Create Order Actions
    createOrderRequest(state) {
      state.createOrderLoading = true;
      state.createOrderSuccess = false;
      state.createOrderError = null;
    },
    createOrderSuccess(state, action) {
      state.createOrderLoading = false;
      state.createOrderSuccess = true;
      state.order = action.payload;
    },
    createOrderFailure(state, action) {
      state.createOrderLoading = false;
      state.createOrderSuccess = false;
      state.createOrderError = action.payload;
    },

    // Fetch All Orders Actions
    fetchOrdersRequest(state) {
      state.fetchOrdersLoading = true;
      state.fetchOrdersSuccess = false;
      state.fetchOrdersError = null;
    },
    fetchOrdersSuccess(state, action) {
      state.fetchOrdersLoading = false;
      state.fetchOrdersSuccess = true;
      state.orders = action.payload;
    },
    fetchOrdersFailure(state, action) {
      state.fetchOrdersLoading = false;
      state.fetchOrdersSuccess = false;
      state.fetchOrdersError = action.payload;
    },

    // Clear state
    clearOrdersState(state) {
      state.createOrderSuccess = false;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  clearOrdersState,
} = orderSlice.actions;

export default orderSlice.reducer;
