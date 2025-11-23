const express = require('express');
const Router = express.Router();

const { postCategory, getCategories, getCategoryById } = require('../controllers/category.controller');
const Category = require('../models/category.model'); // adjust path/name if your model differs

Router.get("/search", async (req, res) => {
    console.log("Search query:", req.query);
    try {
        const { query } = req.query;
        console.log(query);


        // If no search text, return empty array
        if (!query) {
            return res.json([]);
        }

        const categories = await Category.find({
            name: { $regex: query, $options: "i" }, // i = case-insensitive
        });

        res.json(categories);
    } catch (error) {
        console.error("Search route error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

Router.post('/', postCategory);

Router.get('/', getCategories);

Router.get('/:id', getCategoryById);


module.exports = Router;