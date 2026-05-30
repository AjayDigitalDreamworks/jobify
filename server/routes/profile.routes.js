const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.post('/create', authMiddleware, profileController.createProfile);
router.get('/me', authMiddleware, profileController.getMyProfile);
router.put('/update', authMiddleware, profileController.updateProfile);

module.exports = router;
