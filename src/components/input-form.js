export class InputForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const template = `
        <style>
            .input-container {
                max-width: 600px;
                margin: 0 auto;
                margin-top: 30px;
                margin-bottom: 30px;
                padding: 20px;
                background-color: #f8f9fa;
                border: 1px solid #ced4da;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .input-container label {
                display: block;
                margin-bottom: 5px;
            }

            .input-container input[type="text"],
            .input-container textarea {
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                box-sizing: border-box;
            }

            .input-container textarea {
                height: 100px;
            }

            .input-container button {
                padding: 8px 16px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }

            .input-container button:hover {
                background-color: #0056b3;
            }
        </style>
        <label for="title">Title:</label>
        <input type="text" id="title">
        <label for="body">Body:</label>
        <textarea id="body"></textarea>
        <button id="addButton" class="btn">Add Note</button>
    `;

    this.shadowRoot.innerHTML = `<div class="input-container">${template}</div>`;

    const titleInput = this.shadowRoot.getElementById("title");
    const bodyInput = this.shadowRoot.getElementById("body");
    const addButton = this.shadowRoot.getElementById("addButton");

    addButton.addEventListener("click", () => {
      if (this.validateTitle() && this.validateBody()) {
        const newNote = {
          id: "notes-" + Math.random().toString(36).substr(2, 10),
          title: titleInput.value,
          body: bodyInput.value,
          createdAt: new Date().toISOString(),
          archived: false,
        };
        const event = new CustomEvent("noteAdded", { detail: newNote });
        this.dispatchEvent(event);
        titleInput.value = "";
        bodyInput.value = "";
        alert("Note berhasil ditambahkan.");
      } else {
        alert("Silakan isi semua kolom.");
      }
    });

    titleInput.addEventListener("input", () => {
      this.validateTitle();
    });

    bodyInput.addEventListener("input", () => {
      this.validateBody();
    });
  }

  validateTitle() {
    const titleInput = this.shadowRoot.querySelector("#title");
    if (titleInput.value.trim() === "") {
      titleInput.setCustomValidity("Judul Tidak Boleh Kosong.");
      return false;
    } else {
      titleInput.setCustomValidity("");
      return true;
    }
  }

  validateBody() {
    const bodyInput = this.shadowRoot.querySelector("#body");
    if (bodyInput.value.trim() === "") {
      bodyInput.setCustomValidity("Body Tidak Boleh Kosong.");
      return false;
    } else {
      bodyInput.setCustomValidity("");
      return true;
    }
  }
}

customElements.define("input-form", InputForm);
