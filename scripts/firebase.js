// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBuZry_uHn_Ue4bdGHv2kIfOaT4J6yNZs",
  authDomain: "br-auth-72ae8.firebaseapp.com",
  projectId: "br-auth-72ae8",
  storageBucket: "br-auth-72ae8.appspot.com",
  messagingSenderId: "223423503693",
  appId: "1:223423503693:web:eb73c08e192e3abd8bab04",
  measurementId: "G-3DS1R22F15"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log("Firebase app initialized:", app?.name);
const auth = getAuth(app);

export { app, auth }