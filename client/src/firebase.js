// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d3dd6.firebaseapp.com",
  projectId: "mern-estate-d3dd6",
  storageBucket: "mern-estate-d3dd6.appspot.com",
  messagingSenderId: "569825273869",
  appId: "1:569825273869:web:ac6e5ea1d8c00d393a8d44",
  measurementId: "G-HJ623FF7VT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);