//      Requires
const express       = require('express')
const { Router }    = express
const { print }     = require('print')
const { apiManager} = require('apiManager')

//      Server Config
const app               = express()
const PORT              = 8080
const router_products   = Router()
router_products.use(express.urlencoded({extended: true}))
router_products.use(express.json())
app.use(express.static('Clase_8/public'))

//      Global variables
const api = new apiManager()

//      Server connection
const server = app.listen( PORT, () => {
    print(`Servidor Express excuchando en el puerto ${server.address().port}`)
} )

server.on('error', error => print(`Error en el servidor ${error}`))

app.use('/api/products', router_products)

//      Routers

router_products.get('/', (req, res) => {
    res.json(api.getAll())
} )

router_products.get('/:id', (req, res) => {
    const _id = req.params.id
    res.json(api.getByID(_id))
} )

router_products.post('/', (req, res) => {
    const item = req.body
    res.json(api.addItem(item))
} )

router_products.put('/:id', (req, res) => {
    const _id = req.params.id
    const new_item = req.body
    res.json(api.updateItem(_id, new_item))
} )

router_products.delete('/:id', (req, res) => {
    const _id = req.params.id
    res.json(api.deleteItem(_id))
} )