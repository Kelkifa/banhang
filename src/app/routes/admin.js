const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

//user
router.delete('/users/:id/delete', AdminController.userDelete);
router.get('/users/table', AdminController.userTable);
//order
router.patch('/orders/:id/restore', AdminController.orderRestore);
router.delete('/orders/:id/delete', AdminController.orderForceDelete);
router.patch('/orders/:id/delete', AdminController.orderDelete);
router.get('/orders/trash', AdminController.orderTrash);
router.get('/orders/table', AdminController.orderTable);
//product
router.patch('/products/:id/restore', AdminController.productRestore);
router.delete('/products/:id/forcedelete', AdminController.productForceDelete);
router.delete('/products/:id/delete', AdminController.productDelete);
router.put('/products/:id/update', AdminController.productPostUpdate);
router.post('/products/create', AdminController.productCreateStore);
router.get('/products/trash', AdminController.productTrash);
router.get('/products/table', AdminController.productTabe);
router.get('/products/:id/update', AdminController.productUpdate);
router.get('/products/create', AdminController.productCreate);

//index
router.get('/databoard', AdminController.databoard);
router.get('/', AdminController.index);

module.exports = router;