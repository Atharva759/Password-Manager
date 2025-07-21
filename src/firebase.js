// Import the functions you need from the SDKs you need
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from "firebase/auth";
import {v4 as uuidv4} from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebase_api_key,
  authDomain: "passwordmanager-9f1e1.firebaseapp.com",
  projectId: "passwordmanager-9f1e1",
  storageBucket: "passwordmanager-9f1e1.firebasestorage.app",
  messagingSenderId: "203101042737",
  appId: "1:203101042737:web:40cd18c9bc83d9d0527d10",
  measurementId: "G-VQ4GXLEJVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();
export const provider = new GoogleAuthProvider();

