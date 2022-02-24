class ImageRegionSelector extends HTMLElement {
    constructor() {
        super();
        this._contents = new DocumentFragment();
        
    }
    static get observedAttributes(){
      return ["iiif", "width", "height", "target"];
    }

    connectedCallback(){
        let id = "image-" + this.uuidv4();
        let iiif = this.getAttribute("iiif");
        let width = this.getAttribute("width") || "";
        let height = this.getAttribute("height") || "";
        let target = this.getAttribute("target");
  
        const wrapper = document.createElement("div");
        const img = wrapper.appendChild(document.createElement("img"));

        let src = iiif + `/full/${width},${height}/0/default.jpg`;
        img.src = src;
        img.id = id;
  
        this._contents.append(wrapper);
        this.appendChild(this._contents);
        this.croppr = new Croppr(`#${id}`, {
            returnMode: 'ratio',
            onCropEnd: function(value) {
                let iiifCrop = iiif + `/pct:${value.x * 100},${value.y * 100},${value.width * 100},${value.height * 100}/${width},${height}/0/default.jpg`;
                document.querySelectorAll('[data-foo="value"]');
                document.querySelectorAll(`[image-region-target="${target}"]`).forEach(function(el) {
                  el.setAttribute("src", iiifCrop);
                });
              }
          });
    }

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
  }

customElements.define('image-region-selector', ImageRegionSelector);