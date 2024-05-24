# Bookerya

## Description
Bookerya is a Node.js application that allows users to create and manage a list of books. Users can add new books, edit book details, mark books as read, rate books, and delete books from their list. The application utilizes the Model-View-Controller (MVC) architectural pattern and server-side rendering (SSR) with EJS templates.

 Technologies
- Node.js
- Express.js
- EJS (Embedded JavaScript)
- Express-session
- Body-parser

## Features
- Add Book: Add a new book with title, author, year of publication, genre, and rating.
- Edit Book: Edit the details of an existing book.
- Delete Book: Remove a book from the list.
- Mark as Read: Mark a book as read or unread.
- Book Rating: Rate books from 0 to 10.


## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/milmanart/MVC-books.git
   cd MVC-books
2. Install dependencies:
   ```sh
   npm install
3. Run the application:
   ```sh
   node app.js

## Usage
1. Open your browser and navigate to http://localhost:3000.
2. You will see the home page. Click the "Log In" button to log in and access the book list.
3. Press the button "View Books"
4. On the book list page, you can:
   - View the list of books.
   - Add a new book by clicking the "Add New Book" button.
   - Edit an existing book by clicking the "Edit" button next to the book.
   - Delete a book by clicking the "Delete" button next to the book.
   - Mark a book as read by checking the checkbox in the "Read" column.