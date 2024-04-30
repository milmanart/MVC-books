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
            newBook.id = books.length + 1;
            books.push(newBook);
            fs.writeFile(filePath, JSON.stringify(books, null, 2), err => {
                callback(err);
            });
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
}

module.exports = Book;
