// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0OKWMTFqpJteqPn4C7IeoexLUNIp3bz8",
  authDomain: "mobile-app---talksy.firebaseapp.com",
  projectId: "mobile-app---talksy",
  storageBucket: "mobile-app---talksy.firebasestorage.app",
  messagingSenderId: "577436644762",
  appId: "1:577436644762:web:67f38321d4f8b24429b623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore
