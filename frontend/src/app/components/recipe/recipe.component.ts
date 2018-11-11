import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  id: String;
  recipe: any = {};
  products: String[];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.fetchRecipe(this.id);
  }

  fetchRecipe(id) {
    this.recipeService.getRecipeById(id)
    .subscribe(data => {
      this.recipe = data;
      this.products = this.recipe.products;
      this.products.splice(0, 0, 'Ingredients:');
    });
  }
}
