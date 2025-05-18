const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// GET reviews by product ID
router.get('/:productId', reviewController.getReviews);

// POST new review
router.post('/', reviewController.createReview);
router.get('/count/:productId', reviewController.getReviewCount); 

module.exports = router;
