class LoadingIndicator extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("loading-wrapper");

    const style = document.createElement("style");
    style.textContent = `
      .loading-wrapper {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, 0.8);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }

      .loading-text {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      .loading-icon {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    wrapper.innerHTML = `
      <div class="loading-text">Loading...</div>
      <div class="loading-icon"></div>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    this._wrapper = wrapper;
  }

  show() {
    this._wrapper.style.display = "block";
  }

  hide() {
    this._wrapper.style.display = "none";
  }
}

customElements.define("loading-indicator", LoadingIndicator);
