const express = require('express');
const { LoginController } = require('../controllers/auth.controller');

let router = express.Router();

// Sample route for user authentication
router.post('/login', LoginController);



module.exports = router;    