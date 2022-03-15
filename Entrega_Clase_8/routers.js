const { Router }    = express
const { apiManager} = require('apiManager')

//      Global variables
const api = new apiManager()

//      Routers

const router_products   = Router()
router_products.use(express.urlencoded({extended: true}))
router_products.use(express.json())

router_products.get('/', (req, res) => {
    res.json(api.getAll())
} )

router_products.get('/:id', (req, res) => {
    const _id = req.params.id
    res.json(api.getByID(_id))
} )

router_products.post('/', (req, res) => {
    const item = req.body
    res.json(api.addItem(item))
} )

router_products.put('/:id', (req, res) => {
    const _id = req.params.id
    const new_item = req.body
    res.json(api.updateItem(_id, new_item))
} )

router_products.delete('/:id', (req, res) => {
    const _id = req.params.id
    res.json(api.deleteItem(_id))
} )


module.exports = { router_products }