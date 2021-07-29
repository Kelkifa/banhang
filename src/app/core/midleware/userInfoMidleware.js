function userInfoMidleware(req, res, next) {
    if (req.session.flag) {
        res.locals.cartNumber = req.session.cartNumber;
    }
    else {
        req.session.flag = true;
        res.locals.cartNumber = undefined;
    }
    next();

}

module.exports = userInfoMidleware;