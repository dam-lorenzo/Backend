const mongoose = require('mongoose')

const productsCollection = 'products'

const productSchema = new mongoose.Schema(  {
                                                name:           {type: String, require: true, max: 100},
                                                description:    {type: String, require: true, max: 300},
                                                price:          {type: Number, require: true, max: 9000},
                                                url:            {type: String, require: true, max: 100},
                                                stock:          {type: Number, require: true, max: 4},
                                                code:           {type: String, require: true, max: 7},
                                                Id:             {type: String, require: true, max: 9999},
                                                timeStamp:      {type: Number, require: true, max: 9999}
                                            })

module.exports = mongoose.model(productsCollection, productSchema)