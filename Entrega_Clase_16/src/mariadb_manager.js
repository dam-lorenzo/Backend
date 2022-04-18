const options = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'test',
    },
  }
  
class mariaDB_manager {
    constructor () {
        this.knex = require('knex')(options)
    }

    createTable(table_name) {
        this.knex.schema.hasTable(table_name)
        .then( (exist) => {
            if (exist) {
                console.log('Table exist')
            }
            else {
                this.knex.schema.createTable(table_name, (table) => {
                    table.increments('id')
                    table.string('name', ).notNullable()
                    table.string('price').notNullable()
                })
                .then(() => { 
                    console.log('table created')
                })
                .catch((err) => {
                    console.log(err)
                } )
            }
        } )
    }

    addItem(table_name, message) {
        this.knex(table_name).insert(message)
        .then( () => {
            console.log('item inserted')
        } )
        .catch( (err) => {
            console.log(err)
            throw err
        } )
    }

    getItems(table_name) {
        const items = []
        this.knex.from(table_name).select('name', 'price')
        .then( (rows) => {
            for (let row of rows) {
                items.push(row)
            }
        })
        .catch((err) => {
            console.log(err)
        } )
        return items
    }
    
}


module.exports = { mariaDB_manager }