const express       = require('express')
const { Router }    = express
const { apiManager} = require('apiManager')

//      Global variables
const api = new apiManager()

//      Routers

const router_pug   = Router()
router_pug.use(express.urlencoded({extended: true}))
router_pug.use(express.json())

router_pug.get('/products', (req, res) => {
    const items = api.getAll()
    res.render('pug/products.pug', { items })
} )

router_pug.get('/product', (req, res) => {
    res.render('pug/product.pug')
} )

router_pug.post('/product', (req, res) => {
    const item = req.body
    api.addItem(item)
    res.render('pug/product.pug')
} )


module.exports = { router_pug }