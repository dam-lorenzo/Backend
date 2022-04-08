const express       = require('express')
const { Router }    = express

//      Global variables

const error_message = {'error': 'ruta no valida'}

//      Router

const router_default   = Router()
router_default.use(express.urlencoded({extended: true}))
router_default.use(express.json())

router_default.get('/', (req, res) => {
    res.json(error_message)
} )

router_default.get('/', (req, res) => {
    res.json(error_message)
} )

router_default.post('/', (req, res) => {
    res.json(error_message)
} )

router_default.put('/', (req, res) => {
    res.json(error_message)
} )

router_default.delete('/', (req, res) => {
    res.json(error_message)
} )

module.exports = { router_default }