/**
 * 
 * This component adds the possibility of embedding an iframe (typically some html) in templates.
 * 
 * Usage:
 * 
 * <!-- basic usage -->
 * <iframe-embed iri="../assets/no_auth/mds/labels/2D.html" width=750 height=540> 
 * </iframe-embed>
 *
 * 
 * <!-- with optional width and height attributes -->
 * <iframe-embed 
 *  iri="../assets/no_auth/mds/labels/2D.html"
 *  width=750
 *  height=540>
 * </iframe-embed>
 * 
 */

class IframeEmbed extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
    }
    static get observedAttributes(){
      return ["iri", "width", "height"];
    }
    attributeChangedCallback(iri, oldValue, newValue) {
      let id = newValue.substr(newValue.lastIndexOf('/') + 1);
    //   let host = this.getAttribute("beta") ? "https://smapshot-beta.heig-vd.ch" : "https://smapshot.heig-vd.ch";
      this._shadowRoot.innerHTML = `<iframe src=${newValue}></iframe>`;
    }
    connectedCallback(){
      let iri = this.getAttribute("iri");
      let width = this.getAttribute("width") || 600;
      let height = this.getAttribute("height") || 400;
      let id = iri.substr(iri.lastIndexOf('/') + 1);
    //   let host = this.getAttribute("beta")  ? "https://smapshot-beta.heig-vd.ch" : "https://smapshot.heig-vd.ch";
    //   this._shadowRoot.innerHTML = `<iframe src="https://smapshot-beta.heig-vd.ch/embed/owner/sari/original_image/${id}" width="${width}" height="${height}"></iframe>`;
      this._shadowRoot.innerHTML = `<iframe src="${iri}" width="${width}" height="${height}"></iframe>`;
    }
  }

customElements.define('iframe-embed', IframeEmbed);