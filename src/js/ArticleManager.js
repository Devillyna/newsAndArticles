import '../css/articleManager.css';

export class ArticlesManager {
  constructor(articles, tagName, rootNode) {
    this.articles = articles;
    this.tagName = tagName;
    this.root = rootNode;
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

  edit(id, { title, content }) {
    const index = this.articles.findIndex(value => value.id === id);
    this.articles[index] = {
      id,
      title,
      content
    };
  }

  delete(id) {
    const index = this.articles.findIndex(value => value.id === id);

    this.articles.splice(index, 1);
  }

  setArticleGenerator(func) {
    this.articleGenerator = func;
  }

  draw() {
    this.root.innerHTML = '';

    const addArticleButton = document.createElement('button');
    addArticleButton.innerHTML = '+';
    addArticleButton.classList.add('add');

    addArticleButton.addEventListener('click', async () => {
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
      newArticle.setAttribute('media', content.media);
      newArticle.setAttribute('type', content.type);
      newArticle.setAttribute('wrapped', '');

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
      deleteButton.addEventListener('click', () => {
        this.delete(id);
        this.draw();
      });

      const editButton = document.createElement('button');
      editButton.classList.add('edit');
      editButton.innerHTML = `<i class="fas fa-edit"></i>`;
      editButton.addEventListener('click', async () => {
        const newArticle = await this.articleGenerator({ title, content });

        this.edit(id, newArticle);
        this.draw();
      });

      newArticle.append(deleteButton);
      newArticle.append(editButton);

      this.root.append(newArticle);
    });
  }
}
