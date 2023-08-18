const express = require('express')
const router = express.Router()

const UserController = require('../controller/userController.js')

// router.get('/', UserController.UserList)
router.post('/adduser', UserController.signUp)
// router.post('/updateUser', UserController.updateUser)
// router.post('/deleteUser', UserController.deleteUser)
// router.get('/user', UserController.UserById)

module.exports = router