const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || ''
const MYSQL_DATABASE = process.env.MYSQL_DB || 'asa'
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://caohongduc0910:8RdJcyCVNM6RnG4u@cluster0.r8ftv9z.mongodb.net/asa'

export {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MONGO_URL
}