const express = require('express');
const { orderData } = require('../controller/userController');
const router = express.Router();


router.post('/orderData',orderData)
  
   

module.exports = router;