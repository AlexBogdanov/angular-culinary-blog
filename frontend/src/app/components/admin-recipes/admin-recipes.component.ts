import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { ToastrService } from './../../services/toastr.service';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.component.html',
  styleUrls: ['./../home/home.component.css']
})
export class AdminRecipesComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.recipeService.getRecipes()
      .subscribe((data: Recipe[]) => {
        this.recipes = data;
        console.log('Data requested ...');
        console.log(this.recipes);
      });
  }

  editRecipe(id) {
    this.router.navigate([`/recipes/edit/${id}`]);
  }

  deleteRecipe(id) {
    this.recipeService.deleteRecipe(id)
      .subscribe(() => {
        this.fetchRecipes();
        this.toastSuccessDeleteRecipe();
      });
  }

  toastSuccessDeleteRecipe() {
    this.toastrService.Success('Successfully deleted recipe');
  }
}
