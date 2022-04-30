const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router
  .route('/')
  .get(cartController.getAllCartItems)
  .post(cartController.addToCart)
  .delete(cartController.removeAllCartItems)

router
  .route('/:id')
  .delete(cartController.removeCartItem)

module.exports = router;