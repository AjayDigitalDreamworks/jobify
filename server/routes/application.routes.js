const express = require('express');
const protect = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { applyForJob, getMyApplications } = require('../controllers/application.controller');

const router = express.Router();

// Routes for /api/applications
router.post('/apply/:jobId', protect, authorize('jobSeeker'), applyForJob);
router.get('/my', protect, authorize('jobSeeker'), getMyApplications);

module.exports = router;
