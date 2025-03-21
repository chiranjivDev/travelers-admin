import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;
let socketInstance = null;
let heartbeatInterval = null;

const getTokenFromLocalStorage = () => {
  let token = null;
  try {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      token = user?.access_token || null;
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }
  return token;
};

const socketConnection = () => {
  if (!socketInstance) {
    const token = getTokenFromLocalStorage();

    if (!token) {
      console.error('No token available. Cannot establish socket connection.');
      return null;
    }

    socketInstance = io(SOCKET_URL, {
      extraHeaders: {
        authorization: `bearer ${token}`,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketInstance.on('connect', () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }

      heartbeatInterval = setInterval(() => {
        if (socketInstance && socketInstance.connected) {
          socketInstance.emit('heartbeat', { status: 'alive' });
        }
      }, 25000);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socketInstance.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason);

      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }

      if (reason === 'io server disconnect') {
        socketInstance.connect();
      }
    });
  }

  return socketInstance;
};

export const getSocket = () => {
  if (!socketInstance) {
    socketConnection();
  }
  return socketInstance;
};

export default socketConnection;
