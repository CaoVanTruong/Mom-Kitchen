// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdFetq22_GBcFuwuPpmHVlcAb0TA5k2_g",
  authDomain: "mom-kitchen-e100b.firebaseapp.com",
  projectId: "mom-kitchen-e100b",
  storageBucket: "mom-kitchen-e100b.appspot.com",
  messagingSenderId: "852387950617",
  appId: "1:852387950617:web:803d426d2c6c846bd5fa88",
  measurementId: "G-YDDNYWEKPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)