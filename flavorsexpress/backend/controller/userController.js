const express = require('express');
const router = express.Router(); // Use express.Router() to create a router

// const User = require('../models/User');// Use require for importing modules
const { User } = require("../models/User");
// router.post("/createuser", async (req, res) => {
  // try {
  //   await User.create({
  //     name: "Harshvardhan Deshmukh",
  //     password: "123456",
  //     email: "harhslcked7@gmail.com",
  //     location: "Mumbai"
  //   });
  //   res.json({ success: true });
  // } catch (error) {
  //   console.log(error);
  //   res.json({ success: false });
  // }
// });
// module.exports = router
const signUp = (req, res) => {
  let user = new User ({
    name: "harsh",
    location: "pune",
    email: "harsh@www",
    password: "123456"
  })
  user.save()
  .then(() => {
      res.json({message: 'User added succesfully'
      })
  }).catch(() => {
    res.json ({
      message: 'An error Occured!'
    })
  })
}


 module.exports = {
  signUp,
  // addUser,
  // UserList,
  // UserById,
  // updateUser,
  // deleteUser
}
