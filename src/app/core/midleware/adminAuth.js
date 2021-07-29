function adminAuth(req, res, next) {
    if (req.session.isAdmin === true) {
        next();
        return;
    }
    return res.redirect('/home');
}

module.exports = adminAuth;