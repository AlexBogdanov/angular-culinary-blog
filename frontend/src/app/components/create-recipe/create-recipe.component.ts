import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  createForm: FormGroup;
  recipes: Recipe[];
  products: String[] = [];

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      preparation: ['', Validators.required],
      products: ['', Validators.required]
    });
  }

  ngOnInit() {
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
      });
  }

  addProductToProducts(product) {
    this.products.push(product);
  }
}
