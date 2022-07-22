const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');
const categoryController = require('../controllers/categoryController.js');

//  CRUD opertations
router.get('/', bookController.view);
router.post('/', bookController.find);
router.get('/add', bookController.add);

module.exports = router;