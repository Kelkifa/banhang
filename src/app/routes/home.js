const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

const testMidleware = require('../core/testMidleware');
router.get('/test', testMidleware, HomeController.test);

router.get('/logout', HomeController.logout);
router.post('/login', HomeController.loginStore);
router.get('/login', HomeController.login);
router.get('/products/:id/detail', HomeController.detail);
router.get('/cart/number', HomeController.cartNumber);
router.post('/cart', HomeController.addToCart);
router.get('/cart', HomeController.cart);
router.get('/home', HomeController.index);
router.get('/', HomeController.index);

module.exports = router;