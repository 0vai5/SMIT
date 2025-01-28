import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAK653Bqkv1X3Ygy5Z5Ca_mu2n9HbOuUlI",
  authDomain: "quizapp-f97b5.firebaseapp.com",
  projectId: "quizapp-f97b5",
  storageBucket: "quizapp-f97b5.firebasestorage.app",
  messagingSenderId: "953635509692",
  appId: "1:953635509692:web:d33f9c27c30ab18e3c47b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  auth,
  db,
  doc,
  addDoc,
  collection,
  createUserWithEmailAndPassword,
  setDoc,
  signInWithEmailAndPassword,
  getDoc,
  signOut,
  updateDoc,
  getDocs
};
