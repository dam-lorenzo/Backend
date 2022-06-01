const { commerce, random, time, datatype } = require('faker')

function mockProducts(max_products) {
    const products = []
    for (let count = 0; count < max_products; count++) {
        products.push(createProduct(count))
    }
    return products
}

function createProduct(_id) {
    return  {
        'name':         commerce.product(),
        'description':  commerce.productDescription(),
        'code':         random.alphaNumeric(5).toUpperCase(),
        'image':        random.image(),
        'price':        datatype.float({'min': 5, 'max': 5000}),
        'stock':        datatype.number(50),
        'Id':           _id,
        'timestamp':    time.recent('unix')
        
    }
}

module.exports = { mockProducts }