const express = require('express')
const router = express.Router()
const {addToStock, generateProductID} = require('../controllers/stock.controllers')

router.post('/add-stock', addToStock)
router.post('/add-product',generateProductID )


module.exports = router