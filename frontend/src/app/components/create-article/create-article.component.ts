import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Article } from './../../models/article.model';
import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./../create-recipe/create-recipe.component.css']
})
export class CreateArticleComponent implements OnInit {

  createForm: FormGroup;
  articles: Article[];

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addArticle(title, description, author) {
    const article: Article = {
      title,
      description,
      author
    };
    console.log(article);
    this.articleService.addArticle(article)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
