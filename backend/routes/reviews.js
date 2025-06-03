
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const apiKeyAuth = require('../middleware/apiKeyAuth'); 



router.get('/:recipeId', apiKeyAuth, reviewController.getReviewsByRecipeId);
router.post('/:recipeId', apiKeyAuth, reviewController.addReview);

module.exports = router;