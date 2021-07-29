const bcryptHandler = require('../core/bcryptHandler');
const userModel = require('../models/users');

class AuthController {

    /**[GET] /test */

    /** [GET] /auth/admin/login
     * Trang dang nhap de vo trang admin, render ra trang admin/login, layout loginLayout
     * public
    */
    adminLogin(req, res) {
        res.render('admin/login', { layout: 'layouts/loginLayout' });
    }
    /**[POST] /auth/admin/login
     * Kiem tra tai khoan va mat khau, neu dung cho req.session.isAdmin = true
     * public
    */
    async adminLoginCheck(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).redirect('/auth/admin/login?success=false&message=Bad Request');
        try {
            const usernameResponse = await userModel.findOne({ username: username });
            if (!usernameResponse)
                return res.status(400).redirect('/auth/admin/login?success=false&message=Bad Request');
            const bcryptResponse = await bcryptHandler.comparePassword(password, usernameResponse.password)
            if (bcryptResponse.success == false) {
                console.log(bcryptResponse.result);
                return res.status(500).redirect('/auth/admin/login?success=false&message=Internal Server');
            }
            if (bcryptResponse.result == false)
                return res.status(400).redirect('/auth/admin/login?success=false&message=Bad Request');

            req.session.isAdmin = true;
            return res.redirect('/admin');
            // res.redirect('/admin/login?success=false&message=fail');
        }
        catch (err) {
            console.log(err);
            return res.status(500).redirect('/auth/admin/login?success=false&message=Internal Server');
        }
    }
    /**[GET] /auth/admin/logout
     * Dang xuat
     * private
    */
    async adminLogout(req, res) {
        req.session.destroy();
        res.redirect('/auth/admin/login');
    }

    /**[POST] /auth/admin/create
     * Tao mot admin moi
     * private
     */
    async adminCreate(req, res) {
        const { username, password, fullname } = req.body;
        //hash
        const bcryptResponse = await bcryptHandler.hashPassword(password);
        //check hash status
        if (bcryptResponse.success === false) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Internal Server" });
        }
        try {
            const newAdmin = new userModel({ fullname, username, password: bcryptResponse.hash })
            const createdAmin = await newAdmin.save();
            return res.json({ success: true, message: 'Create Admin Successfully' })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }


}

module.exports = new AuthController;