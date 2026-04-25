const express = require('express');
const { frontendData } = require('../data/frontendData');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Frontend bootstrap data loaded successfully',
    data: frontendData,
  });
});

module.exports = router;
