function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/not-authorize');
    }
}

module.exports = isAuthenticated;
