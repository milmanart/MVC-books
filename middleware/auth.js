// middleware/auth.js
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/not-authorize');  // Перенаправление на главную страницу для входа
    }
}

module.exports = isAuthenticated;
