import {MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST} from '../../../config/global.js'

export default {
  'development': {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    dialect: 'mysql',
  }
}
