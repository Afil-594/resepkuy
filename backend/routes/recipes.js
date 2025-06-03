
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController'); 



router.get('/search', recipeController.searchRecipes);



router.get('/findByIngredients', recipeController.findRecipesByIngredients);



router.get('/:id', recipeController.getRecipeDetails);

module.exports = router;