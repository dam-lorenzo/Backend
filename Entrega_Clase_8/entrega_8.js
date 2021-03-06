//      Requires
const express       = require('express')
const { print }     = require('print')
const { router_products } = require('router_products')

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
