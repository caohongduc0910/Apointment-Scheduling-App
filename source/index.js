//Express
const express = require('express')
const app = express()

//ENV
require('dotenv').config()
//PORT
const port = process.env.PORT

//CORS
const cors = require("cors")
app.use(cors())

//Body-parser
const bodyParser = require('body-parser')
//parse application/jsonnpm i 
app.use(bodyParser.json())

//Cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//DB connection
const database = require('./config/databaseMongo.js')
database.connectionMongo()

//Routing
const routeAdminVer1 = require('./api/version1/routes/admin/index.js')
const routeProviderVer1 = require('./api/version1/routes/provider/index.route.js')
const routeUserVer1 = require('./api/version1/routes/user/index.route.js')
routeAdminVer1(app)
routeProviderVer1(app)
routeUserVer1(app)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})