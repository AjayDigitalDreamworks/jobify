const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
  res.json({ status: 'Backend is running ✅', timestamp: new Date() });
});

module.exports = router;

const authController = require('../controllers/auth-controller');
const { signUpSchema, loginSchema } = require('../validator/auth-validator');
const validate = require('../middlewares/validate-middleware');

router.route('/').get(authController.home); //Route for home page
router.route('/register').post(validate(signUpSchema), authController.register); // Route for user registration
router.route('/login').post(validate(loginSchema), authController.login); // Route for user login
