const homeRouter = require('./home');
const adminRouter = require('./admin');
//midleware
const userInfoMidleware = require('../core/userInfoMidleware');

function router(app) {
    app.use('/home', userInfoMidleware, homeRouter);
    app.use('/admin', adminRouter);
    app.use('/', userInfoMidleware, homeRouter);
}

module.exports = router;