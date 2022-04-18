//      Requires
const express                   = require('express')
const { Server: IOServer }      = require('socket.io')
const { Server: HttpServer }    = require('http')
const { SQLite_manager }        = require(__dirname + '/src/sqlite3_manager')
const { mariaDB_manager }        = require(__dirname + '/src/mariadb_manager')

//      Server Config
const app               = express()
const PORT              = 8080
const httpServer        = new HttpServer(app)
const io                = new IOServer(httpServer)
const sqlite            = new SQLite_manager('chat')
const table_messages_name        = 'messages'
sqlite.createTable(table_messages_name)

const mariaDB = new mariaDB_manager()
const table_products = 'products'
mariaDB.createTable(table_products)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
} )

//      Global variables

let messages = sqlite.getMessages(table_messages_name)
const products = mariaDB.getItems(table_products)

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
        products.push(item)
        mariaDB.addItem(table_products, item)
        io.sockets.emit('items', products)
    })

    socket.on('new-message', (data) => {
        messages.push(data)
        console.log('mensaje recibido')
        sqlite.addMessage(table_messages_name, data)
        io.sockets.emit('messages', messages)
    })
})
