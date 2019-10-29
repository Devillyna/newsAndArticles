import '../css/style.css';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands'; // icons
import '@babel/polyfill'; // library for crossbrowsing

import { Article } from './components/article';
import { Modal } from './components/modal';
import { ArticlesManager } from './ArticleManager';
import { articles } from './data';
import { readFile } from './utilities';

const articleManager = new ArticlesManager(
  articles, // массив статей
  'article-component', // имя компонента для одной статьи
  document.getElementById('articles_container') // где отрисовываются статьи
);

articleManager.setIdGenerator(() => Date.now()); // передаю функцию, которая будет генерировать идентификаторы

function articleGenerator({ title = null, content = null } = {}) {
  // В эту функцию передается объект со свойствами title и content. С помощью конструкции {title, content}
  // я достаю из него эти значения и присваиваю переменным title и content (теперь это обычные переменные)
  // через оператор = я указываю параметры по умолчанию:
  // - если в функцию вместо объекта будет передано свойство undefined, он станет пустым объектом
  // - если в объекте одно из указанных свойств будет равно undefined, они станут равны null

  return new Promise((resolve, reject) => {
    // в конструктор объекта "Обещание" передаются его методы resolve и reject
    // он нужен для асинхронных событий т.е. тех, которые выполнятся не сразу
    // при вызове функции resolve Promise переходит в состояние "исполненно"
    // и из него возвращается значение переданное в качестве аргумента
    // привызове функции reject он переходит в состояние "отклоненно"
    // и вызывается исключение

    const modalElement = document.createElement('modal-component');

    const modalInner = document.createElement('div');
    modalInner.classList.add('modal-inner');

    const titleInput = document.createElement('div');
    titleInput.setAttribute('placeholder', 'title');
    titleInput.contentEditable = true;
    titleInput.innerHTML = title;

    const textInput = document.createElement('div');
    textInput.contentEditable = true;
    textInput.setAttribute('placeholder', 'text');

    //если в контент есть значения (статья заполнена), то они выводятся в полям формочки
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
      //если при редктировании указывается новый файл - записываем его, если нет - берем старый
      const media = file ? await readFile(file) : content && content.media;
      //определение типа файла и перезаписывание
      const type = file ? file.type.split('/')[0] : content && content.type;
      //проверка на пустое поле
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
  });
}

//передача функции, которая генерирует статьи
articleManager.setArticleGenerator(articleGenerator);

//определение элементов, которые были созданы Лешей
customElements.define('article-component', Article);
customElements.define('modal-component', Modal);
//отрисовка всех статей
articleManager.draw();
