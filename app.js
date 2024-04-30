const express = require('express');
const session = require('express-session');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');
const isAuthenticated = require('./middleware/auth');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Главная страница
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/books');  // Перенаправление авторизованных пользователей на страницу книг
    } else {
        res.render('index', { loggedIn: false });  // Показывать страницу для логина
    }
});


// Простой маршрут для входа
app.get('/login', (req, res) => {
    req.session.user = { id: 1, username: 'defaultUser' };  // Установка пользователя в сессию
    res.redirect('/books');  // Перенаправление на страницу книг
});


// Маршрут для выхода
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Failed to logout:", err);
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');  // Убедитесь, что после выхода пользователя перенаправляют на главную страницу
    });
});
app.get('/not-authorize', (req, res) => {
    res.render('not-authorized');
});

app.use('/books', isAuthenticated, bookRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
