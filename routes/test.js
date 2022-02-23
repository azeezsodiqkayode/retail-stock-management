const express = require('express')
const router = express.Router()
const retailUsersController  = require('../controllers/test')
 


router.post('/user/create', retailUsersController.createNewRetailUser)

router.get('/login', retailUsersController.rethailLogin)



module.exports = router