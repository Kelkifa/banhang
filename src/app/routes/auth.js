const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
//midleware
const adminAuth = require('../core/midleware/adminAuth');

router.get('/admin/login', AuthController.adminLogin);
router.get('/admin/logout', AuthController.adminLogout);
router.post('/admin/login', AuthController.adminLoginCheck);
router.post('/admin/create', adminAuth, AuthController.adminCreate);

module.exports = router;