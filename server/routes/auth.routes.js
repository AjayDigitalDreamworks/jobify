const express = require('express');

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authRateLimiter = require('../middleware/rateLimit.middleware');

const router = express.Router();

router.get('/', authController.home);
router.post('/register', authRateLimiter, authController.register);
router.post('/login', authRateLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.getUser);

module.exports = router;
