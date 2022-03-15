const express       = require('express')
const { Router }    = express
const { apiManager} = require('apiManager')

//      Global variables
const api = new apiManager()

//      Routers

const router_ejs   = Router()
router_ejs.use(express.urlencoded({extended: true}))
router_ejs.use(express.json())

router_ejs.get('/products', (req, res) => {
    const items = api.getAll()
    res.render('ejs/products.ejs', { items })
} )

router_ejs.get('/product', (req, res) => {
    res.render('ejs/product.ejs')
} )

router_ejs.post('/product', (req, res) => {
    const item = req.body
    api.addItem(item)
    res.render('ejs/product.ejs')
} )


module.exports = { router_ejs }