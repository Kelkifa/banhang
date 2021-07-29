const homeRouter = require('./home');
const adminRouter = require('./admin');
const authRouter = require('./auth');
//midleware
const userInfoMidleware = require('../core/midleware/userInfoMidleware');
const adminAuthMidleware = require('../core/midleware/adminAuth');

function router(app) {
    app.use('/auth', authRouter);
    app.use('/home', userInfoMidleware, homeRouter);
    app.use('/admin', adminAuthMidleware, adminRouter);
    app.use('/', userInfoMidleware, homeRouter);
}

module.exports = router;