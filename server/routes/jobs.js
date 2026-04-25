const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');
const { getJobById, jobs } = require('../data/frontendData');

// GET all jobs
router.get('/', (req, res) => {
  res.json({
    message: 'Jobs fetched successfully',
    jobs,
  });
});

router.get('/:id', (req, res) => {
  const job = getJobById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  return res.json({
    message: 'Job fetched successfully',
    job,
  });
});

// POST create a new job
router.post('/', authMiddleware, authorizeRoles('recruiter'), (req, res) => {
  res.status(201).json({
    message: 'Job created successfully',
    data: req.body
  });
});

module.exports = router;
