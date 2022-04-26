const express       = require('express')
const { Router }    = express
const { Container } = require("../helpers/api_manager")

//      Global variables

const api = new Container('products')
let is_admin = false

//      Router

const router_products   = Router()
router_products.use(express.urlencoded({extended: true}))
router_products.use(express.json())

router_products.get('/', (req, res) => {
    res.json(api.getAll())
} )

router_products.get('/:id', (req, res) => {
    const _id = req.params.id
    res.json(api.getByID(_id))
} )

router_products.post('/', (req, res) => {
    const item = req.body
    if ('admin' in item){
        is_admin = true
        delete item.admin
    }
    if (is_admin){
        const missing_keys = validateItem(item)
        console.log(missing_keys.length > 0)
        const cond = missing_keys.length > 0
        // if (missing_keys.lenght > 0) {   // Por alguna razon esta condicion se evalua siempre como false y me va siempre al else. Por eso termine usando el cond
        if (cond) {
            res.json({'error': `el item cargado no tiene la key ${missing_keys.join(', ')}`})
        }
        else {
            res.json(api.addItem(item))
        }
    }
    else {
        res.json({'error': -2, 'description': "ruta '/api/products/' metodo POST no autorizada"})
    }
    is_admin = false
} )

router_products.put('/:id', (req, res) => {
    const new_item = req.body
    if ('admin' in new_item){
        is_admin = true
        delete new_item.admin
    }
    if (is_admin){
        const _id = req.params.id
        res.json(api.updateItem(_id, new_item))
    }
    else {
        res.json({'error': -2, 'description': "ruta '/api/products/:id' metodo PUT no autorizada"})
    }
    is_admin = false  
} )

router_products.delete('/:id', (req, res) => {
    const body = req.body
    if ('admin' in body){
        is_admin = true
        delete body.admin
    }
    if (is_admin){
        const _id = req.params.id
        res.json(api.deleteByID(_id))
    }
    else {
        res.json({'error': -2, 'description': "ruta '/api/products/:id' metodo DELETE no autorizada"})
    }
    is_admin = false 
} )

//      Helpers

function validateItem(item){
    const keys = ['name', 'description', 'code', 'image', 'price', 'stock']
    const missing_keys = []
    for (let key of keys) {
        if (!(key in item)) {
            missing_keys.push(key)
        }
    }
    return missing_keys
}


module.exports = { router_products }