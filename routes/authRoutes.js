const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validate');
const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validate
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
], login);

module.exports = router;