const email = document.querySelector("#email");
const password = document.querySelector("#password");
import { isLoggedIn } from "../../utils/utils.js";
import { loginAction } from "../../utils/authActions.js"

window.addEventListener('load', isLoggedIn('login'));


const login = (btn) => {

  btn.disabled = true;
  btn.innerHTML = "logging in...";

  if (!email.value || !password.value) {
    alert("Please enter email and password");
    btn.disabled = false;
    btn.innerHTML = "Login";
    return;
  }

  const userCredential = {
    email: email.value,
    password: password.value
  }

  loginAction(userCredential);
};

window.login = login;
