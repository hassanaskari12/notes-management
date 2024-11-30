// Select elements
const noteTitleInput = document.getElementById("note-title");
const noteDescriptionInput = document.getElementById("note-description");
const addNoteBtn = document.getElementById("add-note-btn");
const notesContainer = document.getElementById("notes-container");

// Retrieve notes from local storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to display all notes
function displayNotes() {
  notesContainer.innerHTML = ""; // Clear the container

  notes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";
    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.description}</p>
      <div class="note-actions">
        <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteCard);
  });
}

// Function to add a new note
function addNote() {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  if (title === "" || description === "") {
    alert("Please fill out both fields.");
    return;
  }

  notes.push({ title, description });
  localStorage.setItem("notes", JSON.stringify(notes));
  noteTitleInput.value = "";
  noteDescriptionInput.value = "";
  displayNotes();
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

// Function to edit a note
function editNote(index) {
  const note = notes[index];
  noteTitleInput.value = note.title;
  noteDescriptionInput.value = note.description;

  // Remove the note from the list and re-save
  deleteNote(index);
}

// Add event listeners
addNoteBtn.addEventListener("click", addNote);

// Display notes on load
displayNotes();
