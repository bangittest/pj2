const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
router.post("/", orderController.createOrder);
router.get("/:userId", orderController.getOrders);
router.put('/:id/status', orderController.updateOrderStatus);
router.get("/", orderController.getAllOrders);
module.exports = router;