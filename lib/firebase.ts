// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXfQuKNbxZRPsWXoij49noXIXTxTLUnOM",
  authDomain: "student-smart-planner.firebaseapp.com",
  projectId: "student-smart-planner",
  storageBucket: "student-smart-planner.firebasestorage.app",
  messagingSenderId: "384858733459",
  appId: "1:384858733459:web:3ddf16057d17d8ff448666"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

