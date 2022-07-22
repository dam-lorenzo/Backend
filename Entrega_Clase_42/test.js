const https = require('https')

const options = {
                    'hostname': 'localhost',
                    'port': 8080,
                    'path': '/info',
                    'method': 'GET'
                }


const response = https.request(options, res => {
    console.log(`StatusCode ${res.statusCode}`)
    
    res.on('data', data => {
        process.stdout.write(data)
    } )
} )

response.on('error', error => {
    console.error(error)
} )

response.end()