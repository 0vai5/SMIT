import {
  createUserWithEmailAndPassword,
  auth,
  db,
  setDoc,
  doc,
  signInWithEmailAndPassword,
} from "../firebase.js";

export const signUpAction = async (data) => {
  const { email, password, fullName, phoneNo } = data;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userObj = {
      email,
      fullName,
      phoneNo,
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
  }
};

export const loginAction = async (data) => {
  try {
    const { email, password } = data;

    const response = await signInWithEmailAndPassword(auth, email, password);

    const user = response.user;

    localStorage.setItem("user", JSON.stringify({ ...user }));

    if (user.role === "admin")
      window.location.replace("./AdminDashboard/dashboard/dashboard.html");
    if (user.role === "user")
      window.location.replace("./UserDashboard/dashboard/dashboard.html");
  } catch (error) {
    console.log(error.message);
  }
};


