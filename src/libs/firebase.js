import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration (reads from .env with fallback)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyABIRC5EvP_7Vp8zAKlXRvK1kbapTTlbe8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "travell-bdf82.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "travell-bdf82",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "travell-bdf82.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "55190264500",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:55190264500:web:a379fcfb416ef3e5d715e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;