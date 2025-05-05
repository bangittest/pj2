const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const cartItemController = require('../controllers/cartItemController');

router.get('/count/:userId', cartItemController.countItems);
router.get('/cart', cartController.getCartByUser);
router.post('/create', cartController.createCart);
router.post('/add', cartItemController.addItemToCart);

// Route lấy các sản phẩm trong giỏ hàng
router.get('/:user_id', cartItemController.getCartItems);

router.delete('/user/:userId', cartController.clearCartByUserId);

module.exports = router;