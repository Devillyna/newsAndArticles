import modal from './modal.html';
import { stringToHTML } from '../../utilities';

export class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.update();
  }

  update() {
    this.template = stringToHTML(modal).content;

    this.template.querySelector('.close').addEventListener('click', _ => {
      this.remove();
    });

    this.shadowRoot.innerHTML = '';

    this.shadowRoot.append(this.template);
  }
}
