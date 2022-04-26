//      Requires
const express               = require('express')
const { print }             = require("./src/helpers/print")
const { router_products }   = require("./src/controllers/router_products")
const { router_carts }      = require("./src/controllers/router_carts")
const { router_default }    = require("./src/controllers/router_default")

//      Server Config
const app               = express()
const PORT              = 8080
app.use(express.static('Clase_8/public'))

//      Server connection
const server = app.listen( PORT, () => {
    print(`Servidor Express excuchando en el puerto ${server.address().port}`)
} )

server.on('error', error => print(`Error en el servidor ${error}`))

//      Server routes

app.use('/api/products', router_products)

app.use('/api/carts', router_carts)

app.use('*', router_default)
