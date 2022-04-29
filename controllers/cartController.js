const fs = require('fs');
const path = require('path');

const CART_DATA_FILE = path.join(`${__dirname}/../server-cart-data.json`);


// retrieve all items from the cart storage
exports.getAllCartItems = (req, res, next) => {
    fs.readFile(CART_DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
      });
}

// add a item to cart
exports.addToCart = (req, res, next) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);

    // create a new current item object
    const newCartProduct = { 
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image_tag: req.body.image_tag, 
      quantity: 1 
    };

    // caheck if the cart has the current item exists, if exists just update the quantity, if not, add it to the cart
    let cartProductExists = false;
    cartProducts.map((cartProduct) => {
    if (cartProduct.id === newCartProduct.id) {
      cartProduct.quantity++;
      cartProductExists = true;
    }
    });
    if (!cartProductExists) cartProducts.push(newCartProduct);
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });        
}

// remove a item from cart
exports.removeCartItem = (req, res, next) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === parseInt(req.params.id) && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      } else if (cartProduct.id === parseInt(req.params.id) && cartProduct.quantity === 1) {
        const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === parseInt(req.params.id));
        cartProducts.splice(cartIndexToRemove, 1);
      }
    });
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
}

// remove all items from cart
exports.removeAllCartItems = (req, res, next) => {
  fs.readFile(CART_DATA_FILE, () => {
    let emptyCart = [];
    fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4), () => {
      res.json(emptyCart);
    });
  });
}