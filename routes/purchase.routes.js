const express = require('express')
const router = express.Router()
const {purchaseList} = require('../controllers/purchase.controllers')

router.post('/purchase', purchaseList )


module.exports = router