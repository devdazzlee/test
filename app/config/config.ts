import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVAvNCkDSzo9Mi6QeqoF9xRZ-hfSMPGWY",
  authDomain: "test-cbccc.firebaseapp.com",
  projectId: "test-cbccc",
  storageBucket: "test-cbccc.firebasestorage.app",
  messagingSenderId: "739522744963",
  appId: "1:739522744963:web:cc80dbe14757bdfd8941b6",
  measurementId: "G-2YQ75PHMVB"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };