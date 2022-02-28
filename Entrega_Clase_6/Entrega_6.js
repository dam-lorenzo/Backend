const express = require('express')
const { print } = require('print')
const { Container } = require('container')
const { randomNumber } = require('randomNumber')

const app = express()
const PORT = 8080
const file = new Container('productos')

const server = app.listen( PORT, () => {
    print(`Servidor Express excuchando en el puerto ${server.address().port}`)
} )

server.on('error', error => print(`Error en el servidor ${error}`))

app.get('/productos', (req, res) => {
    res.send(file.getAll())
})

app.get('/productoRandom', (req, res) => {
    res.send(file.getByID(randomNumber(5)))
})

