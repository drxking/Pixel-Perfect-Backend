const Category = require('../models/category.model');

const postCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }
        let pullName = await Category.findOne({ name: name });
        if (pullName) {
            return res.status(400).json({ error: 'Category name must be unique' });
        }
        const category = new Category({
            name,
            description
        });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        let query = req.query.populate === 'true';
        const categories = query ? await Category.find().populate('products') : await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCategoryById = async (req, res) => {
    try {
        let query = req.query.populate === 'true';
        const category = query ? await Category.findById(req.params.id).populate('products') : await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { postCategory, getCategories, getCategoryById };