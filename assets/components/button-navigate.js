class ButtonNavigate extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});

  }

  static get observedAttributes() {
    return ["target", "prefix", "value"];
  }

  connectedCallback() {
    let id = "button-navigate-" + this.uuidv4();
    let target = this.getAttribute("target");
    let value = this.getAttribute("value") || "Submit";
    let prefix = this.getAttribute("prefix") || "";

    const btn = this._shadowRoot.appendChild(document.createElement("input"));

    btn.type = "submit";
    btn.value = value;
    btn.text = value;
    btn.id = id;

    btn.onclick = function() {
      location.href = prefix + document.getElementById(target).value;
    };
  }
  
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}

customElements.define('button-navigate', ButtonNavigate);