import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Article from './models/Article';
import Recipe from './models/Recipe';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/angular_blog');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// Get all articles
router.route('/articles').get((req, res) => {
    Article.find((err, articles) => {
        if (err) {
            console.lof(err);
        } else {
            res.json(articles);
        }
    });
});

//  Get article by id
router.route('/articles/:id').get((req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            res.json(article);
        }
    });
});

// Add new article
router.route('/articles/create').post((req, res) => {
    let article = new Article(req.body);
    article.save()
    .then(article => {
        res.status(200).json({'article': 'Added successfully'});
    }).catch(err => {
        res.status(400).send('Failed to create new article');
    });
});

// Update article
router.route('/articles/edit/:id').post((req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (!article) {
            return next(new Error('Could not load document'));
        } else {
            article.title = req.body.title;
            article.description = req.body.description;
            article.author = req.body.author;

            article.save()
            .then(article => {
                res.json('Updated successfully');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// Delete article
router.route('/articles/delete/:id').get((req, res) => {
    Article.findByIdAndRemove({_id: req.params.id}, (err, article) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Remove successfully');
        }
    });
});

// Get all recipes
router.route('/recipes').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });
});

// Get recipe by id
router.route('/recipes/:id').get((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    });
});

// Add new recipe
router.route('/recipes/create').post((req, res) => {
    let recipe = new Recipe(req.body);
    recipe.save()
    .then(recipe => {
        res.status(200).json({'recipe': 'Added successfully'});
    }).catch(err => {
        res.status(400).send('Failed to create new recipe');
    });
});

// Update recipe
router.route('/recipes/edit/:id').post((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (!recipe) {
            return next(new Error('Could not load document'));
        } else {
            recipe.name = req.body.name;
            recipe.description = req.body.description;
            recipe.products = req.body.products;

            recipe.save()
            .then(recipe => {
                res.json('Updated successfully');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// Delete recipe
router.route('/recipes/delete/:id').get((req, res) => {
    Recipe.findByIdAndDelete({_id: req.params.id}, (err, recipe) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed successfully');
        }
    })
})

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));