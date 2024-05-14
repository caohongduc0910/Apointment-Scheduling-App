const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || ''
const MYSQL_DATABASE = process.env.MYSQL_DB || 'asa'

const MONGO_URL = process.env.MONGO_UR

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN
const JWT_EXPIRY = process.env.JWT_AT_EXPIRE

export {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MONGO_URL,
  EMAIL_USER,
  EMAIL_PASS,
  JWT_SECRET,
  JWT_EXPIRY,
}