// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXdMetlA6a_mYHJylQK6gKVPIxoHvnvYk",
  authDomain: "popx-40665.firebaseapp.com",
  projectId: "popx-40665",
  storageBucket: "popx-40665.appspot.com",
  messagingSenderId: "1057490493895",
  appId: "1:1057490493895:web:3d0087be9c9d81dd4279e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };