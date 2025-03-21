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
      emit({ type: 'ROOMS_LIST', payload: event });
    };

    const privateMessageHandler = (messageEvent) => {
      emit({ type: 'PRIVATE_MESSAGE', payload: messageEvent });
    };

    const errorHandler = (errorEvent) => {
      emit({ type: 'ERROR', payload: new Error(errorEvent.reason) });
    };

    const offerStatusUpdatedHandler = (updatedOffer) => {
      emit({ type: 'OFFER_STATUS_UPDATED', payload: updatedOffer });
    };

    socket.on('my_rooms', roomsHandler);
    socket.on('private_message', privateMessageHandler);
    socket.on('offerStatusUpdated', offerStatusUpdatedHandler);
    socket.on('error', errorHandler);

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
    const socket = yield call(socketConnection);
    if (!socket) {
      console.error('Socket connection failed');
      return;
    }

    const socketChannel = yield call(createSocketChannel, socket);
    socket.emit('get_my_rooms');

    while (true) {
      try {
        const { type, payload } = yield take(socketChannel);

        switch (type) {
          case 'ROOMS_LIST':
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

export function* fetchChatMessagesSaga(action) {
  try {
    yield put(fetchChatMessagesRequest());

    const { roomId, senderPackageId, travelerPackageId } = action.payload;
    const response = yield call(
      axiosInstance.get,
      `${API_URL.CHAT_MESSAGES}/${roomId}`,
      { params: { senderPackageId, travelerPackageId } },
    );

    yield put(fetchChatMessagesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchChatMessagesFailure(error.response?.data?.message || error.message),
    );
  }
}

export function* uploadFileSaga(action) {
  try {
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
      },
    );
    const fullFileUrl = `http://localhost:3001${response.data.fileUrl}`;
    yield put(setFileUrl(response.data.fileUrl));
  } catch (error) {
    console.error('Error in uploadFileSaga:', error);
  }
}

export function* changeOfferStatusSaga(action) {
  try {
    const response = yield call(
      axiosInstance.post,
      API_URL.CHANGE_OFFER_STATUS,
      action.payload,
    );
  } catch (error) {
    console.error('Error in changeOfferStatusSaga:', error);
  }
}
