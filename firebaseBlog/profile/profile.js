const fullNameElem = document.querySelector("#fullNameElem");
const emailElem = document.querySelector("#emailElem");
const blogsContainer = document.querySelector("#blogsContainer");
const editTitle = document.querySelector("#editTitle");
const editContent = document.querySelector("#editContent");
const editPrivate = document.querySelector("#editPrivate");
import {db, getDoc, doc, getDocs, collection, query, where, updateDoc, deleteDoc} from "../firebase.js";
const errorContainer = document.querySelector("#errorContainer");

let blogIdToBeEdited = null;

const isLoggedIn = async () => {
    const uid = localStorage.getItem('uid');
    if (!uid) window.location.href = '../login/login.html';

   try {
    const userDoc = await getDoc(doc(db, 'user', uid));
    const user = userDoc.data();

    fullNameElem.innerHTML = user.fullName;
    emailElem.innerHTML = user.email;

    renderBlogs();
   } catch (error) {
    console.log(error);
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
    const uid = localStorage.getItem('uid');

    try {

        const q = query(collection(db, 'blogs'),
        where('userId', '==', uid)
    );

        const response = await getDocs(q);

        response.forEach(blog => {
            blogsContainer.innerHTML ="";
            blogsContainer.innerHTML += `
                <div class="col-sm-6 mt-3 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${blog.data().title}</h5>
                <p class="card-text">${blog.data().content}</p>
                <button class="btn btn-danger" onclick="deleteBlog('${blog.id}')">Delete</button>
                <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editBlog('${blog.id}', '${blog.data().content}', '${blog.data().title}', ${blog.data().isPrivate})">Edit</button

              </div>
            </div>
          </div>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}

window.isLoggedIn = isLoggedIn;
window.deleteBlog = deleteBlog;
window.editBlog = editBlog;
window.saveBlogChanges = saveBlogChanges;