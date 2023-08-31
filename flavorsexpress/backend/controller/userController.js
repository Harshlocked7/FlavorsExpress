const express = require('express');
const router = express.Router(); // Use express.Router() to create a router
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { User } = require("../models/User");
const order = require('../models/Orders')
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

// module.exports = signUp;



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

// const orderData =  async(req, res) => {
  
//  let data = req.body.order_data
//   await data.splice(0, 0, {Order_data: req.body.order_data})
//   let eID = await order.findOne({'email': req.body.email})
//   console.log(eID)
//   if (eID === null){
//       try {
//           await order.create({
//               email: req.body.email,
//               order_data: [data]
//           }).then (() => {
//               res.json({success: true})
//           })
//       } catch (error) {
//           console.log(error.message)
//           res.send("Server Error", error.message)
//       }
//   }
//   else {
//       try {
//           await order.findOneAndUpdate({email: req.body.email},
//               {$push: {order_data: data }}).then (() => {
//                   res.json({success: true})
//               })
//       } catch (error) {
//           res.send ("Server Error", error.message)
//       }
//   }
// }

// const orderData = async (req, res) => {
//   let data = req.body.order_data;
//   // data.unshift({
//   //   Order_data: { /* ... */ }
//   // });
//   let eID = await order.findOne({ 'email': req.body.email });
//   console.log(eID);
//   if (eID === null) {
//     try {
//       await order.create({
//         email: req.body.email,
//         order_data: [data],
//         order_date: req.body.order_date  // Store the order_date in the database
//       }).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Server Error: " + error.message);
//     }
//   } else {
//     try {
//       await order.findOneAndUpdate(
//         { email: req.body.email },
//         {
//           $push: { order_data: data },
//           $set: { order_date: req.body.order_date }  // Update the order_date
//         }
//       ).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       res.status(500).send("Server Error: " + error.message);
//     }
//   }
// };

const orderData = async (req, res) => {
  try {
    const data = [...req.body.order_data];  // Create a shallow copy of the array
     data.unshift({
  //   Order_data: { /* ... */ }
  });

    const userEmail = req.body.email;
    const orderDate = new Date();  // Use the current date as the order_date

    let existingOrder = await order.findOne({ 'email': userEmail });

    if (existingOrder === null) {
      await order.create({
        email: userEmail,
        order_data: data,
        order_date: orderDate
      });
    } else {
      await order.findOneAndUpdate(
        { email: userEmail },
        {
          $push: { order_data: data },
          $set: { order_date: orderDate }
        }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error: " + error.message);
  }
};



// module.exports = orderData;
module.exports = { signUp, login, orderData };
