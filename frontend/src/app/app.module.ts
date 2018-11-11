import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { ArticleService } from './services/article.service';
import { RecipeService } from './services/recipe.service';
import { AdminArticlesComponent } from './components/admin-articles/admin-articles.component';
import { AdminRecipesComponent } from './components/admin-recipes/admin-recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateArticleComponent,
    EditArticleComponent,
    CreateRecipeComponent,
    EditRecipeComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AdminArticlesComponent,
    AdminRecipesComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ArticleService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
