const express = require('express');
const { createJob, getAllJobs, getMyJobs, getJobById, updateJob, closeJob, deleteJob } = require('../controllers/job.controller');
const protect = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const router = express.Router();

// Routes for /api/jobs
router.route('/')
  .get(getAllJobs) // GET all jobs (Public)
  .post(protect, authorize('recruiter'), createJob); // POST create a new job (Recruiter only)

router.get('/my-jobs', protect, authorize('recruiter'), getMyJobs); // GET recruiter jobs (Recruiter only)

// Routes for /api/jobs/:id
router.route('/:id')
  .get(getJobById) // GET single job by ID (Public)
  .put(protect, authorize('recruiter'), updateJob) // PUT update a job by ID (Recruiter only, owner only)
  .delete(protect, authorize('recruiter'), deleteJob); // DELETE a job by ID (Recruiter only, owner only)

router.patch('/:id/close', protect, authorize('recruiter'), closeJob); // PATCH close a job by ID (Recruiter only, owner only)

module.exports = router;