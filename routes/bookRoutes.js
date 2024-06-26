const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getBooks);
router.get('/add', booksController.getAddBook);
router.post('/add', booksController.postAddBook);
router.get('/edit/:id', booksController.getEditBook);
router.post('/edit/:id', booksController.postEditBook);
router.post('/delete/:id', booksController.deleteBook);
router.post('/readed/:id', booksController.postToggleReaded);

module.exports = router;
