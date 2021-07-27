const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');



router.post('/order', HomeController.order);
router.get('/logout', HomeController.logout);
router.post('/login', HomeController.loginStore);
router.get('/login', HomeController.login);
router.get('/products/:id/detail', HomeController.detail);
router.get('/cart/number', HomeController.cartNumber);
router.delete('/cart/:id/delete', HomeController.cartDelete);
router.post('/cart', HomeController.addToCart);
router.get('/cart', HomeController.cart);
router.get('/home', HomeController.index);
router.get('/', HomeController.index);

module.exports = router;