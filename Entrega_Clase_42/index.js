//      Requires
const express                   = require('express')
const { Server: IOServer }      = require('socket.io')
const { Server: HttpServer }    = require('http')
const { SQLite_manager }        = require(__dirname + '/src/sqlite3_manager')
const { products_test }         = require('./routes/products_test')
const { print }                 = require('./helpers/print')
const cookieParser              = require('cookie-parser')
const session                   = require('express-session')
const handlebars                = require('express-handlebars')
const compression               = require('compression')
const pino                      = require('pino')

const yargs = require('yargs/yargs')(process.argv.slice(0))


const args = yargs.alias({
    p: 'port'
}).argv

const FileStore = require('session-file-store')(session)

//      Logger
logger = pino('error.log')
logger.level = 'info'

//      Server Config
const app               = express()
const PORT              = args.port| 8080
const httpServer        = new HttpServer(app)
const io                = new IOServer(httpServer)
const sqlite            = new SQLite_manager('chat')
const tabla_name        = 'messages'
sqlite.createTable(tabla_name)

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine(
    'hbs',
    handlebars.engine({
        extname: "hbs",
        defaultLayout: false,
        layoutsDir: "views/hbs/"
    })
)

app.set('view engine', 'hbs')

//      Global variables

let messages = sqlite.getMessages(tabla_name)
const products = [
                ]

//      Server connection

httpServer.listen( PORT, () => {
    console.log(`Servidor HTTP excuchando en el puerto ${PORT}`)
} )


app.use(
    session({
      store: new FileStore({ path: '../sessions', ttl: 10, retries: 0 }),
      secret: 'secrets',
      resave: true,
      saveUninitialized: true,
    })
  )

app.get('/', auth, (req, res) => {
    res.render('index.hbs', {name: req.session.username})
} )

app.get('/login', (req, res) => {
    res.sendFile('login.html')
})

app.post('/logindata', (req, res) => {
    const username = req.body.username
    req.session.username = username
    res.render('index.hbs', {name: req.session.username})
})

app.get('/info', compression(), (req, res) => {
    const data = {
                    'Argumentos de entrada': args,
                    'Sistema Operativo': process.platform,
                    'Version de node.js': process.version,
                    'Memoria total reservada': process.resourceUsage(),
                    'Path de ejecucion': process.cwd(),
                    'Process ID': process.pid,

    }
    res.send('/', data )
})

app.use((req, res) => {
    logger.warn('Invalid route')
    res.send('Invalid route')
  })

// app.use('/api/products-test', products_test)

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
        sqlite.addMessage(tabla_name, data)
        io.sockets.emit('messages', messages)
    })
})


//      Middlewares

function auth (req, res, next) {
    if (req.session?.username){
        logger.info('login success')
        return next()
    }
    else {
        logger.warn('Invalid Auth')
        res.sendFile('login.html')
    }
}

