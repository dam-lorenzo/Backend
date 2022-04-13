//      Requires
const express                   = require('express')
const { Server: IOServer }      = require('socket.io')
const { Server: HttpServer }    = require('http')

//      Server Config
const app               = express()
const PORT              = 8080
const httpServer        = new HttpServer(app)
const io                = new IOServer(httpServer)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
} )

//      Global variables

const messages = []
const products = [
                    // {name: 'Notebook', price: '700'}
                ]

//      Server connection

httpServer.listen( PORT, () => {
    console.log(`Servidor HTTP excuchando en el puerto ${PORT}`)
} )

//      Socket

io.on('connection', (socket) => {
    console.log('new user connected')
    socket.emit('messages', messages)
    socket.emit('items', products)
    socket.on('item', (item) => {
    console.log(item)
        products.push(item)
        io.sockets.emit('items', products)
    })

    socket.on('new-message', (data) => {
        messages.push(data)
        io.sockets.emit('messages', messages)
    })
})
