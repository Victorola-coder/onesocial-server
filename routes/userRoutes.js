const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const router = express.Router();

router.get('/profile', getProfile);
router.put('/profile', [
  body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().withMessage('Must be a valid email address'),
  validate
], updateProfile);

module.exports = router;