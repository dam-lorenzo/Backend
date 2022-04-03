//      Requires
const express                   = require('express')
const { Server: IOServer }      = require('socket.io')
const { Server: HttpServer }    = require('http')

//      Server Config
const app               = express()
const PORT              = 8080
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
const httpServer        = new HttpServer(app)
const io                = new IOServer(httpServer)

app.use('/', (req, res) => {
    res.sendFile('index.html')
} )

//      Global variables
const messages = []
const products = [{name: 'Notebook', price: '700'}]

//      Server connection

httpServer.listen( PORT, () => {
    console.log(`Servidor HTTP excuchando en el puerto ${PORT}`)
} )

//      Socket

io.on('connection', (socket) => {
    console.log('User connected')
    socket.emit('items', products)
    socket.on('item', (data) => {   
        products.push(data)
        io.sockets.emit('items', products)
    } )
    socket.emit('messages', messages)
    socket.on('new-message', (message) => {
        messages.push(message)
        io.sockets.emit('messages', messages)
    } )
    
})