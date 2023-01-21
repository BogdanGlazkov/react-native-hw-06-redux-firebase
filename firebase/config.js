import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlbsqRPFqLJ1LIiDj5OYndff72RwUPQmA",
  authDomain: "photoposts-c767b.firebaseapp.com",
  projectId: "photoposts-c767b",
  storageBucket: "photoposts-c767b.appspot.com",
  messagingSenderId: "1057517251913",
  appId: "1:1057517251913:web:b5d5b5bb2befd554cc3e98",
  measurementId: "G-5X7QD43CMT",
};

export const appFirebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(appFirebase);
export const storage = getStorage(appFirebase);
export const db = getFirestore(appFirebase);
