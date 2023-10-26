// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "insight-ink-403106.firebaseapp.com",
  projectId: "insight-ink-403106",
  storageBucket: "insight-ink-403106.appspot.com",
  messagingSenderId: "690191737305",
  appId: "1:690191737305:web:3e8ed1ce3775d1614d79c8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
