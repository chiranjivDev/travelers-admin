import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chatList: [],
    chatMessages: [],
    loadingChatList: false,
    loadingChatMessages: false,
    sendingMessage: false,
    error: null,
    sendMessageSuccess: false,
    file_url: null,
  },
  reducers: {
    fetchChatListRequest(state) {
      state.loadingChatList = true;
      state.error = null;
    },
    fetchChatListSuccess(state, action) {
      state.loadingChatList = false;
      state.chatList = action.payload;
    },
    fetchChatListFailure(state, action) {
      state.loadingChatList = false;
      state.error = action.payload;
    },

    fetchChatMessagesRequest(state) {
      state.loadingChatMessages = true;
      state.error = null;
    },
    fetchChatMessagesSuccess(state, action) {
      state.loadingChatMessages = false;
      state.chatMessages = action.payload;
    },
    newMessageHandler(state, action) {
      state.chatMessages = [...state.chatMessages, action.payload];
    },
    updateOfferStatus(state, action) {
      const { id: messageId, offerStatus } = action.payload;
      const messageIndex = state.chatMessages.findIndex(
        (message) => message.id === messageId,
      );

      if (messageIndex !== -1) {
        state.chatMessages[messageIndex].offerStatus = offerStatus;
      }
    },

    fetchChatMessagesFailure(state, action) {
      state.loadingChatMessages = false;
      state.error = action.payload;
    },

    setFileUrl(state, action) {
      state.file_url = action.payload;
    },

    clearFileUrl(state) {
      state.file_url = null;
    },

    sendMessageRequest(state) {
      state.sendingMessage = true;
      state.sendMessageSuccess = false;
      state.error = null;
    },
    sendMessageSuccess(state, action) {
      const { chatId, message } = action.payload;
      state.sendingMessage = false;
      state.sendMessageSuccess = true;
      state.chatMessages[chatId] = [
        ...(state.chatMessages[chatId] || []),
        message,
      ];
    },
    sendMessageFailure(state, action) {
      state.sendingMessage = false;
      state.error = action.payload;
    },

    clearChatState(state) {
      state.sendMessageSuccess = false;
      state.error = null;
      state.chatList = [];
      state.chatMessages = [];
    },
  },
});

export const {
  fetchChatListRequest,
  fetchChatListSuccess,
  fetchChatListFailure,

  fetchChatMessagesRequest,
  fetchChatMessagesSuccess,
  fetchChatMessagesFailure,

  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,

  clearChatState,

  newMessageHandler,
  updateOfferStatus,
  setFileUrl,
  clearFileUrl,
} = chatsSlice.actions;

export default chatsSlice.reducer;
