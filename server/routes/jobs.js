const express = require('express');
const router = express.Router();

// GET all jobs
router.get('/', (req, res) => {
  res.json({
    message: 'Jobs endpoint is working',
    jobs: []
  });
});

// POST create a new job
router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Job created successfully',
    data: req.body
  });
});

module.exports = router;
