const mongoose      = require('mongoose')
const { print }     = require('../../helpers/print')

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema(  {
                                                products:   {type: Object, require: true},
                                                Id:         {type: String, require: true, max: 5},
                                                timeStamp:  {type: Number, require: true, max: 13}
                                            })

module.exports = mongoose.model(cartsCollection, cartSchema)