import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  db,
} from "../firebase.js";
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const isLoggedIn = () => {
  const uid = localStorage.getItem("uid");

  if (uid) {
    window.location.replace("../index.html");
  }
};

const signupHandler = async () => {
  if (!fullName.value || !email.value || !password.value) {
    let errorText = "Email and Password Fields are required";
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
    return;
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const uid = response.user.uid;

    const createDoc = await setDoc(doc(db, "user", uid), {
      email: email.value,
      fullName: fullName.value,
    });

    console.log(createDoc);

    window.location.replace("../login/login.html");
  } catch (error) {
    let errorText = error.code;
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
  }
};

window.isLoggedIn = isLoggedIn;
window.signupHandler = signupHandler;
