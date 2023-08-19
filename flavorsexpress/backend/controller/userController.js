const express = require('express');
const router = express.Router(); // Use express.Router() to create a router
const { User } = require("../models/User");
const { validationResult } = require('express-validator');

const signUp = (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation passes, create and save the user
  let user = new User({
    name: req.body.name,
    location: req.body.location,
    email: req.body.email,
    password: req.body.password
  });

  user.save()
    .then(() => {
      res.json({ message: 'User added successfully' });
    })
    .catch(() => {
      res.json({ message: 'An error occurred while saving the user' });
    });
};

const login =async (req, res) => {
  let email = req.body.email
  try {
    await User.findOne(email);
  
};



module.exports = { signUp };
