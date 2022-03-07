const { print }     = require('print')

class apiManager {
    constructor(){
        this.data = [
                        {"Nombre":"Computadora","Precio":12,"Id":1},
                        {"Nombre":"Television","Precio":19,"Id":2},
                        {"Nombre":"Smatwatch","Precio":20,"Id":3},
                        {"Nombre":"Smartphone","Precio":10,"Id":4},
                        {"Nombre":"Tablet","Precio":9,"Id":5},
                        {"Nombre":"Notebook","Precio":15,"Id":6},
                    ]
        this.data.length != 0 ? this.id = this.data[this.data.length - 1].Id + 1 : this.Id = 1
    }

    getAll() {
        return this.data
    }

    getByID(_id) {
        for (let item of this.data) {
            if (item.Id == _id) {
                return item
            }
        }
        return {'error': 'producto no encontrado'}
    }

    addItem(item) {
        if (typeof(item) != 'object') {
            return {'error': 'el item cargado debe ser un objeto'}
        }
        item.Id = this.id
        this.id ++
        this.data.push(item)
        return item
    }

    updateItem(_id, new_item) {
        if (typeof(new_item) != 'object') {
            return {'error': 'el item cargado debe ser un objeto'}
        }
        const item = this.getByID(_id)
        if ('Nombre' in new_item) {
            item.Nombre = new_item.Nombre
        }
        if ('Precio' in new_item) {
            item.Precio = new_item.Precio
        }
        return item
    }

    deleteItem(_id) {
        for (let item of this.data) {
            if (item.Id == _id) {
                const index = this.data.indexOf(item)
                this.data.splice(index, 1)
                return {'message': `se borro el item con Id ${_id}`}
            }
        }
        return {'error': 'el Id no existe, no se borro nada'}
    }
}

module.exports = { apiManager }