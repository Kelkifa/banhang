require('dotenv').config();
const productModel = require('../models/products');
const orderModel = require('../models/orders');
const userModel = require('../models/users');
const cartModel = require('../models/carts');;
//google auth
const { OAuth2Client } = require('google-auth-library');

class HomeController {
    /**[GET] 
     * Test chuc nang
     * public
    */
    test(req, res) {
        res.send(`userTest: ${req.session.userTest}.`);
    }
    /** [GET] /home  or /
     * Show danh sach cach san pham dang co
     * public
    */
    async index(req, res) {
        try {
            const response = await productModel.find();
            return res.render("home/index", { response, success: true });
        } catch (err) {
            return res.status(500).render("home/index", { response: [], success: false });
        }
    }
    /**[GET] /products/:id/detail
     * Show chi tiết về sản phẩm
     * public
     */
    async detail(req, res) {
        try {
            const { id } = req.params;
            const response = await productModel.findOne({ _id: id });
            return res.render("home/detail", { response, success: true, message: "Get data sucessfully" });
        } catch (err) {
            return res.status(500).render("home/detail", { response: null, success: false, message: err })
        }
    }
    /**[GET] /cart
     * gio hang cua nguoi dung
     * public
     */
    async cart(req, res) {
        const { success, cartId } = req.query;
        // console.log(success, cartId);
        try {
            const response = await cartModel.find({ userId: req.session.id }).populate('productId').sort({ updatedAt: 'desc' });
            const tickedProduct = success == 'true' ? cartId : undefined;
            // return res.json({ success: true, message: 'a' });
            return res.render("home/cart", { response, tickedProduct });
        } catch (err) {
            console.log(err);
            return res.status(500).render("home/cart", { response: [], success: false, message: err })
        }
    }
    /**[GET] /cart/number
     * lay so luong san pham da them vao gio
     * public
    */
    async cartNumber(req, res) {
        try {
            const response = await cartModel.find({ userId: req.session.userInfo }).select('_id');
            const cartNumber = response.length;
            return res.json({ success: true, message: 'Successfully', cartNumber });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Internal Server", cartNumber: 0 })
        }
    }

    /**[POST] /cart 
     * nguoi dung nhan them san pham vao gio hang
     * public
    */
    async addToCart(req, res) {
        const { productId, soLuong, shape, color, buyNow } = req.body;
        if (!productId || !soLuong || !shape || !color) {
            if (buyNow == "true") {
                return res.status(400).redirect('back');
            }
            return res.status(400).json({ success: false, message: 'Bad Request' });

        }
        try {
            //kiem tra san pham hop le
            const productRequest = await productModel.findOne({ _id: productId });
            if (!productRequest) return res.status(400).json({ success: false, message: 'Bad Request' });
            if (!productRequest.shapes.includes(shape) || !productRequest.colors.includes(color)) return res.status(400).json({ success: false, message: 'Bad Request' });
            //luu cart
            const newCart = new cartModel({ userId: req.session.id, soLuong, color, shape, productId });
            const responseNewCart = await newCart.save();

            const cartResponse = await cartModel.find({ userId: req.session.id });
            req.session.cartNumber = cartResponse.length;
            //Press buy now buttom
            if (buyNow == "true")
                return res.redirect(`/cart?buy=true&cartId=${responseNewCart._id}&success=true`);
            //Press add to cart buttom
            return res.json({ success: true, message: 'Add to Cart Successfully', selectedProducts: cartResponse.length });

        } catch (err) {
            console.log(err);
            //Press buy now buttom
            if (buyNow == "true")
                return res.status(500).redirect('/cart?success=false&message=InternalServer');
            //Press add to cart buttom
            return res.status(500).json({ success: false, message: 'Internal Server' });
        }
    }
    /**[DELETE] /cart/:id/delete
     * Xoa vinh vien 1 cart
     * public
     */
    async cartDelete(req, res) {
        const { id } = req.params;
        if (id === undefined) return res.status(400).redirect('/cart?status=BadRequest');
        try {
            await cartModel.deleteOne({ _id: id });
            req.session.cartNumber = req.session.cartNumber - 1;
            return res.redirect('/cart?status=success');
        } catch (err) {
            console.log(err);
            return res.status(500).redirect('/cart?status="InternalServer');
        }
    }

    /**[POST] /order
     * Tao 1 order
     * public
     */
    async order(req, res) {
        console.log(req.body);
        return res.json({ success: true, message: 'Order' });
    }
    /**[GET] /login 
     * render ra trang login
     * public
    */
    login(req, res) {
        res.redirect('back');
        // res.render('home/login', { layout: 'layouts/loginLayout' });
    }

    /**[POST] /login
     * luu du lieu nguoi dung
     * public
    */
    async loginStore(req, res) {
        try {
            /** GOOGLE LOGIN */
            // const CLIENT_ID = process.env.CLIENT_ID;
            // const token = req.body.token;
            // const client = new OAuth2Client(CLIENT_ID);
            // const ticket = await client.verifyIdToken({
            //     idToken: token,
            //     audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // });
            // const payload = ticket.getPayload();
            // const userid = payload['sub'];

            // const { name, email, picture } = payload;

            // //lay id cua nguoi dung trong userModel
            // const checkUser = await userModel.findOne({ email: email });
            // var userInfo = undefined;
            // if (!checkUser) {
            //     const newUser = new userModel({ name, email, picture, userid });
            //     savedUser = await newUser.save();
            //     userInfo = savedUser;
            // }
            // else {
            //     userInfo = checkUser;
            // }
            // //lay so luong san pham trong gio hang
            // const cartResponse = await cartModel.find({ userId: userInfo._id }).select('_id');
            // req.session.cartNumber = cartResponse.length;
            // req.session.isAuth = true;
            // req.session.userInfo = userInfo;

            /** NO LOGIN */

            return res.json({ success: true, message: "login successfully" });

        } catch (err) {
            // console.log(err);
            // req.session.isAuth = false;
            // req.session.userId = "";
            return res.status(500).json({ success: false, message: "Internal Server" });
        }
    }
    /**[GET] /logout
     * logout
     * public
     */
    logout(req, res) {
        req.session.destroy();
        res.redirect('back');
    }
}

module.exports = new HomeController;
