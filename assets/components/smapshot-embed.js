/**
 * 
 * This component integrates the Smapshot (https://smapshot.heig-vd.ch/) embed view
 * for displaying a georeferenced image in a 3D landscape. The view is embedded as
 * an iFrame, therefore all functional and visual aspects are controlled by
 * Smapshot.
 * 
 * Usage:
 * 
 * <!-- basic usage -->
 * <smapshot-embed 
 *  iri="https://resource.swissartresearch.net/artwork/nb-162431">
 * </smapshot-embed>
 *
 * 
 * <!-- width optional width and height attributes -->
 * <smapshot-embed 
 *  iri="https://resource.swissartresearch.net/artwork/nb-162431" 
 *  width="100%"
 *  height="100%">
 * </smapshot-embed>
 * 
 */

/*jshint esversion: 6 */
class SmapshotEmbed extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({mode: 'open'});
    }
    static get observedAttributes(){
      return ["iri", "width", "height"];
    }
    attributeChangedCallback(iri, oldValue, newValue) {
      let id = newValue.substr(newValue.lastIndexOf('/') + 1);
      this._shadowRoot.innerHTML = `<iframe src=https://smapshot.heig-vd.ch/embed/owner/sari/original_image/${id}></iframe>`;
    }
    connectedCallback(){
      let iri = this.getAttribute("iri");
      let width = this.getAttribute("width") || 600;
      let height = this.getAttribute("height") || 400;
      let id = iri.substr(iri.lastIndexOf('/') + 1);
      this._shadowRoot.innerHTML = `<iframe src="https://smapshot.heig-vd.ch/embed/owner/sari/original_image/${id}" width="${width}" height="${height}"></iframe>`;
    }
  }

customElements.define('smapshot-embed', SmapshotEmbed);