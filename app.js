const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes'); // Убедитесь, что этот файл правильно подключает ваши роуты книг
const isAuthenticated = require('./middleware/auth'); // Мидлвар для проверки аутентификации

const app = express();

// Настраиваем парсер для данных форм
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Настройка движка шаблонов EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Настройка сессий
app.use(session({
    secret: 'your_secret_key',  // Секретный ключ для подписи сессии
    resave: false,              // Не сохранять сессию заново, если она не изменялась
    saveUninitialized: false,   // Не сохранять новые сессии, если они не изменялись
    cookie: {
        secure: false,          // Для работы через HTTPS установите `true`
        httpOnly: true,         // Запрещает доступ к куки через JavaScript на клиенте
        maxAge: 7 * 24 * 60 * 60 * 1000 // Установка максимального возраста куки на одну неделю
    }
}));

// Главная страница
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/books');  // Перенаправление авторизованных пользователей на страницу с книгами
    } else {
        res.render('index', { loggedIn: false });  // Показать страницу входа для неавторизованных пользователей
    }
});

// Маршрут для входа в систему
app.get('/login', (req, res) => {
    req.session.user = { id: 1, username: 'defaultUser' }; // Установка сессии пользователя
    res.redirect('/books');  // Перенаправление на страницу с книгами
});

// Маршрут для выхода из системы
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Failed to logout:", err);
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/');  // Перенаправление на главную страницу
    });
});

// Страница ошибки авторизации
app.get('/not-authorize', (req, res) => {
    res.render('not-authorized');  // Показать страницу "Не авторизован"
});

// Защищенный маршрут для страницы книг
app.use('/books', isAuthenticated, bookRoutes);

// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
