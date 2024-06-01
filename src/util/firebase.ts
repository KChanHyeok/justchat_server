// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics,  } from "firebase/analytics";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnXMcNvaIKYYMjB0DyF7x2NGTYOW7-kjw",
  authDomain: "just-chat-d0102.firebaseapp.com",
  projectId: "just-chat-d0102",
  storageBucket: "just-chat-d0102.appspot.com",
  messagingSenderId: "1005715078356",
  appId: "1:1005715078356:web:021e36c6b78ba14f560f41",
  measurementId: "G-W2QDYREB8Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);