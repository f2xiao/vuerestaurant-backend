const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connection = require('./config/database');
const cartRoutes = require('./routes/cartRoutes.js');
const productsRoutes = require('./routes/productsRoutes');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Create the Express application
const app = express();

// set the port number
app.set('port', (process.env.PORT || 3000));

// middlewares to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: process.env['SECRET'],
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


// Middlewares
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Routes
app.use('/cart', cartRoutes);
app.use('/products', productsRoutes);

/**
 * -------------- SERVER ----------------
 */
app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
  