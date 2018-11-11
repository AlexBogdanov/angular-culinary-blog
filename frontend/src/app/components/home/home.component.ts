import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from './../../models/article.model';
import { ArticleService } from './../../services/article.service';
import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[];
  recipes: Recipe[];
  noArticles = true;
  noRecipes = true;

  constructor(
    private articleService: ArticleService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchArticles();
    this.fetchRecipes();
  }

  fetchArticles() {
    this.articleService.getArticles()
      .subscribe((data: Article[]) => {
        if (data.length > 0) {
          this.noArticles = false;
        }
        this.articles = data;
        console.log('Data requested ...');
        console.log(this.articles);
      });
  }

  fetchRecipes() {
    this.recipeService.getRecipes()
      .subscribe((data: Recipe[]) => {
        if (data.length > 0) {
          this.noRecipes = false;
        }
        this.recipes = data;
        console.log('Data requested ...');
        console.log(this.recipes);
      });
  }
  loadRecipe(id) {
    this.router.navigate([`/recipe/${id}`]);
  }
}
