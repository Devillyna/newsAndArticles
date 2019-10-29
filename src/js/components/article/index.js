import article from './article.html';
import { stringToHTML } from '../../utilities';

export class Article extends HTMLElement {
  constructor() {
    // вызываю родительский конструктор
    super();

    this.attachShadow({ mode: 'open' });
  }

  get id() {
    return this.getAttribute('id');
  }

  get title() {
    return this.getAttribute('title');
  }

  get text() {
    return this.getAttribute('text');
  }

  get media() {
    return this.getAttribute('media');
  }

  get type() {
    return this.getAttribute('type');
  }

  get wrapped() {
    // если аттрибут отсутствует, то он равен null
    // если аттрубут есть, то он НЕ равен null
    return this.getAttribute('wrapped') !== null;
  }

  set wrapped(value) {
    if (!!value /*если value истинно(true)*/) {
      this.setAttribute('wrapped', '');
    } else {
      this.removeAttribute('wrapped');
    }
  }

  // когда компонент(тэг) встраивается в документ(отрисовывается на экране)
  connectedCallback() {
    this.update();
  }

  // описываю название аттрибута, изменения которого хочу отследить
  static get observedAttributes() {
    return ['wrapped'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'wrapped': {
        this.update();
        break;
      }
      default: {
        break;
      }
    }
  }

  update() {
    // Перевожу строку с HTML в дерево с объектами(тэгами)
    this.template = stringToHTML(article).content;

    const newMedia =
      this.type === 'image'
        ? document.createElement('img')
        : this.type === 'video'
        ? document.createElement('video')
        : this.type === 'audio'
        ? document.createElement('audio')
        : null;

    if (newMedia) {
      const mediaElement = this.template.querySelector('.media');

      if (this.type === 'image') {
        newMedia.setAttribute('src', this.media);
      } else {
        newMedia.setAttribute('controls', '');

        const src = document.createElement('source');
        src.setAttribute('src', this.media);
        newMedia.append(src);
      }
      mediaElement.append(newMedia);
    }

    this.template.querySelector('.title').innerHTML = this.title;

    const textElement = this.template.querySelector('.text');

    if (this.wrapped) {
      textElement.innerHTML =
        this.text.length > 255
          ? this.text.substr(0, 255).trim() + '... '
          : this.text;
    } else {
      textElement.innerHTML = this.text;
    }

    const button = document.createElement('a');
    button.innerHTML = this.wrapped ? ' see more' : ' collapse';
    button.classList.add('link');
    button.addEventListener('click', _ => {
      this.wrapped = !this.wrapped;
    });

    textElement.append(button);

    this.shadowRoot.innerHTML = '';

    this.shadowRoot.append(this.template);
  }
}
