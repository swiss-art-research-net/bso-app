class ImageRegionSelector extends HTMLElement {
    constructor() {
        super();
        this._contents = new DocumentFragment();
        
    }
    static get observedAttributes(){
      return ["src", "width", "height"];
    }

    connectedCallback(){
        let id = "image-" + this.uuidv4();
        let src = this.getAttribute("src");
        let width = this.getAttribute("width");
        let height = this.getAttribute("height");
  
        const wrapper = document.createElement("div");
        const img = wrapper.appendChild(document.createElement("img"));
        img.src = src;
        if (width) {
          img.width = width;
        }
        if (height) {
          img.height = height;
        }
        img.id = id
  
        this._contents.append(wrapper);
        this.appendChild(this._contents);
        var croppr = new Croppr(`#${id}`, {
            // options
          });
    }

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
  }

customElements.define('image-region-selector', ImageRegionSelector);