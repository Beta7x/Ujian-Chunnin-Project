const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');
const categoryController = require('../controllers/categoryController.js');

//  CRUD opertations
router.get('/', bookController.view);
router.post('/', bookController.find);
router.get('/addbook', bookController.index);
router.post('/addbook', bookController.add);
router.get('/editbook/:id', bookController.edit);
router.post('/updatebook/:id', bookController.update);
router.get('/delete/:id', bookController.delete);

router.get('/category', categoryController.view);
router.get('/category/add', categoryController.form);
router.post('/category/add', categoryController.add);
router.get('/category/edit/:id', categoryController.edit);
router.post('/category/update/:id', categoryController.update);
router.get('/category/delete/:id', categoryController.delete);

module.exports = router;