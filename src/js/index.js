import '../css/style.css';
import { Article } from './components/article';
import { ArticlesManager } from './ArticleManager';
import { articles } from './data';

const articleManager = new ArticlesManager(
  articles,
  'article-component',
  document.getElementById('articles_container')
);

articleManager.setIdGenerator(_ => Date.now());

articleManager.setArticleGenerator(
  _ =>
    new Promise((resolve, reject) => {
      (_ => new Promise(r => setTimeout(r, 1000)))().then(_ => {
        resolve({
          title: 'asd',
          content: { text: 'asd', media: './Pictures/Cat.png', type: 'image' }
        });
      });
    })
);

customElements.define('article-component', Article);

articleManager.draw();
