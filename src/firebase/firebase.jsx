import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "flying-notes-e1854.firebaseapp.com",
  projectId: "flying-notes-e1854",
  storageBucket: "flying-notes-e1854.appspot.com",
  messagingSenderId: "390360503834",
  appId: "1:390360503834:web:fcd984760b585638fa23a3"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)