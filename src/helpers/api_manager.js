const fs = require('fs')

class Container {
    constructor(file_name){
        this.file_name = `./files/${file_name}.txt`
        this.id = this.getLastID()
    }
    
    
    addItem(element){
        // Agrega un item al archivo correspondiente
        if (typeof(element) == 'object'){
            const missing_keys = this.validateItem(element)
            if (missing_keys.lenght > 0) {
                return {'error': `el item cargado no tiene la key ${missing_keys.join(', ')}`}
            }
            element.Id = this.id
            element.timestamp = Date.now()
            this.id++
            fs.appendFileSync(this.file_name, JSON.stringify(element) + '\n')
            return element
        }
        else{
            return {'error': 'el item cargado debe ser un objeto'}
        }
    }

    readData () {
        // Lee el archivo
        try {
            return fs.readFileSync(this.file_name, 'utf-8')
        } catch (error) {
            return ''
        }
    }

    getAll(data_to_parse=this.readData()){
        // Parsea la data del archivo a un array de objects
        const data = []
        for (let item of data_to_parse.split('\n')){
            if (item != ''){
                data.push(JSON.parse(item))
            }
        }
        return data
    }

    getLastID(){
        // Busca el ultimo id guardado en el archivo
        const data_to_parse = this.readData()
        const data = this.getAll(data_to_parse)
        let last_id = 1
        for (let item of data) {
            if (item.Id == last_id) {
                last_id = item.Id + 1
            }
        }
        return last_id
    }

    getByID(id_) {
        // devuelve el item del archivo que coincida con el id dado, o un error si no existe o no hay data
        const data_to_parse = this.readData()
        const data = this.getAll(data_to_parse)
        for (let item of data) {
            if (item.Id == id_) {
                return item
            }
        }
        return { 'error': 'Id doesn\'t exist in file or file is empty'}
    }

    updateItem(_id, new_item) {
        // Actualiza la informacion de un elemento con el id dado
        if (typeof(new_item) != 'object') {
            return {'error': 'el item cargado debe ser un objeto'}
        }
        const item = this.getByID(_id)
        this.deleteByID(_id)
        if ('name' in new_item) {
            item.name = new_item.name
        }
        if ('description' in new_item) {
            item.description = new_item.description
        }
        if ('code' in new_item) {
            item.code = new_item.code
        }
        if ('image' in new_item) {
            item.image = new_item.image
        }
        if ('price' in new_item) {
            item.price = new_item.price
        }
        if ('stock' in new_item) {
            item.stock = new_item.stock
        }
        this.addItem(item)
        return item
    }

    deleteByID(id_to_delete) {
        // Borra el item del archivo con el id dado
        const data_to_parse = this.readData()
        const data = this.removeLines(data_to_parse, id_to_delete)
        fs.writeFileSync(this.file_name, data)
    }

    removeLines(data, id_to_delete) {
        // Recibe la data del archivo sin parsear, y el id a borrar. Lo borra y devuelve el sting para guardar
        const del = `"Id":${id_to_delete}`
        const ret = []
        for (let item of data.split('\n')) {
            if (item.indexOf(del) === -1) {
                ret.push(item)
            }
        }
        return ret.join('\n')
    }

    deleteAll() {
        // Borra toda la data del archivo
        fs.writeFileSync(this.file_name,'')
    }

    validateItem(item){
        const keys = ['name', 'description', 'code', 'image', 'price', 'stock']
        const missing_keys = []
        for (let key of keys) {
            if (!(key in item)) {
                missing_keys.push(key)
            }
        }
        return missing_keys
    }
}

module.exports = { Container }
