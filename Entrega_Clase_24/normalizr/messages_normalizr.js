const { normalize, schema } = require('normalizr')

function normalizeMessages(messages){
    const author = new schema.Entity('author')
    const text = new schema.Entity('text')
    const message = new schema.Entity('message', {author: author, text: text})
    const messagesNormalizr = new schema.Entity('messages', {author: author, messages: [message]})

     return normalize({id: 1, messages: messages}, messagesNormalizr)
}
module.exports = { normalizeMessages }
