
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(`./src/components/fakedata/db.json`)
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    next()
})
server.use(router)
server.listen(3306, () => {
    console.log('JSON Server is running')
})
