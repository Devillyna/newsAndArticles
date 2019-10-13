import modal from './modal.html';
import { stringToHTML } from '../../utilities';

export class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  get showed() {
    return this.getAttribute('showed') !== null;
  }

  set showed(value) {
    if (!!value) {
      this.setAttribute('showed', '');
    } else {
      this.removeAttribute('showed');
    }
  }

  connectedCallback() {
    this.update();
  }

  static get observedAttributes() {
    return ['showed'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'showed': {
        this.update();
        break;
      }
      default: {
        break;
      }
    }
  }

  update() {
    this.template = stringToHTML(modal).content;

    this.template.querySelector('.close').addEventListener('click', _ => {
      this.showed = !this.showed;
    });

    this.shadowRoot.innerHTML = '';

    if (this.showed) {
      this.shadowRoot.append(this.template);
    }
  }
}
