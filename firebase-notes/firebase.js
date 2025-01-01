// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqY6L1znjfKOpXOk1E9aiyXsvQ6rBrQvQ",
    authDomain: "smit-practice-82ded.firebaseapp.com",
    projectId: "smit-practice-82ded",
    storageBucket: "smit-practice-82ded.firebasestorage.app",
    messagingSenderId: "7248368638",
    appId: "1:7248368638:web:b1b2f392e9263bc3b1e6af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db,
    collection, addDoc, updateDoc, deleteDoc, getDocs, doc
}