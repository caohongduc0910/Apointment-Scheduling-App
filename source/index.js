//Express
import express from 'express'
const app = express()

//ENV
import dotenv from 'dotenv'
dotenv.config()
//PORT
const port = process.env.PORT

//CORS
import cors from 'cors'
app.use(cors())

//Body-parser
import bodyParser from 'body-parser'
//parse application/jsonnpm i 
app.use(bodyParser.json())

//Cookie-parser
import cookieParser from 'cookie-parser'
app.use(cookieParser())

//DB connection
import {connectionMongo} from './config/databaseMongo.js'
connectionMongo()

//Routing
import routeAdminV1 from './api/v1/routes/admin/index.route.js'
import routeProviderV1 from './api/v1/routes/provider/index.route.js'
import routeUserV1 from './api/v1/routes/user/index.route.js'
routeAdminV1(app)
routeProviderV1(app)
routeUserV1(app)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})