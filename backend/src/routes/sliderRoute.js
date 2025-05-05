const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');

router.get('/', sliderController.getAll);


module.exports = router;