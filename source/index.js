//Express
import express from 'express'
const app = express()

//PORT
const port = process.env.PORT

//CORS
import cors from 'cors'
app.use(cors())

//Body-parser
import bodyParser from 'body-parser'
//parse application/jsonnpm i 
app.use(bodyParser.json())

//DB connection
import {connectionMongo} from './database/mongodb/connection.js'
import {connectionMySQL} from './database/mysql/connection.js'
connectionMongo()
connectionMySQL()

//Routing

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})