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
        genre: req.body.genre,
        readed: false
    };
    Book.addBook(newBook, err => {
        if (err) {
            return res.status(500).send('Error adding book');
        }
        res.redirect('/books');
    });
};

exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    Book.deleteBook(bookId, err => {
        if (err) {
            return res.status(500).send('Error deleting book');
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

exports.getEditBook = (req, res) => {
    const bookId = req.params.id;
    Book.getAllBooks((books, err) => {
        if (err) {
            return res.status(500).send('Error loading book');
        }
        const book = books.find(b => b.id === parseInt(bookId));
        if (book) {
            res.render('edit-book', { book });
        } else {
            res.send('Book not found');
        }
    });
};

exports.postEditBook = (req, res) => {
    const bookId = req.params.id;
    const updatedBook = {
        id: parseInt(bookId),
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
        readed: req.body.readed === 'on' ? true : false
    };
    Book.updateBook(updatedBook, err => {
        if (err) {
            return res.status(500).send('Error updating book');
        }
        res.redirect('/books');
    });
};
