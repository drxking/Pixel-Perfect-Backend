const express = require('express');
const Router = express.Router();

const { postCategory, getCategories, getCategoryById } = require('../controllers/category.controller');

Router.post('/', postCategory);

Router.get('/', getCategories);

Router.get('/:id', getCategoryById);

module.exports = Router;