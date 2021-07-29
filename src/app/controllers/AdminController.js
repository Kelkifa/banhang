const productModel = require('../models/products');
const orderModel = require('../models/orders');
const userModel = require('../models/users');

class AdminControll {
    /** [GET] /admin
     * Trang admin
     * private
     */
    index(req, res) {
        res.redirect('/admin/databoard');
    }

    /**[GET] /admin/databoard
     * trang admin show bieu do
     * private
     */
    databoard(req, res, next) {
        res.render('admin/index', { layout: 'layouts/adminLayout' });
    }
    /**[GET] /admin/products/create
     * trang admin tao mot san pham moi
     * private
    */
    productCreate(req, res, next) {
        res.render('admin/productsCreate', { layout: 'layouts/adminLayout' });
    }
    /**[GET] /admin/products/table
     * Hien thi du lieu cac san pham duoi dang bang
     * private
     */
    async productTabe(req, res, next) {
        try {
            const response = await productModel.find({});
            res.render('admin/productTable', { layout: 'layouts/adminLayout', response });
        } catch (err) {
            return res.status(500).json({ success: false, message: err })
        }
    }
    /**[GET] /admin/products/:id/update
     * Cap nhat mot product
     * private
     */
    async productUpdate(req, res) {
        try {
            const { id } = req.params;
            const response = await productModel.findOne({ _id: id });
            return res.render('admin/productUpdate', { layout: 'layouts/adminLayout', response });
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
    /**[GET] /admin/products/trash
     * Thung rac chua du lieu da xoa
     * private
     */
    async productTrash(req, res) {
        try {
            const response = await productModel.findDeleted({});
            // /** DEV */
            // const response = [{
            //     _id: "123129038120329138",
            //     name: "Chay cay",
            //     description: "Chau cay hinh groot ve binh dai ngan ha doc la san xuat bang cong nghe in 3d",
            //     cost: "300.000",
            //     img: [],
            //     shapes: [],
            //     colors: [],
            //     shapeLinks: [],
            //     colorLinks: []
            // }];
            return res.render('admin/productTrash', { layout: 'layouts/adminLayout', response });
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
    /**[POST] /admin/products/create
     * Lay du lieu tu admin product create from
     * private
    */
    async productCreateStore(req, res, next) {
        try {
            const { name, description, cost, img, position, shapes, colors, shapeLinks, colorLinks } = req.body;
            const imgArr = img == "" ? [] : img.split('\r\n');
            const shapeArr = shapes == "" ? [] : shapes.split('\r\n');
            const shapeLinkArr = shapeLinks == "" ? [] : shapeLinks.split('\r\n');
            const colorArr = colors == "" ? [] : colors.split('\r\n');
            const colorLinkArr = colorLinks == "" ? [] : colorLinks.split('\r\n');
            const newProduct = new productModel({ name, description, cost, img: imgArr, position, shapes: shapeArr, colors: colorArr, shapeLinks: shapeLinkArr, colorLinks: colorLinkArr });
            await newProduct.save();
            return res.redirect(`/admin/products/create?finish=created&product=${name}`);
        } catch (err) {
            // console.log(err);
            return res.status(500).json({ success: false, message: err })
        }
    }
    /**[PUT] /admin/products/:id/update
     * Cap nhat du lieu cua product trong database
     * private
    */
    async productPostUpdate(req, res) {
        try {
            const { id } = req.params;
            const { name, description, cost, img, position, shapes, colors, shapeLinks, colorLinks } = req.body;
            const imgArr = img.split('\r\n');
            const shapeArr = shapes.split('\r\n');
            const shapeLinkArr = shapeLinks.split('\r\n');
            const colorArr = colors.split('\r\n');
            const colorLinkArr = colorLinks.split('\r\n');
            await productModel.updateOne({ _id: id }, { name, description, cost, img: imgArr, position, shapes: shapeArr, colors: colorArr, shapeLinks: shapeLinkArr, colorLinks: colorLinkArr });
            return res.redirect(`/admin/products/${id}/update?finish=updated&product=${name}`);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err })
        }
    }
    /**[PATCH] /admin/products/:id/restore
     * Khoi phuc du lieu da bi xoa
     * private
    */
    async productRestore(req, res) {
        try {
            const { id } = req.params;
            await productModel.restore({ _id: id });
            return res.redirect('/admin/products/trash');
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
    /**[DELETE] /admin/products/:id/delete
     * Xoa tam thoi product
     * private
     */
    async productDelete(req, res) {
        try {
            const { id } = req.params;
            await productModel.delete({ _id: id });
            return res.redirect('/admin/products/table');
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
    /**[DELETE] /admin/products/:id/forcedelete 
     * Xoa vinh vien product
     * private
    */
    async productForceDelete(req, res) {
        try {
            const { id } = req.params;
            await productModel.deleteOne({ _id: id });
            return res.redirect('/admin/products/trash');

        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
    /**[GET] /admin/orders/table
     * Thong tin cac san pham khach hang da dat
     * private
     */
    async orderTable(req, res) {
        try {
            const response = await orderModel.find().populate('productId');
            console.log(response);
            return res.render('admin/orderTable', { layout: 'layouts/adminLayout', response, success: true });
        } catch (err) {
            return res.status(500).render('admin/orderTable', { layout: 'layouts/adminLayout', response: [], success: false });
        }
    }
    /**[GET] /admin/orders/trash
     * bang danh sach cac san pham da xoa tam thoi
     * private
     */
    async orderTrash(req, res) {
        try {
            const response = await orderModel.findDeleted().populate('productId');
            return res.render('admin/orderTable', { layout: 'layouts/adminLayout', response, success: true });
        } catch (err) {
            return res.status(500).render('admin/orderTable', { layout: 'layouts/adminLayout', response: [], success: false });
        }
    }
    /**[PATCH] /admin/orders/:id/delete
     * xoa tam thoi 1 order
     * private
     */
    async orderDelete(req, res) {
        try {
            const { id } = req.params;
            await orderModel.delete({ _id: id });
            return res.redirect('/admin/orders/trash?success=true');
        } catch (err) {
            console.log(err);
            return res.status(500), json({ success: false, message: err })
        }
    }

    /**[DELETE] /admin/orders/:id/delete
     * xoa vinh vien 1 order
     * private
     */
    async orderForceDelete(req, res) {
        try {
            const { id } = req.params;
            await orderModel.deleteOne({ _id: id });
            return res.redirect('/admin/orders/trash?success=true')
        } catch (err) {
            return res.status(500), json({ success: false, message: err })
        }
    }
    /**[PATCH] /admin/orders/:id/restore 
     * khoi phuc 1 order da xoa
     * private
    */
    async orderRestore(req, res) {
        try {
            const { id } = req.params;
            await orderModel.restore({ _id: id });
            return req.redirect('/admin/ordes/trash?success=true');
        } catch (err) {
            return res.status(500), json({ success: false, message: err })
        }
    }

    /**[GET] /admin/users/table
     * xem danh sach user
     * private
     */
    async userTable(req, res) {
        try {
            const response = await userModel.find({});
            return res.render('admin/userTable', { layout: 'layouts/adminLayout', response });
        } catch (err) {
            return res.status(500).json({ success: false, message: err })
        }
    }
    /**[DELETE] /adin/users/:id/delete 
     * Xoa vinh vien mot nguoi dung
     * private
    */
    async userDelete(req, res) {
        try {
            const { id } = req.params;
            await userModel.deleteOne({ _id: id });
            await orderModel.deleteMany({ _id: id });
            return res.redirect('/admin/users/table?success=true');
        } catch (err) {
            return res.status(500).json({ success: false, message: err })
        }
    }

}

module.exports = new AdminControll;