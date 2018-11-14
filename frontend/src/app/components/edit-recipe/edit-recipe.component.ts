import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RecipeService } from './../../services/recipe.service';
import { ToastrService } from './../../services/toastr.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./../create-recipe/create-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: String;
  recipe: any = {};
  updateForm: FormGroup;
  products: any[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;

      this.recipeService.getRecipeById(this.id).subscribe(res => {
        this.recipe = res;
        this.products = this.recipe.products;
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      preparation: ['', Validators.required],
      products: [[], Validators.required]
    });
  }

  updateRecipe(name, preparation) {
    this.recipeService.updateRecipe(this.id, name, preparation, this.products)
    .subscribe(() => {
      console.log('Recipe successfully edited');
      this.router.navigate(['/admin/recipes']);
      this.toastSuccessEditRecipe();
    });
  }

  addProductToProducts(product) {
    $('#product').val('');
    this.products.push(product);
  }

  removeProductFromProducts(index) {
    this.products.splice(index, 1);
  }

  toastSuccessEditRecipe() {
    this.toastrService.Success('Recipe successfully edited');
  }
}
