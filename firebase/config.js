import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBUmMW3eA3xiH0IJ4G6rY7dXyz4yc_VLc",
  authDomain: "photoposts-78ec3.firebaseapp.com",
  projectId: "photoposts-78ec3",
  storageBucket: "photoposts-78ec3.appspot.com",
  messagingSenderId: "696332994323",
  appId: "1:696332994323:android:19e1dcccba84db0bb63ce6",
};

export const appFirebase = initializeApp(firebaseConfig);
// const db = getFirestore(app);
