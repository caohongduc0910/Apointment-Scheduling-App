import * as ENV from '../../config/global.js'

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(ENV.MYSQL_DATABASE, ENV.MYSQL_USER, ENV.MYSQL_PASSWORD, {
  host: ENV.MYSQL_HOST,
  dialect: 'mysql'
})

const connectionMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to MySQL:', error)
  }
}

export {sequelize, connectionMySQL}