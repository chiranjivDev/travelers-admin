// import { io } from 'socket.io-client';

// const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

// let socketInstance = null; // Store the socket instance globally

// // Function to get token safely from localStorage
// const getTokenFromLocalStorage = () => {
//   let token = null;
//   try {
//     const userFromLocalStorage = localStorage.getItem('user');
//     if (userFromLocalStorage) {
//       const user = JSON.parse(userFromLocalStorage);
//       token = user?.access_token || null;
//       console.log('Token from socket:', token);
//     }
//   } catch (error) {
//     console.error('Error parsing user from localStorage:', error);
//   }
//   return token;
// };

// // Function to establish and store the socket connection
// const socketConnection = () => {
//   if (!socketInstance) {
//     const token = getTokenFromLocalStorage();

//     if (!token) {
//       console.error('No token available. Cannot establish socket connection.');
//       return null;
//     }

//     socketInstance = io(SOCKET_URL, {
//       extraHeaders: {
//         authorization: `bearer ${token}`,
//       },
//     });

//     socketInstance.on('connect', () => {
//       console.log('Socket connected successfully!');
//     });

//     socketInstance.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//     });
//   }

//   return socketInstance;
// };

// // Function to get the existing socket instance
// export const getSocket = () => socketInstance;

// export default socketConnection;

// New Socket Connection
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;
let socketInstance = null; // Store the socket instance globally
let heartbeatInterval = null; // Store interval reference globally

// Function to get token safely from localStorage
const getTokenFromLocalStorage = () => {
  let token = null;
  try {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      token = user?.access_token || null;
      console.log('Token from socket:', token);
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }
  return token;
};

// Function to establish and store the socket connection
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
      console.log('Socket connected successfully!');

      // Clear previous interval to avoid multiple pings
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }

      // Send a heartbeat ping every 25 seconds
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

      // Clear heartbeat interval when disconnected
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }

      if (reason === 'io server disconnect') {
        socketInstance.connect(); // Manually reconnect if needed
      }
    });
  }

  return socketInstance;
};

// Function to get the existing socket instance
export const getSocket = () => socketInstance;

export default socketConnection;
