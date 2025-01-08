import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    refresh_token: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Login Actions
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Signup Actions
    signupRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout Action
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refresh_token = null;
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
