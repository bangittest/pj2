const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

router.put('/:id/increase', cartItemController.increaseQuantity);

router.put('/:id/decrease', cartItemController.decreaseQuantity);
router.delete('/:id', cartItemController.deleteItem); 
router.delete('/:id/cart', cartItemController.deleteCartItem); 

module.exports = router;