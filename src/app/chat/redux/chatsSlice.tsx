import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chatList: [],
    chatMessages: [], // Storing messages by chat ID
    loadingChatList: false,
    loadingChatMessages: false,
    sendingMessage: false,
    error: null,
    sendMessageSuccess: false,
    file_url: null,
  },
  reducers: {
    // Fetch Chat List Actions
    fetchChatListRequest(state) {
      state.loadingChatList = true;
      state.error = null;
    },
    fetchChatListSuccess(state, action) {
      console.log('inside chat list', action);
      state.loadingChatList = false;
      state.chatList = action.payload;
    },
    fetchChatListFailure(state, action) {
      state.loadingChatList = false;
      state.error = action.payload;
    },

    // Fetch Chat Messages Actions
    fetchChatMessagesRequest(state) {
      state.loadingChatMessages = true;
      state.error = null;
    },
    fetchChatMessagesSuccess(state, action) {
      state.loadingChatMessages = false;
      state.chatMessages = action.payload;
    },
    newMessageHandler(state, action) {
      console.log('inside new message handler', action);
      state.chatMessages = [...state.chatMessages, action.payload];
    },
    updateOfferStatus(state, action) {
      console.log('inside update offer status of the message', action);
      const { id: messageId, offerStatus } = action.payload;
      console.log(
        'inside update offer status of the message',
        messageId,
        offerStatus
      );

      // Find the message with the given messageId and update its offerStatus
      const messageIndex = state.chatMessages.findIndex(
        (message) => message.id === messageId
      );

      if (messageIndex !== -1) {
        state.chatMessages[messageIndex].offerStatus = offerStatus;
      }
    },

    fetchChatMessagesFailure(state, action) {
      state.loadingChatMessages = false;
      state.error = action.payload;
    },

    // Upload file
    setFileUrl(state, action) {
      console.log('upload file url slice', action.payload);
      state.file_url = action.payload;
    },

    clearFileUrl(state) {
      state.file_url = null;
    },

    // Send Message Actions
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

    // Clear Chat State
    clearChatState(state) {
      state.sendMessageSuccess = false;
      state.error = null;
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
