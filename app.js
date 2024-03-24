import './components/app-bar.js';
import { NoteCard } from './components/note-card.js';
import { InputForm } from './components/input-form.js';
import notesData from './notes.js';


const app = document.getElementById('app');

function displayNotes() {
    const appContainer = document.createElement('div');
    appContainer.classList.add('appContainer');

    notesData.forEach(note => {
        const noteCard = new NoteCard(note);
        appContainer.appendChild(noteCard);
    });

    app.appendChild(appContainer);
}

function addNoteForm() {
    const inputForm = new InputForm();
    app.appendChild(inputForm);

    inputForm.addEventListener('noteAdded', event => {
        const newNote = event.detail;
        const appContainer = app.querySelector('.appContainer');
        const noteCard = new NoteCard(newNote);
        appContainer.appendChild(noteCard);
    });
}

function init() {
    addNoteForm();
    displayNotes();
}

init();
