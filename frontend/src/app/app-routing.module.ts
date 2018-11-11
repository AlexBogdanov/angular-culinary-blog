import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { AdminArticlesComponent } from './components/admin-articles/admin-articles.component';
import { AdminRecipesComponent } from './components/admin-recipes/admin-recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'articles/create', component: CreateArticleComponent },
  { path: 'articles/edit/:id', component: EditArticleComponent },
  { path: 'recipes/create', component: CreateRecipeComponent },
  { path: 'recipes/edit/:id', component: EditRecipeComponent },
  { path: 'admin/articles', component: AdminArticlesComponent },
  { path: 'admin/recipes', component: AdminRecipesComponent },
  { path: 'recipe/:id', component: RecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
