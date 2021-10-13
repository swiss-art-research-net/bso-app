class SmapshotEmbed extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
    }
    static get observedAttributes(){
      return ["iri"];
    }
    attributeChangedCallback(iri, oldValue, newValue) {
      this._shadowRoot.innerHTML = `<iframe src=https://smapshot.heig-vd.ch/embed/owner/sari/original_image/${newValue}></iframe>`;
    }
    connectedCallback(){
      let iri = this.getAttribute("iri");
      let id = iri.substr(iri.lastIndexOf('/') + 1);
      this._shadowRoot.innerHTML = `<iframe src=https://smapshot.heig-vd.ch/embed/owner/sari/original_image/${id}></iframe>`;
    }
  }

customElements.define('smapshot-embed', SmapshotEmbed);