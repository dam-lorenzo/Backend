const express       = require('express')
const { Router }        = express

//      Routers

const info   = Router()
info.use(express.urlencoded({extended: true}))
info.use(express.json())

info.get('/', (req, res) => {
    const data = {
                    
    }
    res.send('/', data )
} )

module.exports = { info }