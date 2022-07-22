class SQLite_manager {
    constructor(file_name){
        const KNEX_SETTINGS = {
            'client'        : 'sqlite3',
            'connection'    : `./DB/${file_name}.sqlite`
        }
        this.knex = require('knex')(KNEX_SETTINGS)
        this.message_column = 'message'
        
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
                    table.string('author').notNullable()
                    table.string('text').notNullable()
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
    
    addMessage(table_name, message) {
        this.knex(table_name).insert(message)
        .then( () => {
            console.log('message inserted')
        } )
        .catch( (err) => {
            console.log(err)
            throw err
        } )
    }

    getMessages(table_name) {
        const messages = []
        this.knex.from(table_name).select('author', 'text')
        .then( (rows) => {
            for (let row of rows) {
                messages.push(row)
            }
        })
        .catch((err) => {
            console.log(err)
        } )
        return messages
    }
}

module.exports = { SQLite_manager }