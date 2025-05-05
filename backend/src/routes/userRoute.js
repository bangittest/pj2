const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.checkEmail); 
router.get('/all/', userController.getAllUser); 
router.post('/', userController.createUser);
router.put('/:id', userController.toggleUserActive);
router.put('/role/:id', userController.toggleUserRole);
// router.delete('/:id', productController.deleteProduct);

module.exports = router;
