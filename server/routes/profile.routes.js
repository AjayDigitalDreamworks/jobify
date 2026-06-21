const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const handleResumeUpload = require('../middleware/resumeUpload.middleware');
const profileController = require('../controllers/profile.controller');
const validate = require('../middleware/validate.middleware');
const { profileCreateSchema, profileUpdateSchema } = require('../validators/schemas');

const router = express.Router();

router.post('/create', authMiddleware, validate(profileCreateSchema), profileController.createProfile);
router.get('/me', authMiddleware, profileController.getMyProfile);
router.put('/update', authMiddleware, validate(profileUpdateSchema), profileController.updateProfile);
router.post(
  '/resume',
  authMiddleware,
  handleResumeUpload,
  profileController.uploadResume
);

module.exports = router;
