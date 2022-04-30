const express = require('express');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cartRoutes.js');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Routes
app.use('/cart', cartRoutes);
app.use('/products', productsRoutes);

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
  