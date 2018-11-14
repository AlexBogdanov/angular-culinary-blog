import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { ToastrService } from './../../services/toastr.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {

  createForm: FormGroup;
  recipes: Recipe[];
  products: String[] = [];

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      preparation: ['', Validators.required],
      products: ['', Validators.required]
    });
  }

  addRecipe(name, preparation) {
    const recipe: Recipe = {
      name,
      preparation,
      products: this.products
    };
    console.log(recipe);
    this.recipeService.addRecipe(recipe)
      .subscribe(() => {
        this.router.navigate(['/home']);
        this.toastSuccessRecipe();
      });
  }

  addProductToProducts(product) {
    this.products.push(product);
  }

  toastSuccessRecipe() {
    this.toastrService.Success('Recipe published successfully');
  }
}
