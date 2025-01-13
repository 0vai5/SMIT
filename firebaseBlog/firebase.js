import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  where,
  query
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDqY6L1znjfKOpXOk1E9aiyXsvQ6rBrQvQ",
  authDomain: "smit-practice-82ded.firebaseapp.com",
  projectId: "smit-practice-82ded",
  storageBucket: "smit-practice-82ded.firebasestorage.app",
  messagingSenderId: "7248368638",
  appId: "1:7248368638:web:b1b2f392e9263bc3b1e6af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  signOut,
  getDocs, collection,deleteDoc,
  getDoc, updateDoc, addDoc, where, query
};
