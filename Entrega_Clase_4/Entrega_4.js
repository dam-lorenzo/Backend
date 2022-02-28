const fs = require('fs')

class Container {
    constructor(file_name){
        this.file_name = `./files/${file_name}.txt`
        this.id = this.getLastID()
    }
    
    
    save(element){
        if (typeof(element) == 'object'){
            element['Id'] = this.id
            this.id++
            fs.appendFileSync(this.file_name, JSON.stringify(element) + '\n')
        }
        else{
            print('Can\'t save elements different from Object')
        }
    }

    getAll(data_to_parse){
        const data = []
        for (let item of data_to_parse.split('\n')){
            if (item != ''){
                data.push(JSON.parse(item))
            }
        }
        return data
    }

    getLastID(){
        let data_to_parse
        try {
            data_to_parse =fs.readFileSync(this.file_name, 'utf-8')
        } catch (error) {
            return 1
        }
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
        let data_to_parse
        try {
            data_to_parse =fs.readFileSync(this.file_name, 'utf-8')
        } catch (error) {
            print('File Doesn\'t exists')
            return
        }
        const data = this.getAll(data_to_parse)
        for (let item of data) {
            if (item.Id == id_) {
                return item
            }
        }
        print('Id doesn\'t exist in file or file is empty')
    }

    deleteByID(id_to_delete) {
        let data_to_parse
        try {
            data_to_parse =fs.readFileSync(this.file_name, 'utf-8')
        } catch (error) {
            print('File Doesn\'t exists')
            return
        }
        const data = this.removeLines(data_to_parse, id_to_delete)
        fs.writeFileSync(this.file_name, data)
    }

    removeLines(data, id_to_delete) {
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
        fs.writeFileSync(this.file_name,'')
    }
}

module.exports = {Container}

function random_number() {
    const max = 21
    const min = 1
    return Math.floor(Math.random() * (max - min) + min);
}

function print(message) {
    console.log(message)
}

(function () {
    const file = new Container('container')
    const items = ['Computadora', 'Television', 'Mesa', 'Auto', 'Reloj']
    for (let item of items){
        file.save({'Nombre': item, 'Precio': random_number()})
    }
    file.getByID('4')
    // file.deleteByID('2')
    // file.deleteAll()
}) ()