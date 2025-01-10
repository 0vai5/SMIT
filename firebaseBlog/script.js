import { auth, db } from "./firebase.js";

const isLoggedIn = () => {
    const uid = localStorage.getItem("uid");
    if(!uid) window.location.href = "./login/login.html";
  
    // TODO: Get all the Blog Documents
  
  
  }

window.isLoggedIn = isLoggedIn;

