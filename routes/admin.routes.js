const express = require('express')
const router = express.Router()
const {createAdminUser}  = require('../controllers/admin.controllers')
const {adminLogin} = require('../controllers/auth.controllers')
 


router.post('/admin/create', createAdminUser)

router.post('/admin/login', adminLogin)




module.exports = router