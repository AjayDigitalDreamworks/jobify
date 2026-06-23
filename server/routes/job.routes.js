const express = require('express');
const { createJob, getAllJobs, getJobById } = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware'); // Assuming protect middleware exists
const { authorize } = require('../middleware/role.middleware'); // Assuming authorize middleware exists

const router = express.Router();

// Routes for /api/jobs
router.route('/')
  .get(getAllJobs) // GET all jobs (Public)
  .post(protect, authorize('recruiter'), createJob); // POST create a new job (Recruiter only)

// Routes for /api/jobs/:id
router.route('/:id').get(getJobById); // GET single job by ID (Public)

module.exports = router;