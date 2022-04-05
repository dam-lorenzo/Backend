//      Requires
const express               = require('express')
import { print } from "./src/helpers/print.js"
import { router_products } from "./src/controllers/router_products"
import { router_carts } from "./src/controllers/router_carts"

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
