class WCAnimatedDash extends HTMLElement {
  #width;
  #color;
  #bgColor;

  static get observedAttributes() {
    return [
      'width',
      'color',
      'background-color'
    ]
  }

  get html() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 300 10">
        <path d="M 0 5 L 300 5"
              stroke-linejoin="round"
              stroke-width="10"
              class="lineDash animate-dash-move"
              stroke="currentColor"
              stroke-linecap="round">
        </path>
      </svg>
    `
  }

  get css() {
    return `
      <style>
        svg {
          width: ${this.#width};
          color: ${this.#color};
          background-color: ${this.#bgColor};
          border-radius: ${this.#width / (29 + (1/3))};
        }
        path {
          stroke-dasharray: 200;
          stroke-dashoffset: 1000;
        }
        
        @keyframes dash-move {
          to {
            stroke-dashoffset: 200;
          }
        }
        
        .animate-dash-move {
          animation: dash-move 5s linear infinite;
        }
      </style>
    `
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({
      mode: 'open'
    })
  }

  connectedCallback() {
    this.#width = this.width
    this.#color = this.color
    this.#bgColor = this.backgroundColor
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'width':
        if(oldValue !== newValue) {
          this.#width = this.width
          this.shadow.innerHTML = `${this.css}${this.html}`
        }
        break
      case 'color':
        if(oldValue !== newValue) {
          this.#color = this.color
          this.shadow.innerHTML = `${this.css}${this.html}`
        }
        break
      case 'background-color':
        if(oldValue !== newValue) {
          this.#bgColor = this.backgroundColor
          this.shadow.innerHTML = `${this.css}${this.html}`
        }
        break
    }
  }

  render() {
    this.shadow.innerHTML = `${this.css}${this.html}`
  }

  get width() {
    return this.getAttribute('width') || "11rem";
  }

  get color() {
    return this.getAttribute('color') || "rgb(29 78 216)";
  }

  get backgroundColor() {
    return this.getAttribute('background-color') || "rgb(209 213 219)";
  }
}

window.customElements.define('wc-animated-dash', WCAnimatedDash);