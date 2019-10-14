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

articleManager.setIdGenerator(_ => Date.now());

function articleGenerator({ title = null, content = null } = {}) {
  return new Promise(async (resolve, reject) => {
    let modalElement = document.getElementsByTagName('modal-component')[0];

    if (!modalElement) {
      modalElement = document.createElement('modal-component');

      const modalInner = document.createElement('div');
      modalInner.classList.add('modal-inner');

      const titleInput = document.createElement('div');
      titleInput.setAttribute('placeholder', 'title');
      titleInput.contentEditable = true;
      titleInput.innerHTML = title;

      const textInput = document.createElement('div');
      textInput.contentEditable = true;
      textInput.setAttribute('placeholder', 'text');

      if (content) {
        textInput.innerHTML = content.text;
      }

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/png, image/jpeg, audio/mp3, video/mp4';

      const acceptButton = document.createElement('button');
      acceptButton.innerHTML = 'send';

      acceptButton.addEventListener('click', async _ => {
        const title = titleInput.innerText.trim();
        const text = textInput.innerHTML;

        const file = fileInput.files[0];
        const media = file ? await readFile(file) : content && content.media;

        const type = file
          ? file.type.split('/').shift()
          : content && content.type;

        if (title !== '' && textInput.innerText.trim() !== '') {
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
    }
  });
}

articleManager.setArticleGenerator(articleGenerator);

customElements.define('article-component', Article);
customElements.define('modal-component', Modal);

articleManager.draw();
