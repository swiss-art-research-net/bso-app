class ImageRegionSelector extends HTMLElement {
  constructor() {
    super();
    this._contents = new DocumentFragment();

  }
  static get observedAttributes() {
    return ["iiif", "width", "height", "target", "target-urlparam"];
  }

  connectedCallback() {
    let id = "image-" + this.uuidv4();
    let iiif = this.getAttribute("iiif");
    let width = this.getAttribute("width") || "";
    let height = this.getAttribute("height") || "";
    let target = this.getAttribute("target");
    let urlparam = this.getAttribute("target-urlparam");

    const wrapper = document.createElement("div");
    const img = wrapper.appendChild(document.createElement("img"));

    let src = iiif + `/full/${width},${height}/0/default.jpg`;
    img.src = src;
    img.id = id;

    this._contents.append(wrapper);
    this.appendChild(this._contents);
    parent = this;

    this.croppr = new Croppr(`#${id}`, {
      returnMode: 'ratio',
      onCropEnd: function (value) {
        let iiifCrop = iiif + `/pct:${value.x * 100},${value.y * 100},${value.width * 100},${value.height * 100}/${width},${height}/0/default.jpg`;

        document.querySelectorAll(`[image-region-target="${target}"]`).forEach(function (el) {
          const children = el.children;
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            console.log(child.getAttribute('href'))
            let newUrl = parent.updateURLParameter(child.getAttribute('href'), urlparam, iiifCrop);
            console.log(newUrl);
            child.setAttribute('href', newUrl);
          }
        });
      }
    });
  }
  
  updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split('=')[0] != param) {
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
}

customElements.define('image-region-selector', ImageRegionSelector);