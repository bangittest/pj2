const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.get('/:id', productController.getById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
