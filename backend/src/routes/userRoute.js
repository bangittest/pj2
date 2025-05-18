const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.checkEmail); 
router.get('/user/:id', userController.getUserById);
router.get('/all/', userController.getAllUser); 
router.post('/', userController.createUser);
router.put('/:id', userController.toggleUserActive);
router.put('/update/:email', userController.updateUser);
router.put('/change-password/:email', userController.changePassword);

// router.delete('/:id', productController.deleteProduct);

module.exports = router;
