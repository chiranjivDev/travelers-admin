// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrVV5YXPuYOS1D5ljvG5f2T-y5TYimdgE',
  authDomain: 'deliveryconnect-e1eb8.firebaseapp.com',
  projectId: 'deliveryconnect-e1eb8',
  storageBucket: 'deliveryconnect-e1eb8.firebasestorage.app',
  messagingSenderId: '90634024482',
  appId: '1:90634024482:web:66470aae7725ef908efc7b',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

auth.useDeviceLanguage();
export { auth };
