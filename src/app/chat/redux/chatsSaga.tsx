import { take, call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import socketConnection from '@/lib/socket';
import {
  fetchChatListSuccess,
  fetchChatMessagesFailure,
  fetchChatMessagesRequest,
  fetchChatMessagesSuccess,
  newMessageHandler,
  setFileUrl,
  updateOfferStatus,
} from './chatsSlice';
import { axiosInstance } from '@/services/httpServices';
import { API_URL } from '@/services/webConstants';

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const roomsHandler = (event) => {
      console.log('Received rooms:', event);
      emit({ type: 'ROOMS_LIST', payload: event });
    };

    const privateMessageHandler = (messageEvent) => {
      console.log('Private message received:', messageEvent);
      emit({ type: 'PRIVATE_MESSAGE', payload: messageEvent });
    };

    const errorHandler = (errorEvent) => {
      console.error('Socket error:', errorEvent);
      emit({ type: 'ERROR', payload: new Error(errorEvent.reason) });
    };

    const offerStatusUpdatedHandler = (updatedOffer) => {
      console.log('Offer status updated:', updatedOffer);
      emit({ type: 'OFFER_STATUS_UPDATED', payload: updatedOffer });
    };

    // Listeners for specific events
    socket.on('my_rooms', roomsHandler);
    socket.on('private_message', privateMessageHandler);
    socket.on('offerStatusUpdated', offerStatusUpdatedHandler);
    socket.on('error', errorHandler);

    // Cleanup function
    const unsubscribe = () => {
      socket.off('my_rooms', roomsHandler);
      socket.off('private_message', privateMessageHandler);
      socket.off('offerStatusUpdated', offerStatusUpdatedHandler);
      socket.off('error', errorHandler);
    };

    return unsubscribe;
  });
}

export function* watchOnPings() {
  try {
    console.log('Inside watchOnPings saga');

    const socket = yield call(socketConnection);
    if (!socket) {
      console.error('Socket connection failed');
      return;
    }

    console.log('Socket connection established:', socket);

    // Create a socket channel
    const socketChannel = yield call(createSocketChannel, socket);
    socket.emit('get_my_rooms');

    console.log('Listening for socket events...');

    while (true) {
      try {
        const { type, payload } = yield take(socketChannel);
        console.log(`Event received: ${type}`, payload);

        switch (type) {
          case 'ROOMS_LIST':
            console.log('payload from watchOnPings', payload);
            yield put(fetchChatListSuccess(payload));
            break;
          case 'PRIVATE_MESSAGE':
            yield put(newMessageHandler(payload));
            break;
          case 'OFFER_STATUS_UPDATED':
            yield put(updateOfferStatus(payload));
            break;
          case 'ERROR':
            console.error('Socket error:', payload);
            break;
          default:
            console.warn('Unknown event type:', type);
        }
      } catch (err) {
        console.error('Error in socketChannel:', err);
        socketChannel.close();
        break;
      }
    }
  } catch (error) {
    console.error('Error in watchOnPings saga:', error);
  }
}

// messages saga
// Fetch Sender-Specific Packages Saga
export function* fetchChatMessagesSaga(action) {
  console.log('inside fetchChatMessagesSaga');
  try {
    yield put(fetchChatMessagesRequest());

    const { roomId } = action.payload;
    console.log('room id from saga', roomId);
    const response = yield call(
      axiosInstance.get,
      `${API_URL.CHAT_MESSAGES}/${roomId}`
    );

    console.log('fetch sender packages saga response', response);
    yield put(fetchChatMessagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchChatMessagesFailure(error.response?.data?.message || error.message)
    );
  }
}

// Saga for uploading a file and fetching its URL
export function* uploadFileSaga(action) {
  console.log('Inside uploadFileSaga');
  try {
    // const response = yield call(axiosInstance.get, `${API_URL.FILE_UPLOAD}`);
    // console.log('uploadFileSaga response', response);
    // yield put(setFileUrl(response.data)); // Updated action name

    const formData = new FormData();
    formData.append('file', action.payload);

    const response = yield call(
      axiosInstance.post,
      API_URL.FILE_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('uploadFileSaga response', response);
    // Construct full URL dynamically
    const fullFileUrl = `http://localhost:3001${response.data.fileUrl}`;
    yield put(setFileUrl(response.data.fileUrl));
  } catch (error) {
    console.error('Error in uploadFileSaga:', error);
  }
}

// Saga for changing offer status
export function* changeOfferStatusSaga(action) {
  console.log('Inside changeOfferStatusSaga', action);
  try {
    const response = yield call(
      axiosInstance.post,
      API_URL.CHANGE_OFFER_STATUS,
      action.payload
    );
    console.log('changeOfferStatusSaga response', response);
  } catch (error) {
    console.error('Error in changeOfferStatusSaga:', error);
  }
}
