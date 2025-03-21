import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  issues: [],
  loading: false,
  error: null,

  userIssues: [],
  userIssueLoading: false,
  userIssuesError: null,
  userIssuesSuccess: false,

  createIssueLoading: false,
  createIssueError: null,
  createIssueSuccess: false,

  updateIssueLoading: false,
  updateIssueError: null,
  updateIssueSuccess: false,

  deleteIssueLoading: false,
  deleteIssueError: null,
  deleteIssueSuccess: false,
};

const issueSlice = createSlice({
  name: 'issues',
  initialState: INITIAL_STATE,
  reducers: {
    fetchIssuesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIssuesSuccess: (state, action) => {
      state.issues = action.payload;
      state.loading = false;
    },
    fetchIssuesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    fetchUserIssuesStart: (state) => {
      state.userIssueLoading = true;
      state.userIssuesError = null;
    },
    fetchUserIssuesSuccess: (state, action) => {
      state.userIssues = action.payload;
      state.userIssueLoading = false;
    },
    fetchUserIssuesFailure: (state, action) => {
      state.userIssuesError = action.payload;
      state.userIssueLoading = false;
    },

    createIssueStart: (state) => {
      state.createIssueLoading = true;
      state.createIssueError = null;
      state.createIssueSuccess = false;
    },
    createIssueSuccess: (state) => {
      state.createIssueLoading = false;
      state.createIssueSuccess = true;
    },
    createIssueFailure: (state, action) => {
      state.createIssueError = action.payload;
      state.createIssueLoading = false;
    },

    updateIssueStart: (state) => {
      state.updateIssueLoading = true;
      state.updateIssueError = null;
      state.updateIssueSuccess = false;
    },
    updateIssueSuccess: (state) => {
      state.updateIssueLoading = false;
      state.updateIssueSuccess = true;
    },
    updateIssueFailure: (state, action) => {
      state.updateIssueError = action.payload;
      state.updateIssueLoading = false;
    },

    deleteIssueStart: (state) => {
      state.deleteIssueLoading = true;
      state.deleteIssueError = null;
      state.deleteIssueSuccess = false;
    },
    deleteIssueSuccess: (state) => {
      state.deleteIssueLoading = false;
      state.deleteIssueSuccess = true;
    },
    deleteIssueFailure: (state, action) => {
      state.deleteIssueError = action.payload;
      state.deleteIssueLoading = false;
    },
    clearState: () => INITIAL_STATE,
    clearUpdateStatus: (state) => {
      state.updateIssueError = null;
      state.updateIssueLoading = false;
      state.updateIssueSuccess = false;
    },
  },
});

export const {
  createIssueFailure,
  createIssueStart,
  createIssueSuccess,
  fetchIssuesFailure,
  fetchIssuesStart,
  fetchIssuesSuccess,
  deleteIssueFailure,
  deleteIssueStart,
  deleteIssueSuccess,
  fetchUserIssuesFailure,
  fetchUserIssuesStart,
  fetchUserIssuesSuccess,
  updateIssueFailure,
  updateIssueStart,
  updateIssueSuccess,
  clearState,
  clearUpdateStatus,
} = issueSlice.actions;

export default issueSlice.reducer;
