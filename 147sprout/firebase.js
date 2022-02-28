// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2vRtP4RZiXgyTmLFS8FSe5Pp_OdXmwCY",
  authDomain: "cs147sprout.firebaseapp.com",
  projectId: "cs147sprout",
  storageBucket: "cs147sprout.appspot.com",
  messagingSenderId: "688409002313",
  appId: "1:688409002313:web:5d19789f03be9f130f5a98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
