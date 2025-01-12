const title = document.querySelector("#title");
const content = document.querySelector("#content");
const isPrivate = document.querySelector("#isPrivate");
import { addDoc, collection, db } from "../firebase.js";
const errorContainer = document.querySelector("#errorContainer");

const isLoggedIn = () => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    window.location.href = "../login/login.html";
  }
};

const createBlog = async () => {
  if (title.value === "" || content.value === "") {
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML = "Title and Content are required";
    return;
  }

  try {
    const response = await addDoc(collection(db, "blogs"), {
      title: title.value,
      content: content.value,
      isPrivate: isPrivate.checked,
      userId: localStorage.getItem("uid"),
    });

    console.log("Created", response);

    title.value = "";
    content.value = "";
    isPrivate.checked = false;

  } catch (error) {
    let errorText = error.code;
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
  }
};

window.isLoggedIn = isLoggedIn;
window.createBlog = createBlog;
