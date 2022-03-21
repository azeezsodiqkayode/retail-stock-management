const express = require('express')
const router = express.Router()
const {createAttendantUser}  = require('../controllers/attendant.controllers')

 


router.post('/attendant/create', createAttendantUser)





module.exports = router