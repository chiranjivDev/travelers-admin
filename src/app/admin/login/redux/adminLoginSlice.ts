import { createSlice } from "@reduxjs/toolkit";

const adminLoginSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    user: null,
    token: "",
    refreshToken: "",
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      const { access_token, refresh_token } = action.payload;
      state.token = access_token;
      state.refreshToken = refresh_token;
      if (access_token && refresh_token) {
        localStorage.setItem("authToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
      }
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } =
  adminLoginSlice.actions;

export default adminLoginSlice.reducer;
