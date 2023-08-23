const express = require('express');
const router = express.Router(); // Use express.Router() to create a router
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { User } = require("../models/User");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret =  "MyNameIsHarshIAmToG"

const signUp = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // If validation passes, create and save the user
    const user = new User({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: secPassword
    });

    user.save()
      .then(() => {
        res.json({ message: 'User added successfully' });
      })
      .catch(() => {
        res.json({ message: 'An error occurred while saving the user' });
      });
  } catch (error) {
    console.log(error);
    res.json({ message: 'An error occurred' });
  }
};

module.exports = signUp;



const login = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let email = req.body.email;

  try {
    let userData = await User.findOne({ email: email }); // Pass an object as filter
    if (!userData) {
      return res.status(400).json({ errors: "Try logging with correct email" });
    }
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
    if (!pwdCompare) { 
      return res.status(400).json({ errors: "Try logging with correct password" });
    }
    
    const data = {
      user: {
        id: userData.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret)
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};




module.exports = { signUp, login };
