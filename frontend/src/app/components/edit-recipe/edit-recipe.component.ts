import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./../create-recipe/create-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: String;
  recipe: any = {};
  products: String[] = [];
  updateForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;

      this.recipeService.getRecipeById(this.id).subscribe(res => {
        this.recipe = res;
        this.updateForm.get('name').setValue(this.recipe.name);
        this.updateForm.get('preparation').setValue(this.recipe.preparation);
        this.updateForm.get('products').setValue(this.recipe.products);

        this.recipe = this.recipeService.getRecipeById(this.id);
        this.products = this.recipe.products;
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      preparation: ['', Validators.required],
      products: ['', Validators.required]
    });
  }

  updateRecipe(name, preparation, products) {
    this.recipeService.updateRecipe(this.id, name, preparation, this.products)
      .subscribe(() => {
        console.log('Recipe successfully edited');
        this.router.navigate(['/home']);
      });
  }

  addProductToProducts(product) {
    this.products.push(product);
  }
}
