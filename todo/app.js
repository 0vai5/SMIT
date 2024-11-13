var noteInput = document.querySelector("#notesText");
var errorText = document.querySelector("#errorText");
var bodyContainer = document.querySelector("#bodyContainer");

var notesCollection = []

var existingCollection = localStorage.getItem("notesCollection")

if(existingCollection) {
  notesCollection = JSON.parse(existingCollection)
}

function addNote() {
  if (noteInput.value.length < 3) {
    errorText.innerHTML = "Enter a Valid Notes Value";
    noteInput.style.border = "1px solid red";
    return;
  }

  errorText.innerHTML = "";
  noteInput.style.border = "";

  notesCollection.unshift(noteInput.value);
  noteInput.value = "";
  localStorage.setItem("notesCollection", JSON.stringify(notesCollection))
  showNotes();
}

function showNotes() {
  bodyContainer.innerHTML = "";

  if (notesCollection.length <= 0) {
    bodyContainer.innerHTML =
      "No Notes Available, Be the First to Create a Note";
    return;
  }

  for (var i = 0; i < notesCollection.length; i++) {
    bodyContainer.innerHTML += `
      <div class="noteContainer">
        <h4>${notesCollection[i]}</h4>
        <div class="noteBtn">
          <button onclick="editNote(${i})"><i class="fa-regular fa-pen-to-square"></i> Edit Note</button>
          <button onclick="deleteNote(${i})"><i class="fa-solid fa-trash"></i> Delete Note</button>
        </div>
      </div>
    `;
  }
}

showNotes();

function editNote(index) {
  var editedValue = prompt(
    "Enter the Value to Update:",
    notesCollection[index]
  );
  if (!(editedValue && editedValue.length <= 3)) {
    errorText.innerHTML = "The Edit Value Must be Correct";
  }

  notesCollection[index] = editedValue;
  localStorage.setItem("notesCollection", JSON.stringify(notesCollection))
  showNotes();
}

function deleteNote(index) {
  notesCollection.splice(index, 1);
  localStorage.setItem("notesCollection", JSON.stringify(notesCollection))
  showNotes();
}