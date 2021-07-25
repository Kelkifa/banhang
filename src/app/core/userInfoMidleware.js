function userInfoMidleware(req, res, next) {
    // console.log("midleware");
    // if (req.session.isAuth) {
    //     res.locals.userInfo = req.session.userInfo;
    //     res.locals.cartNumber = req.session.cartNumber;
    // }
    // // console.log(req.session.userInfo);
    // else {
    //     res.locals.userInfo = "huongle";
    //     res.locals.cartNumber = undefined;
    // }

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