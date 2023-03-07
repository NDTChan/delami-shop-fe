// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX2CqO5BKmkGgL-oXg5aoN4uvKAncj6-4",
  authDomain: "delami-storage.firebaseapp.com",
  projectId: "delami-storage",
  storageBucket: "delami-storage.appspot.com",
  messagingSenderId: "368848312554",
  appId: "1:368848312554:web:c78bed7dbac90e15721f93",
  measurementId: "G-8JH6TZQNNP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);