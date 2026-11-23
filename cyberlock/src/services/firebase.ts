// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA99Tps0ybOuSuc57xBRJpNQU1w1jsZlqE",
  authDomain: "cyberlock-d945b.firebaseapp.com",
  projectId: "cyberlock-d945b",
  storageBucket: "cyberlock-d945b.firebasestorage.app",
  messagingSenderId: "1001757135922",
  appId: "1:1001757135922:web:6b6ea88ea427d5103e582b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
