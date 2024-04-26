import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const connectionMySQL = mysql.createConnection({
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DB
})
  
connectionMySQL.connect((error) => {
  if (error) throw error
  console.log("Connected successfully to MySQL")
})

export default connectionMySQL