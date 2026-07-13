const express = require('express');
const protect = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { applyForJob, getMyApplications, getApplicationById, updateApplicationStatus, withdrawApplication } = require('../controllers/application.controller');

const router = express.Router();

// Routes for /api/applications
router.post('/apply/:jobId', protect, authorize('jobSeeker'), applyForJob);
router.get('/my', protect, authorize('jobSeeker'), getMyApplications);
router.get('/:id', protect, authorize('jobSeeker'), getApplicationById);
router.patch('/:id/status', protect, authorize('recruiter'), updateApplicationStatus);
router.delete('/:id', protect, authorize('jobSeeker'), withdrawApplication);

module.exports = router;
