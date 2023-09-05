const express = require('express');
const { orderData, myOrderData } = require('../controller/userController');
const router = express.Router();


router.post('/orderData',orderData)
  
router.post('/myOrderData', myOrderData)

module.exports = router;