const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { signUp, login } = require('../controller/userController');

router.post('/createuser', [
  body('name').notEmpty().withMessage('Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], signUp);
router.post('/loginuser',[body('email').isEmail().withMessage('Invalid email format'),
body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')], login)

module.exports = router;
