const express = require('express');
const router = express.Router(); // Use express.Router() to create a router
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { User } = require("../models/User");
const { validationResult } = require('express-validator');

const signUp = async (req, res) => {
  try {
      const { name, email, password, location } = req.body;
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      let encryptedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
          name,
          email,
          password: encryptedPassword,
          location
      });
      const token = generateToken(user._id);
      res.json({
          success: true,
          message: "Registered successfully!",
          data: {
              _id: user._id,
              email: user.email,
              name: user.name,
              location: user.location,
              token: token
          }
      });
  } catch (error) {
      res.json({ success: false, message: "User already exist!" });
      console.log(error)
  }
};


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
    
    if (req.body.password !== userData.password) { // Fix typo "req.body.pasword"
      return res.status(400).json({ errors: "Try logging with correct password" });
    }
    
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};




module.exports = { signUp, login };
