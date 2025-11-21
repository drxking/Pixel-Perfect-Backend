const express = require('express');
const Router = express.Router();
const Product = require('../models/product.model');
let { uploadProductImage } = require('../config/multer');
const { postProduct, getAllProducts, getProductBYId, updateProduct, deleteProduct } = require('../controllers/product.controller');




// Create a new product
Router.post('/', uploadProductImage, postProduct);

// Get all products
Router.get('/',getAllProducts);

// Get a product by ID
Router.get('/:id',getProductBYId );

// Update a product by ID
Router.put('/:id', updateProduct);

// Delete a product by ID
Router.delete('/:id',deleteProduct);


module.exports = Router;