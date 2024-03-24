export class NoteCard extends HTMLElement {
    constructor(note) {
        super();
        this.note = note;
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const template = `
            <style>
                .note {
                    margin-bottom: 20px;
                    padding: 20px;
                    background-color: #fff;
                    border: 1px solid rgba(0, 0, 0, 0.125);
                    border-radius: 0.25rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .note h2 {
                    margin-top: 0;
                    margin-bottom: 10px;
                    font-size: 1.25rem;
                }

                .note p {
                    margin-bottom: 10px;
                }
            </style>
            <div class="note">
                <h2>${this.note.title}</h3>
                <p>${this.note.body}</p>
                <small>${new Date(this.note.createdAt).toLocaleString()}</small>
            </div>
        `;
        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('note-card', NoteCard);
