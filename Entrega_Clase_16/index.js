//      Requires
const express                   = require('express')
const { Server: IOServer }      = require('socket.io')
const { Server: HttpServer }    = require('http')
const { SQLite_manager }        = require(__dirname + '/src/sqlite3_manager')

//      Server Config
const app               = express()
const PORT              = 8080
const httpServer        = new HttpServer(app)
const io                = new IOServer(httpServer)
const sqlite            = new SQLite_manager('prueba')
const tabla_name        = 'messages'
// sqlite.createTable(tabla_name)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
} )

//      Global variables

// const messages = sqlite.getMessages(tabla_name)
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
        console.log('mensaje recibido')
        // sqlite.addMessage(tabla_name, data)
        io.sockets.emit('messages', messages)
    })
})
