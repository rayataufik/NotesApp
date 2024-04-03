import "./components/app-bar.js";
import { NoteCard } from "./components/note-card.js";
import { InputForm } from "./components/input-form.js";
import { LoadingIndicator } from "./components/loading-indicator.js";
import "./assets/css/style.css";

const baseUrl = "https://notes-api.dicoding.dev/v2";

async function fetchNotes() {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

async function fetchArchivedNotes() {
  try {
    const response = await fetch(`${baseUrl}/notes/archived`);
    if (!response.ok) {
      throw new Error("Failed to fetch archived notes");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    return [];
  }
}

const app = document.getElementById("app");

async function getNote() {
  const appContainer = document.createElement("div");
  appContainer.classList.add("appContainer");

  const archiveContainer = document.getElementById("archive");

  const loadingIndicator = document.createElement("loading-indicator");
  app.appendChild(loadingIndicator);
  loadingIndicator.show();

  try {
    const notesData = await fetchNotes();
    notesData.forEach((note) => {
      const noteCard = new NoteCard(note);
      if (note.archive) {
        const archiveNoteCard = new NoteCard(note);
        archiveContainer.appendChild(archiveNoteCard);
        addUnarchiveEventListener(archiveNoteCard);
      } else {
        appContainer.appendChild(noteCard);
        addDeleteEventListener(noteCard);
        addArchiveEventListener(noteCard);
      }
    });

    const archivedNotesData = await fetchArchivedNotes();
    archivedNotesData.forEach((note) => {
      const archiveNoteCard = new NoteCard(note);
      archiveContainer.appendChild(archiveNoteCard);
      addUnarchiveEventListener(archiveNoteCard);
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
  } finally {
    loadingIndicator.hide();
  }

  app.appendChild(appContainer);
}

async function addNoteForm() {
  const inputForm = new InputForm();
  app.appendChild(inputForm);

  inputForm.addEventListener("noteAdded", async (event) => {
    const newNote = {
      title: event.detail.title,
      body: event.detail.body,
    };

    const loadingIndicator = document.createElement("loading-indicator");
    app.appendChild(loadingIndicator);
    loadingIndicator.show();

    try {
      const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const addedNote = await response.json();
      const appContainer = app.querySelector(".appContainer");
      const noteCard = new NoteCard(addedNote.data);
      appContainer.appendChild(noteCard);

      addDeleteEventListener(noteCard);
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      loadingIndicator.hide();
    }
  });
  const allNotesHeading = document.createElement("h3");
  allNotesHeading.textContent = "All Notes";
  app.appendChild(allNotesHeading);
}

async function deleteNote(noteId) {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}

function addDeleteEventListener(noteCard) {
  noteCard.addEventListener("delete", async (event) => {
    const noteId = event.detail;

    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus catatan ini?"
    );
    if (!confirmDelete) {
      return;
    }

    const loadingIndicator = document.createElement("loading-indicator");
    app.appendChild(loadingIndicator);
    loadingIndicator.show();

    try {
      await deleteNote(noteId);
      noteCard.remove();
    } finally {
      loadingIndicator.hide();
    }
  });
}

async function archiveNote(noteId) {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}/archive`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to archive note");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error archiving note:", error);
  }
}

function addArchiveEventListener(noteCard) {
  noteCard.addEventListener("archive", async (event) => {
    const noteId = event.detail;

    const confirmed = confirm(
      "Apakah Anda yakin ingin mengarsipkan catatan ini?"
    );

    if (confirmed) {
      const loadingIndicator = document.createElement("loading-indicator");
      app.appendChild(loadingIndicator);
      loadingIndicator.show();

      try {
        await archiveNote(noteId);
        location.reload();
      } finally {
        loadingIndicator.hide();
      }
    }
  });
}

async function unarchiveNote(noteId) {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}/unarchive`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to unarchive note");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error unarchiving note:", error);
  }
}

function addUnarchiveEventListener(noteCard) {
  noteCard.addEventListener("unarchive", async (event) => {
    const noteId = event.detail;

    const confirmed = confirm(
      "Apakah Anda yakin ingin mengeluarkan catatan ini dari arsip?"
    );
    if (!confirmed) return;

    const loadingIndicator = document.createElement("loading-indicator");
    app.appendChild(loadingIndicator);
    loadingIndicator.show();

    try {
      await unarchiveNote(noteId);
      location.reload();
    } finally {
      loadingIndicator.hide();
    }
  });
}

async function init() {
  addNoteForm();
  await getNote();
}

init();
