const express = require('express');

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authRateLimiter = require('../middleware/rateLimit.middleware');
const validate = require('../middleware/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/schemas');

const router = express.Router();

router.get('/', authController.home);
router.post('/register', authRateLimiter, validate(registerSchema), authController.register);
router.post('/login', authRateLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.getUser);

module.exports = router;
