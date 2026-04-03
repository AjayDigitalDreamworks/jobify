const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

module.exports = router;
