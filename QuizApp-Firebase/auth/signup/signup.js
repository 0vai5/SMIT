const email = document.querySelector("#email");
const password = document.querySelector("#password");
const name = document.querySelector("#name");
const number = document.querySelector("#number");
import { isLoggedIn } from "../../utils/utils.js";
import { signUpAction } from "../../utils/authActions.js"

window.addEventListener('load', isLoggedIn('signup'));


const signup = (btn) => {

    btn.disabled = true;
    btn.innerHTML = "signing up...";

    if (!email.value || !password.value || !name.value || !number.value) {
        alert("Please enter email, password, name and number");
        btn.disabled = false;
        btn.innerHTML = "Login";
        return;
    }

    const userCredential = {
        email: email.value,
        password: password.value,
        name: name.value,
        number: number.value,
    }

    signUpAction(userCredential);
};

window.signup = signup;
