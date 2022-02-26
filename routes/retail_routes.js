const express = require('express')
const router = express.Router()
const retailUsersController  = require('../controllers/retail_controllers')
 


router.post('/user/create', retailUsersController.createNewRetailUser)

router.post('/user/login', retailUsersController.rethailLogin)

  


module.exports = router