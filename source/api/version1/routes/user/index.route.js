
const serviceRoute = require('./service.route')

module.exports = function (app) {
  const ver1 = '/api/ver1'

  app.use(ver1 + "/service", serviceRoute)
}