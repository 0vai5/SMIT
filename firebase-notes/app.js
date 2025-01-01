import {
    app,
    db,
    collection, addDoc, updateDoc, deleteDoc, getDocs, doc
} from "./firebase.js"
const listParent = document.querySelector("#notesList")
const notesInput = document.querySelector("#noteTitle");


const renderUI = async () => {

    try {
        const notes = await getDocs(collection(db, "notes"));
        console.log(notes)
        if (notes.empty) {
            listParent.innerHTML = `<li class="list-group-item mt-2">No notes found</li>`
            return
        }

        listParent.innerHTML = ""
        notes.forEach(note => {
            listParent.innerHTML += `
             <li class="list-group-item mt-2">
                  <h5>${note.data().note}</h5>
                  <button class="btn btn-secondary" onclick="editNote('${note.id}', this)" >Edit</button>
                  <button class="btn btn-danger" onclick="deleteNote('${note.id}')" >Delete</button>
                </li>
        `
        })
    } catch (error) {
        console.error(error.code);
    }



}

const deleteNote = async (noteID) => {

    try {
        const note = await deleteDoc(doc(db, "notes", noteID));
        renderUI()
    } catch (error) {
        console.error(error);
    }


}
const editNote = async (noteID, elem) => {
    const newNote = prompt("Enter new note", elem.parentElement.querySelector("h5").innerText);
    if (!newNote) {
        alert("Please enter a note title")
        return
    }

    try {
        const note = await updateDoc(doc(db, "notes", noteID), {
            note: newNote
        })
        renderUI()
    } catch (error) {
        console.error(error);
    }
}
const createNote = async (event) => {
    event.preventDefault()
    if (!notesInput.value) {
        alert("Please enter a note title")
        return
    }

    try {
        const doc = await addDoc(collection(db, "notes"), {
            note: notesInput.value
        })

        renderUI()
    } catch (error) {
        console.error(error.code);
    }

    notesInput.value = ""
}



window.renderUI = renderUI
window.deleteNote = deleteNote
window.editNote = editNote
window.createNote = createNote