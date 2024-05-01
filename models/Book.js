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
        this.getAllBooks((books, err) => {
            if (err) {
                return callback(err);
            }
            // Генерация нового ID с проверкой максимального значения ID в существующем массиве
            const nextId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
            // Добавление поля genre и установка readed в false по умолчанию
            const bookToAdd = { ...newBook, id: nextId, readed: false, genre: newBook.genre };

            books.push(bookToAdd);
            fs.writeFile(filePath, JSON.stringify(books, null, 2), err => {
                callback(err);
            });
        });
    }

    static toggleReaded(id, callback) {
        this.getAllBooks((books, err) => {
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
        this.getAllBooks((books, err) => {
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
