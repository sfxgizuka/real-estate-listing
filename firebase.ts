// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPijkS48LaAqlZ333VFf9ihK6hZTxzNfI",
  authDomain: "real-estate-listing-2947f.firebaseapp.com",
  projectId: "real-estate-listing-2947f",
  storageBucket: "real-estate-listing-2947f.appspot.com",
  messagingSenderId: "356243611269",
  appId: "1:356243611269:web:ed8069da529b9a39bd53ec",
  measurementId: "G-N56FYBBRPQ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }