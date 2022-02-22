const express = require('express')
const router = express.Router()
const retailUsersController  = require('../controllers/test')



router.post('/user/create', retailUsersController.createNewRetailUser)




module.exports = router