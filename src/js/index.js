import '../css/style.css';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@babel/polyfill';

import { Article } from './components/article';
import { Modal } from './components/modal';
import { ArticlesManager } from './ArticleManager';
import { articles } from './data';
import { readFile } from './utilities';

const articleManager = new ArticlesManager(
  articles,
  'article-component',
  document.getElementById('articles_container')
);

articleManager.setIdGenerator(() => Date.now());

function validator(element, type) {
  switch (type) {
    case 'title': {
      const titlePattern = /^[A-Z]\w+/;

      return titlePattern.test(element);
    }
    case 'text': {
      if (element.length >= 500) return false;
      return true;
    }
    default: {
      return false;
    }
  }
}

function articleGenerator({ title = null, content = null } = {}) {
  return new Promise((resolve, reject) => {
    const modalElement = document.createElement('modal-component');

    const modalInner = document.createElement('div');
    modalInner.classList.add('modal-inner');

    const titleInput = document.createElement('div');
    titleInput.setAttribute('placeholder', 'title');
    titleInput.contentEditable = true;
    titleInput.innerHTML = title;

    titleInput.addEventListener('input', event => {
      const title = event.target.innerText.trim();

      if (validator(title, 'title')) {
        event.target.classList.remove('wrong');
      } else {
        event.target.classList.add('wrong');
      }
    });

    const textInput = document.createElement('div');
    textInput.contentEditable = true;
    textInput.setAttribute('placeholder', 'text');

    textInput.addEventListener('input', event => {
      const text = event.target.innerText.trim();

      if (validator(text, 'text')) {
        event.target.classList.remove('wrong');
      } else {
        event.target.classList.add('wrong');
      }
    });

    if (content) {
      textInput.innerHTML = content.text;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg, audio/mp3, video/mp4';

    const acceptButton = document.createElement('button');
    acceptButton.innerHTML = 'send';

    acceptButton.addEventListener('click', async () => {
      const title = titleInput.innerText.trim();
      const text = textInput.innerHTML;

      const file = fileInput.files[0];
      const media = file ? await readFile(file) : content && content.media;
      const type = file ? file.type.split('/')[0] : content && content.type;

      const validatorTitle = validator(title, 'title');
      const validatorText = validator(textInput.innerText.trim(), 'text');

      if (validatorTitle && validatorText) {
        modalElement.remove();

        resolve({ title, content: { text, media, type } });
      }
    });

    modalInner.append(titleInput);
    modalInner.append(textInput);
    modalInner.append(fileInput);
    modalInner.append(acceptButton);

    modalElement.append(modalInner);

    document.body.append(modalElement);
  });
}

articleManager.setArticleGenerator(articleGenerator);

customElements.define('article-component', Article);
customElements.define('modal-component', Modal);
articleManager.draw();
