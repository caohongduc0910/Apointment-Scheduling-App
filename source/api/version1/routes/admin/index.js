const dashBoardRoute = require('./dashboard.route')
const serviceRoute = require('./service.route')

const prefix = require('../../../../config/prefix')

module.exports = function (app) {
  const adminPath = prefix.prefixAdmin
  const ver1 = `/api/ver1/${adminPath}`

  app.use(ver1 + "/dashboard", dashBoardRoute)

  app.use(ver1 + "/service", serviceRoute)
}