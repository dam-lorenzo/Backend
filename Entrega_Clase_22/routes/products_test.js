const express       = require('express')
const { Router }        = express
const { apiManager}     = require('apiManager')
const { productsMock }  = require('../mocks/products')

//      Global variables
const api = new apiManager()

//      Routers

const router_test   = Router()
router_test.use(express.urlencoded({extended: true}))
router_test.use(express.json())

router_test.get('/', (req, res) => {
    const items = productsMock(5)
    res.render('ejs/products.ejs', { items })
} )

module.exports = { router_test }