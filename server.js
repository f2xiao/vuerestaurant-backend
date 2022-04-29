const express = require('express');
const router = express.Router();
const cartController = require('./controllers/cartController');
// const fs = require('fs');
// const path = require('path');

// const PRODUCT_DATA_FILE = path.join(__dirname, 'server-product-data.json');
// const CART_DATA_FILE = path.join(__dirname, 'server-cart-data.json');


// routes

// cartRoutes
// retrieve all items from the cart storage

router
  .route('/')
  .get(cartController.getAllCartItems)
  .post(cartController.addToCart)
  .delete(cartController.removeAllCartItems)

router
  .route('/:id')
  .delete(cartController.removeCartItem)


  // removeCartItem
  // app.delete('/cart/delete', (req, res) => {
    
  // });

// removeAllCartItems
  // app.delete('/cart/delete/all', (req, res) => {
    
  // });

// productRoutes
// app.get('/products', (req, res) => {
//   fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
//     res.setHeader('Cache-Control', 'no-cache');
//     res.json(JSON.parse(data));
//   });
// });


module.exports = router;