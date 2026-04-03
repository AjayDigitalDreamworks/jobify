const express = require('express');
const router = express.Router();
const { home, register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Home route
router.get('/', home);

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, getUser);

module.exports = router;
