// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqSVNZwke8bpcG6Z4LLJuKsRV0JC3XeD0",
  authDomain: "tickert-bari.firebaseapp.com",
  projectId: "tickert-bari",
  storageBucket: "tickert-bari.appspot.com",
  messagingSenderId: "527436867678",
  appId: "1:527436867678:web:d36c7c2c7c2109610e2ccf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);