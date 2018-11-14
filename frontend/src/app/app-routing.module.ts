import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { HomeComponent } from './components/home/home.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { AdminArticlesComponent } from './components/admin-articles/admin-articles.component';
import { AdminRecipesComponent } from './components/admin-recipes/admin-recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'articles/create', component: CreateArticleComponent },
  { path: 'articles/edit/:id', component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: 'recipes/create', component: CreateRecipeComponent },
  { path: 'recipes/edit/:id', component: EditRecipeComponent, canActivate: [AuthGuard] },
  { path: 'admin/articles', component: AdminArticlesComponent, canActivate: [AuthGuard] },
  { path: 'admin/recipes', component: AdminRecipesComponent, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
