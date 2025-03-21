import axios from 'axios';
import store from '../store/store';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {},
});
console.log('base url', process.env.BASE_URL);

// Add request interceptor to include auth token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Retrieve the user object from localStorage
//     const userFromLocalStorage = localStorage.getItem('user');

//     if (userFromLocalStorage) {
//       try {
//         // Parse the user object
//         const user = JSON.parse(userFromLocalStorage);

//         // Extract the access_token
//         const token = user?.access_token;

//         // If token exists, set it in the Authorization header
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//       } catch (error) {
//         console.error('Error parsing user object from localStorage:', error);
//       }
//     }

//     // Uncomment this part if you want to use the token from Redux instead of localStorage
//     // const tokenFromRedux = store.getState().auth.token;
//     // console.log('Token from Redux:', tokenFromRedux);

//     // If you later want to use Redux, you can replace this with the Redux token check
//     // else if (tokenFromRedux) {
//     //   config.headers['Authorization'] = `Bearer ${tokenFromRedux}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// for admin (will refactor later)
axiosInstance.interceptors.request.use(
  (config) => {
    const { admin } = store.getState();

    const token = admin?.user?.access_token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
