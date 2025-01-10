import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    status: null,
    statusId: null,
  },
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // New reducers for updating user status
    updateUserStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserStatusSuccess: (state, action) => {
      state.loading = false;
      const { id, status } = action.payload;
      state.status = status;
      state.statusId = id;
    },
    updateUserStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE USERS FROM LIST
    deleteUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.filter(
        (user) => user.id !== action.payload.userId
      );
    },

    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserStatusRequest,
  updateUserStatusSuccess,
  updateUserStatusFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
