import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJMoNahxpCI4CIhvjW2HTBU9jzL1UNsBw",
  authDomain: "majestic-camp-388006.firebaseapp.com",
  projectId: "majestic-camp-388006",
  storageBucket: "majestic-camp-388006.appspot.com",
  messagingSenderId: "306241532731",
  appId: "1:306241532731:web:59d06de59b3f3727ca7d1e",
  measurementId: "G-R6SL6RR0QY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app