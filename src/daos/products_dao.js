const mongoose          = require('mongoose')
const { print }         = require('../helpers/print')
const mongo_url         = require('../config/mongoDB_local_config')
const productSchema     = require('../models/mongoose/product_schema')

class productsDao {
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
            productSchema.create(element)
            mongoose.disconnect()
        }
        else{
            return {'error': 'el item cargado debe ser un objeto'}
        }
    }

    getAll () {
        // Lee el archivo
        this.connectMongoDB()
        const data = productSchema.find({})
        mongoose.disconnect()
        return data
    }

    getLastID(){
        // Busca el ultimo id guardado en el archivo
        this.connectMongoDB()
        const last_id_db = productSchema.find({}, {Id: 1}).sort({Id: -1}).limit(1)
        mongoose.disconnect()
        if (last_id_db) {
            return last_id_db.Id + 1
        }
        return 1
    }

    getByID(id_) {
        // devuelve el item del archivo que coincida con el id dado, o un error si no existe o no hay data
        this.connectMongoDB()
        const product = productSchema.find({Id: id_})
        mongoose.disconnect()
        if (product) {
            return product
        }
        return { 'error': 'Id doesn\'t exist in file or file is empty'}
    }

    updateItem(_id, new_item) {
        // Actualiza la informacion de un elemento con el id dado, solo para products
        if (typeof(new_item) != 'object') {
            return {'error': 'el item cargado debe ser un objeto'}
        }
        this.connectMongoDB()
        const status = productSchema.updateOne({Id: id_}, {
            $set: new_item
        })
        mongoose.disconnect()
        if (status.nModified > 1) {
            return this.getByID(_id)
        }
        return { 'error': 'Id doesn\'t exist in file or file is empty'}
    }

    deleteByID(id_to_delete) {
        // Borra el item del archivo con el id dado
        this.connectMongoDB()
        productSchema.deleteOne({Id: id_to_delete})
        mongoose.disconnect()
    }

    deleteAll() {
        // Borra toda la data del archivo
        this.connectMongoDB()
        productSchema.deleteMany({})
        mongoose.disconnect()
    }

}

module.exports = { productsDao }
