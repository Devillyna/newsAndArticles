import '../css/articleManager.css';

export class ArticlesManager {
  constructor(articles, tagName, rootNode) {
    this.articles = articles;
    this.root = rootNode;
    this.tagName = tagName;
  }

  setIdGenerator(func) {
    this.idGenerator = func;
  }

  add({ title, content }) {
    this.articles.unshift({
      id: this.idGenerator(),
      title,
      content
    });
  }

  edit({ id, title, content }) {
    const index = this.articles.findIndex(value => value.id === id);
    this.articles[index] = {
      title,
      content
    };
  }

  setArticleGenerator(func) {
    this.articleGenerator = func;
  }

  draw() {
    this.root.innerHTML = '';

    const addArticleButton = document.createElement('button');
    addArticleButton.innerHTML = '+';
    addArticleButton.classList.add('add');

    addArticleButton.addEventListener('click', async _ => {
      const newArticle = await this.articleGenerator();
      this.add(newArticle);
      this.draw();
    });

    this.root.append(addArticleButton);

    this.articles.forEach(({ id, title, content }) => {
      const newArticle = document.createElement(this.tagName);
      newArticle.setAttribute('id', id);
      newArticle.setAttribute('title', title);
      newArticle.setAttribute('text', content.text);

      let media = null;

      if (typeof content.media === 'string') {
        media = content.media;
      } else {
      }

      newArticle.setAttribute('media', media);
      newArticle.setAttribute('type', content.type);
      newArticle.setAttribute('wrapped', '');

      this.root.append(newArticle);
    });
  }
}
