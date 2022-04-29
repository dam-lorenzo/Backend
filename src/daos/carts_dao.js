const mongoose       = require('mongoose')
const { print }      = require('../helpers/print')
const mongo_url      = require('../config/mongoDB_local_config')
const cartSchema     = require('../models/mongoose/cart_schema')

class cartsDao {
    constructor() {
        this.id = this.getLastID()

    }

    connectMongoDB() {
        try {
            const URL       = mongo_url
            const config    =   {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true
                                }
            let res = mongoose.connect(URL, config)
            print('MongoDB server conected')

        } catch (error) {
            print("Cant't reach MongoDB server")
            print(error)
        
        }
    }

    addItem(element){
        // Agrega un item al archivo correspondiente
        if (typeof(element) == 'object'){
            element.Id = this.id
            element.timestamp = Date.now()
            this.id++
            this.connectMongoDB()
            cartSchema.create(element)
            mongoose.disconnect()
        }
        else{
            return {'error': 'el item cargado debe ser un objeto'}
        }
    }

    getAll () {
        // Lee el archivo
        this.connectMongoDB()
        const data = cartSchema.find({})
        mongoose.disconnect()
        return data
    }

    getLastID(){
        // Busca el ultimo id guardado en el archivo
        this.connectMongoDB()
        const last_id_db = cartSchema.find({}, {Id: 1}).sort({Id: -1}).limit(1)
        mongoose.disconnect()
        if (last_id_db) {
            return last_id_db.Id + 1
        }
        return 1
    }

    getByID(id_) {
        // devuelve el item del archivo que coincida con el id dado, o un error si no existe o no hay data
        this.connectMongoDB()
        const product = cartSchema.find({Id: id_})
        mongoose.disconnect()
        if (product) {
            return product
        }
        return { 'error': 'Id doesn\'t exist in file or file is empty'}
    }


    deleteByID(id_to_delete) {
        // Borra el item del archivo con el id dado
        this.connectMongoDB()
        cartSchema.deleteOne({Id: id_to_delete})
        mongoose.disconnect()
    }

    deleteAll() {
        // Borra toda la data del archivo
        this.connectMongoDB()
        cartSchema.deleteMany({})
        mongoose.disconnect()
    }

    getProducts(_id) {
        const cart = this.getByID(_id)
        return cart.products
    }

    addProduct(_id, product) {
        this.connectMongoDB()
        cartSchema.updateOne({Id: _id}, {$push: { product } })
        mongoose.disconnect()
    }

    deleteProduct(_id, id_prod) {
        this.connectMongoDB()
        const status = cartSchema.updateOne({Id: _id}, {$pull: { 'products': { 'Id': id_prod }} })
        mongoose.disconnect()
        if (status.nModified > 0) {
            return this.getByID(_id)
        }
        else {
            return {'error': `El carrito Id${_id} no tiene ningun producto con id${id_prod}`}
        }
    }
}

module.exports = { cartsDao }