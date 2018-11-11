import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from './../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(`${this.url}/articles`);
  }

  getArticleById(id) {
    return this.http.get(`${this.url}/articles/${id}`);
  }

  addArticle(article) {
    return this.http.post(`${this.url}/articles/create`, article);
  }

  updateArticle(id, title, description, author) {
    const article = {
      title,
      description,
      author
    };

    return this.http.post(`${this.url}/articles/edit/${id}`, article);
  }

  deleteArticle(id) {
    return this.http.get(`${this.url}/articles/delete/${id}`);
  }
}
