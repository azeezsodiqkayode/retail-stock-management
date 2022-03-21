const express = require('express')
const router = express.Router()
const {adminLogin, attendantLogin, startAdminForgetPassword,
        startAttendantForgetPassword, completeAdminForgetPassword,
        completeAttendantForgetPassword}  = require('../controllers/auth.controllers')



router.post('/admin/login', adminLogin)

router.post('/attendant/login', attendantLogin)

router.get('/admin/start-forget-password/:email', startAdminForgetPassword)

router.get('/attendant/start-forget-password/:email', startAttendantForgetPassword)

router.patch('/admin/complete-forget-password/:hash', completeAdminForgetPassword )

router.patch('/attendant/complete-forget-password/:hash', completeAttendantForgetPassword )




module.exports = router
