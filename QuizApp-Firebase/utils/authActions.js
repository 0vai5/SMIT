import {
  createUserWithEmailAndPassword,
  auth,
  db,
  setDoc,
  getDoc,
  doc,
  signInWithEmailAndPassword,
  signOut
} from "../firebase.js";

export const signUpAction = async (data) => {
  const { email, password, name, number } = data;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userObj = {
      email,
      name,
      number,
      uid: response.user.uid,
      isActive: true,
      role: "user",
      isBlocked: false,
      isDeleted: false,
    };

    const userInDb = await setDoc(doc(db, "user", response.user.uid), userObj);

    console.log(userInDb, "userInDB");

    window.location.replace("../../index.html");
  } catch (error) {
    console.log(error.message);
    alert(error.code)
  }
};

export const loginAction = async (data) => {
  try {
    const { email, password } = data;

    const response = await signInWithEmailAndPassword(auth, email, password);

    const { uid } = response.user;

    const user = await getDoc(doc(db, 'user', uid));

    localStorage.setItem("user", JSON.stringify(user.data()));

    if (user.data().role === "admin")
      window.location.replace("./admin/dashboard/dashboard.html");
    if (user.data().role === "user")
      window.location.replace("./user/dashboard/dashboard.html");
  } catch (error) {
    console.log(error.message);
    alert(error.code);
  }
};

export const logoutAction = async () => {
  try {
    const response = await signOut(auth);
    console.log(response, "response");
    localStorage.removeItem("user");
    window.location.replace("../../index.html");
  } catch (error) {
    console.log(error.message);
    alert(error.code);
  };
};


export const getUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
}