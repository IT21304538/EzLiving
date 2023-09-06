const express = require('express');
const Payment = require('../models/payment')
const{
    createPayment,
    getPays,
    getPay,

}= require('../controllers/paymentController')

const router = express.Router()

//get a single payment 
router.get('/:id',getPay)

//get all payments
router.get('/',getPays)

//create payments
router.post('/',createPayment)

//get user payments
//router.get('/')

module.exports = router

