import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get(`${this.url}/recipes`);
  }

  getRecipeById(id) {
    return this.http.get(`${this.url}/recipes/${id}`);
  }

  addRecipe(recipe) {
    return this.http.post(`${this.url}/recipes/create`, recipe);
  }

  updateRecipe(id, name, preparation, products) {
    const recipe = {
      name,
      preparation,
      products
    };

    return this.http.post(`${this.url}/recipes/edit/${id}`, recipe);
  }

  deleteRecipe(id) {
    return this.http.get(`${this.url}/recipes/delete/${id}`);
  }
}
