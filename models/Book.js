const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'books.json');

class Book {
    static getAllBooks(callback) {
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                callback([], err);
            } else {
                try {
                    const books = JSON.parse(fileContent);
                    callback(books);
                } catch (err) {
                    callback([], err);
                }
            }
        });
    }

    static addBook(newBook, callback) {
        Book.getAllBooks((books, err) => {
            if (err) {
                return callback(err);
            }
            newBook.id = books.length + 1;  // Assign next ID
            newBook.rating = newBook.rating || 0;  // Default rating if not specified
            books.push(newBook);
            fs.writeFile(filePath, JSON.stringify(books, null, 2), err => {
                callback(err);
            });
        });
    }

    static updateBook(updatedBook, callback) {
        Book.getAllBooks((books, err) => {
            if (err) {
                return callback(err);
            }
            const index = books.findIndex(b => b.id === parseInt(updatedBook.id));
            if (index !== -1) {
                // Update all properties including rating
                books[index] = { ...books[index], ...updatedBook };
                fs.writeFile(filePath, JSON.stringify(books, null, 2), err => {
                    callback(err);
                });
            } else {
                callback(new Error('Book not found'));
            }
        });
    }

    static toggleReaded(id, callback) {
        Book.getAllBooks((books, err) => {
            if (err) {
                return callback(err);
            }
            const book = books.find(b => b.id === parseInt(id));
            if (book) {
                book.readed = !book.readed;
                fs.writeFile(filePath, JSON.stringify(books, null, 2), err => {
                    callback(err);
                });
            } else {
                callback(new Error('Book not found'));
            }
        });
    }

    static deleteBook(id, callback) {
        Book.getAllBooks((books, err) => {
            if (err) {
                return callback(err);
            }
            const index = books.findIndex(b => b.id === parseInt(id));
            if (index !== -1) {
                books.splice(index, 1);
                fs.writeFile(filePath, JSON.stringify(books, null, 2), callback);
            } else {
                callback(new Error('Book not found'));
            }
        });
    }
}

module.exports = Book;
