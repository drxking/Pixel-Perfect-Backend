const express = require('express');
const Router = express.Router();
const Product = require('../models/product.model');
let { uploadProductImage } = require('../config/multer');
const { postProduct, getProductBYId, updateProduct, deleteProduct } = require('../controllers/product.controller');




// Create a new product
Router.post('/', uploadProductImage, postProduct);


// GET /products?page=1&limit=10
Router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        let query = req.query.populate === 'true';
        // Convert to numbers
        page = Number(page);
        limit = Number(limit);

        const skip = (page - 1) * limit;

        const productsQuery = Product.find().skip(skip).limit(limit);
        if (query) productsQuery.populate('category');

        const [products, total] = await Promise.all([
            productsQuery.exec(),
            Product.countDocuments(),
        ]);

        res.json({
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            products,
        });
    } catch (error) {
        console.error("Pagination error:", error);
        res.status(500).json({ message: "Server error" });
    }
});





// Get a product by ID
Router.get('/:id', getProductBYId);

// Update a product by ID
Router.put('/:id', updateProduct);

// Delete a product by ID
Router.delete('/:id', deleteProduct);


module.exports = Router;