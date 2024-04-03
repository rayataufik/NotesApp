class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <span class="navbar-brand">Notes App</span>
                </div>
            </nav>
        `;
    }
}

customElements.define('app-bar', AppBar);
