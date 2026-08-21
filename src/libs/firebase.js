// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABIRC5EvP_7Vp8zAKlXRvK1kbapTTlbe8",
  authDomain: "travell-bdf82.firebaseapp.com",
  projectId: "travell-bdf82",
  storageBucket: "travell-bdf82.firebasestorage.app",
  messagingSenderId: "55190264500",
  appId: "1:55190264500:web:a379fcfb416ef3e5d715e1",
  measurementId: "G-GSNYQ381FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);