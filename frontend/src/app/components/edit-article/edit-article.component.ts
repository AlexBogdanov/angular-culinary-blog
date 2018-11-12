import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./../create-recipe/create-recipe.component.css']
})
export class EditArticleComponent implements OnInit {

  id: String;
  article: any = {};
  updateForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;

      this.articleService.getArticleById(this.id).subscribe(res => {
        this.article = res;
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  updateArticle(title, description, author) {
    this.articleService.updateArticle(this.id, title, description, author)
      .subscribe(() => {
        console.log('Article successfully edited');
        this.router.navigate(['/admin/articles']);
      });
  }
}
