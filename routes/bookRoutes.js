const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getBooks);
router.get('/add', booksController.getAddBook);
router.post('/add', booksController.postAddBook);
router.post('/readed/:id', booksController.postToggleReaded);

module.exports = router;
