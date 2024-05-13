const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');
const isAuthenticated = require('./middleware/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('index', { loggedIn: true });
    } else {
        res.render('index', { loggedIn: false });
    }
});

app.get('/login', (req, res) => {
    req.session.user = { id: 1, username: 'defaultUser' };
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Failed to logout:", err);
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');
    });
});

app.get('/not-authorize', (req, res) => {
    res.render('not-authorized');
});

app.use('/books', isAuthenticated, bookRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
