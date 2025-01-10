import { auth, signInWithEmailAndPassword } from "../firebase.js";
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector("#errorContainer");

const isLoggedIn = () => {
  const uid = localStorage.getItem("uid");

  if (uid) {
    window.location.replace("../index.html");
  }
};

const loginHandler = async () => {
  if (!emailInput.value || !passwordInput.value) {
    let errorText = "Email and Password Fields are required";
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
    return;
  }

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    localStorage.setItem("uid", response.user.uid);

    window.location.href = "../index.html";

    emailInput.value = "";
    passwordInput.value = "";
  } catch (error) {
    let errorText = error.code;
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
  }
};

window.loginHandler = loginHandler;
window.isLoggedIn = isLoggedIn;
