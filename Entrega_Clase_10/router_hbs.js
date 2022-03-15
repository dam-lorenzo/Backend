const express       = require('express')
const { Router }    = express
const { apiManager} = require('apiManager')

//      Global variables
const api = new apiManager()

//      Routers

const router_hbs   = Router()
router_hbs.use(express.urlencoded({extended: true}))
router_hbs.use(express.json())

router_hbs.get('/products', (req, res) => {
    const items = api.getAll()
    // const items = []
    res.render('hbs/products.hbs', { items })
} )

router_hbs.get('/product', (req, res) => {
    res.render('hbs/product.hbs')
} )

router_hbs.post('/product', (req, res) => {
    const item = req.body
    api.addItem(item)
    res.render('hbs/product.hbs')
} )


module.exports = { router_hbs }