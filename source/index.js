//Express
import express from 'express'
const app = express()
import { createServer } from 'http'
const httpServer = createServer(app)

//PORT
const port = process.env.PORT || 3000

//SOCKET.IO
import { Server } from 'socket.io'
const io = new Server(httpServer)
app.use((req, res, next) => {
  req.io = io
  next()
})  

//CORS
import cors from 'cors'
app.use(cors())

import { handleWebhookAct } from './api/v1/controllers/client/order.controller.js'
app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhookAct)

import bodyParser from 'body-parser'
//parse application/jsonnpm i 
app.use(bodyParser.json())

//DB connection
import { connectionMongo } from './database/mongodb/connection.js'
import { connectionMySQL } from './database/mysql/connection.js'
connectionMongo()
await connectionMySQL()
//define associations
import './api/v1/models/mysql/associations/index.js'

//public folder
app.use(express.static('public'));
app.use('/images', express.static('images'))

//Routing
import routeClientV1 from './api/v1/routes/client/index.route.js'
import routeProviderV1 from './api/v1/routes/provider/index.route.js'
import routeAdminV1 from './api/v1/routes/admin/index.route.js'

app.use(routeClientV1)
app.use(routeProviderV1)
app.use(routeAdminV1)

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`)
})