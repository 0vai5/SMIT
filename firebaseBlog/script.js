import {
  auth,
  db,
  signOut,
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "./firebase.js";
const errorContainer = document.querySelector("#errorContainer");
const blogsContainer = document.querySelector("#blogsContainer");
const editTitle = document.querySelector("#editTitle");
const editContent = document.querySelector("#editContent");
const editPrivate = document.querySelector("#editPrivate");

let blogIdToBeEdited = null;

const isLoggedIn = () => {
  const uid = localStorage.getItem("uid");
  if (!uid) window.location.href = "./login/login.html";

  renderBlogs();
};

const logoutHandler = async () => {
  try {
    const response = await signOut(auth);
    console.log(response);
    localStorage.removeItem("uid");

    window.location.replace("./login/login.html");
  } catch (error) {
    let errorText = error.code;
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
  }
};

const deleteBlog = async (blogId) => {
  try {
    const response = await deleteDoc(doc(db, "blogs", blogId));
    renderBlogs();
  } catch (error) {
    console.log(error);
    let errorText = error.code;
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
  }
};

const editBlog = async (blogId, content, title, isPrivate) => {

  
  blogIdToBeEdited = blogId;
  editTitle.value = title;
  editContent.value = content;
  editPrivate.checked = isPrivate;
  console.log(blogId, editContent.value, editTitle.value, editPrivate.checked);
}

const saveBlogChanges = async () => {
  try {
    const response = await updateDoc(doc(db, "blogs", blogIdToBeEdited), {
      title: editTitle.value,
      content: editContent.value,
      isPrivate: editPrivate.checked,
    })

    renderBlogs();


  } catch (error) {
    console.log(error);
    let errorText = error.code;
    errorContainer.classList.remove("d-none");
    errorContainer.innerHTML += errorText;
  }
}

const renderBlogs = async () => {
  const uid = localStorage.getItem("uid");
  try {
    const response = await getDocs(collection(db, "blogs"));
    blogsContainer.innerHTML = "";
    response.forEach((blog) => {
      console.log(blog.id, " => ", blog.data());
      if (blog.data().isPrivate) {
        if(blog.data().userId === uid) {
        blogsContainer.innerHTML += `
        <div class="col-sm-6 mt-3 mb-3 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${blog.data().title}</h5>
                  <p class="card-text">${blog.data().content}</p>
                  <button class="btn btn-danger" onclick="deleteBlog('${blog.id}')">delete</button>
                  <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editBlog('${blog.id}', '${blog.data().content}', '${blog.data().title}', '${blog.data().isPrivate}')">Edit</button>
                </div>
              </div>
            </div>
        `;
        }
      } else {
        blogsContainer.innerHTML += `
        <div class="col-sm-6 mt-3 mb-3 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${blog.data().title}</h5>
                  <p class="card-text">${blog.data().content}</p>
                  ${blog.data().userId === uid  ? `<button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editBlog('${blog.id}', '${blog.data().content}', '${blog.data().title}', '${blog.data().isPrivate}')">Edit</button> <button class="btn btn-danger" onclick="deleteBlog('${blog.id}')">Delete</button>`:''}
                </div>
              </div>
            </div>
        `;
      }
    });
  } catch (error) {
    // window.location.reload();
    console.log(error);
  }
};

window.isLoggedIn = isLoggedIn;
window.logoutHandler = logoutHandler;
window.deleteBlog = deleteBlog;
window.editBlog = editBlog
window.saveBlogChanges = saveBlogChanges