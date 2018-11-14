import express from 'express';
import jwt from 'jsonwebtoken';

import Article from './../models/Article';
import Recipe from './../models/Recipe';
import User from './../models/User';

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'yektercesemosewaym');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

const router = express.Router();

// Article
// Get all articles
router.route('/articles').get((req, res) => {
    Article.find((err, articles) => {
        if (err) {
            console.log(err);
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
router.route('/articles/edit/:id', verifyToken).post((req, res) => {
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
router.route('/articles/delete/:id', verifyToken).get((req, res) => {
    Article.findByIdAndRemove({_id: req.params.id}, (err, article) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Remove successfully');
        }
    });
});

// Recipe
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
router.route('/recipes/edit/:id', verifyToken).post((req, res) => {
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
router.route('/recipes/delete/:id', verifyToken).get((req, res) => {
    Recipe.findByIdAndDelete({_id: req.params.id}, (err, recipe) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed successfully');
        }
    });
});

// User
// Register user
router.route('/register').post((req, res) => {
    let input = new User(req.body);
    User.findOne({ email: input.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                input.save((err, registeredUser) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let payload = { subject: registeredUser._id };
                        let token = jwt.sign(payload, 'yektercesemosewaym');
                        res.status(200).send({token});
                    }
                });
            } else {
                res.send('Email is already taken');
                console.log('Email already taken');
            }
        }
    })
});

// Login user
router.route('/login').post((req, res) => {
    let input = new User(req.body);

    User.findOne({ email: input.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== input.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'yektercesemosewaym');
                    res.status(200).send({token});
                }
            }
        }
    });
});

export default router;