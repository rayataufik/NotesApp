// input-form.js
export class InputForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
        `;

        this.shadowRoot.innerHTML = template;
        const formContainer = document.createElement('div');
        formContainer.classList.add('input-container');

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('id', 'title');
        titleInput.addEventListener('input', this.validateTitle.bind(this));

        const bodyLabel = document.createElement('label');
        bodyLabel.textContent = 'Body:';
        const bodyInput = document.createElement('textarea');
        bodyInput.setAttribute('id', 'body');
        bodyInput.addEventListener('input', this.validateBody.bind(this));

        const addButton = document.createElement('button');
        addButton.textContent = 'Add Note';
        addButton.classList.add('btn');

        addButton.addEventListener('click', () => {
            if (this.validateTitle() && this.validateBody()) {
                const newNote = {
                    id: 'notes-' + Math.random().toString(36).substr(2, 10),
                    title: titleInput.value,
                    body: bodyInput.value,
                    createdAt: new Date().toISOString(),
                    archived: false
                };
                const event = new CustomEvent('noteAdded', { detail: newNote });
                this.dispatchEvent(event);
            } else {
                alert('Silakan isi semua kolom.');
            }
        });

        formContainer.appendChild(titleLabel);
        formContainer.appendChild(titleInput);
        formContainer.appendChild(bodyLabel);
        formContainer.appendChild(bodyInput);
        formContainer.appendChild(addButton);

        this.shadowRoot.appendChild(formContainer);
    }

    validateTitle() {
        const titleInput = this.shadowRoot.querySelector('#title');
        if (titleInput.value.trim() === '') {
            titleInput.setCustomValidity('Judul Tidak Boleh Kosong.');
            return false;
        } else {
            titleInput.setCustomValidity('');
            return true;
        }
    }

    validateBody() {
        const bodyInput = this.shadowRoot.querySelector('#body');
        if (bodyInput.value.trim() === '') {
            bodyInput.setCustomValidity('Body Tidak Boleh Kosong.');
            return false;
        } else {
            bodyInput.setCustomValidity('');
            return true;
        }
    }
}

customElements.define('input-form', InputForm);
