import '../css/style.css';

import '@babel/polyfill';

import { Article } from './components/article';
import { Modal } from './components/modal';
import { ArticlesManager } from './ArticleManager';
import { articles } from './data';

const articleManager = new ArticlesManager(
  articles,
  'article-component',
  document.getElementById('articles_container')
);

articleManager.setIdGenerator(_ => Date.now());

function articleGenerator() {
  return new Promise(async (resolve, reject) => {
    let modalElement = document.getElementsByTagName('modal-component')[0];

    if (!modalElement) {
      modalElement = document.createElement('modal-component');

      const modalInner = document.createElement('div');
      modalInner.classList.add('modal-inner');

      const titleInput = document.createElement('input');
      const textInput = document.createElement('textarea');

      const acceptButton = document.createElement('button');
      acceptButton.innerHTML = 'add article';

      acceptButton.addEventListener('click', _ => {
        const title = titleInput.value.trim();
        const text = textInput.value.trim();

        if (title !== '' && text !== '') {
          resolve({ title, content: { text } });
          modalElement.removeAttribute('showed');
        }
      });

      modalInner.append(titleInput);
      modalInner.append(textInput);
      modalInner.append(acceptButton);

      modalElement.append(modalInner);

      document.body.append(modalElement);
    }

    modalElement.setAttribute('showed', '');
  });
}

articleManager.setArticleGenerator(articleGenerator);

customElements.define('article-component', Article);
customElements.define('modal-component', Modal);

articleManager.draw();
