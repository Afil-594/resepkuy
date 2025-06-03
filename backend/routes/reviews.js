// backend/routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const apiKeyAuth = require('../middleware/apiKeyAuth'); // <-- 1. Impor middleware apiKeyAuth

// 2. Terapkan middleware 'apiKeyAuth' pada rute yang ingin diproteksi.
//    Middleware ini akan dijalankan SEBELUM fungsi di 'reviewController'.
router.get('/:recipeId', apiKeyAuth, reviewController.getReviewsByRecipeId);
router.post('/:recipeId', apiKeyAuth, reviewController.addReview);

module.exports = router;