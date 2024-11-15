const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const { ensureAuth } = require('../middleware/auth');

router.get('/', homeController.getHome);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);

module.exports = router;
