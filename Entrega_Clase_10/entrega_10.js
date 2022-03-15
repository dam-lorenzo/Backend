//      Requires
const express           = require('express')
const handlebars        = require('express-handlebars')
const { print }         = require('print')
const { router_hbs }    = require('router_hbs')
const { router_pug }    = require('router_pug')
const { router_ejs }    = require('router_ejs')

//      Server Config
const app               = express()
const PORT              = 8080

//      Global variables


//      Server connection
const server = app.listen( PORT, () => {
    print(`Servidor Express excuchando en el puerto ${server.address().port}`)
} )

server.on('error', error => print(`Error en el servidor ${error}`))

//      View engines
app.set('views', './Entrega_Clase_10/views')

app.engine(
    'hbs',
    handlebars.engine({
        extname: "hbs",
        defaultLayout: false,
        layoutsDir: "views/hbs/"
    })
)

app.set('view engine', 'ejs')
app.set('view engine', 'hbs')
app.set('view engine', 'pug')


//      Routers

app.use('/hbs', router_hbs)
app.use('/pug', router_pug)
app.use('/ejs', router_ejs)
