// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Corrected to "getFirestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2xjkDnQKOMIrds74PnQACBomgppHs7XA",
  authDomain: "ai-trip-planner-9bd16.firebaseapp.com",
  projectId: "ai-trip-planner-9bd16",
  storageBucket: "ai-trip-planner-9bd16.firebasestorage.app",
  messagingSenderId: "50468061081",
  appId: "1:50468061081:web:8c1c18bf26088f5d649d08",
  measurementId: "G-R7D0L5XJ29",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Corrected to "getFirestore"
// const analytics = getAnalytics(app);
