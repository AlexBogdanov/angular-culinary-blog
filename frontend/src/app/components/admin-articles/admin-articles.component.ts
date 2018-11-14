import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from './../../models/article.model';
import { ArticleService } from './../../services/article.service';
import { ToastrService } from './../../services/toastr.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./../home/home.component.css']
})
export class AdminArticlesComponent implements OnInit {

  articles: Article[];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleService.getArticles()
      .subscribe((data: Article[]) => {
        this.articles = data;
        console.log('Data requested ...');
        console.log(this.articles);
      });
  }

  editArticle(id) {
    this.router.navigate([`/articles/edit/${id}`]);
  }

  deleteArticle(id) {
    this.articleService.deleteArticle(id)
      .subscribe(() => {
        this.fetchArticles();
        this.toastSuccessDeleteArticle();
      });
  }

  toastSuccessDeleteArticle() {
    this.toastrService.Success('Successfully deleted article');
  }
}
