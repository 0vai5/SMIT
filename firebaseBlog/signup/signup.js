import { auth } from "../firebase.js";

const isLoggedIn = () => {
  const uid = localStorage.getItem("uid");

  if (uid) {
    window.location.replace("../index.html");
  }
};



window.isLoggedIn = isLoggedIn;
