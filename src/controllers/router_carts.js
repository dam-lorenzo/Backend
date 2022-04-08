const express       = require('express')
const { Router }    = express
const { Container } = require('apiManager')

//      Global variables
const api = new Container('carts')

//      Routers

const router_carts   = Router()
router_carts.use(express.urlencoded({extended: true}))
router_carts.use(express.json())

router_carts.post('/', (req, res) => {
    const _id = api.addItem({'products': []})
    res.json({'cartId': _id})
} )

router_carts.delete('/:id', (req, res) => {
    const _id = req.body
    res.json(api.deleteByID(_id))
} )

router_carts.get('/:id/products', (req, res) => {
    const _id = req.params.id
    res.json(api.getProducts(_id))
} )

router_carts.post('/:id/products', (req, res) => {
    const _id = req.params.id
    const product = req.body
    res.json(api.addProduct(_id, product))
} )

router_carts.delete('/:id/products/:id_prod', (req, res) => {
    const _id = req.params.id
    const id_prod = req.params.id_prod
    res.json(api.deleteProduct(_id, id_prod))
} )


module.exports = { router_carts }