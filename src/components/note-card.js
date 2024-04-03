export class NoteCard extends HTMLElement {
  constructor(note) {
    super();
    this.note = note;
    this.attachShadow({ mode: "open" });
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

                .note-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .delete-button {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 16px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
                }

                .archive-button {
                    background-color: #2196F3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 16px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
                }

                .unarchive-button{
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 16px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        <div class="note">
            <h2>${this.note.title}</h2>
            <p>${this.note.body}</p>
            <div class="note-footer">
                <small>${new Date(this.note.createdAt).toLocaleString()}</small>
                ${
                  this.note.archived
                    ? '<button class="delete-button">Delete</button><button class="unarchive-button">Unarchive</button>'
                    : '<button class="delete-button">Delete</button><button class="archive-button">Archive</button>'
                }
            </div>
        </div>
    `;
    this.shadowRoot.innerHTML = template;

    const deleteButton = this.shadowRoot.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("delete", { detail: this.note.id }));
    });

    if (this.note.archived) {
      const unarchiveButton =
        this.shadowRoot.querySelector(".unarchive-button");
      unarchiveButton.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("unarchive", { detail: this.note.id })
        );
      });
    } else {
      const archiveButton = this.shadowRoot.querySelector(".archive-button");
      archiveButton.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("archive", { detail: this.note.id })
        );
      });
    }
  }
}

customElements.define("note-card", NoteCard);
