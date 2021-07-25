function testMidleware(req, res, next) {
    if (req.session.userTest !== undefined) {
        req.session.userTest = req.session.userTest + 1;
    }
    else {
        req.session.userTest = 1;
    }
    next();
}

module.exports = testMidleware;