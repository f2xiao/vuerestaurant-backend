const fs = require('fs');
const path = require('path');

const PRODUCT_DATA_FILE = path.join(`${__dirname}/../server-product-data.json`);

// retrieve all items from the products storage
exports.getAllProducts = (req, res, next) => {
    fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
      });
}
