const Book = require('../models/Book');

exports.getBooks = (req, res) => {
    Book.getAllBooks((books, err) => {
        if (err) {
            return res.status(500).send('Failed to load books');
        }
        res.render('books', { books });
    });
};

exports.getAddBook = (req, res) => {
    res.render('add-book');
};

exports.postAddBook = (req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        readed: false
    };
    Book.addBook(newBook, err => {
        if (err) {
            return res.status(500).send('Error adding book');
        }
        res.redirect('/books');
    });
};

exports.postToggleReaded = (req, res) => {
    const bookId = req.params.id;
    Book.toggleReaded(bookId, err => {
        if (err) {
            return res.status(500).send('Error updating book status');
        }
        res.redirect('/books');
    });
};
