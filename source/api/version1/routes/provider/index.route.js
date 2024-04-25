const serviceRoute = require('./service.route')

const prefix = require('../../../../config/prefix')

module.exports = function (app) {
  const providerPath = prefix.prefixProvider
  const ver1 = `/api/ver1/${providerPath}`

  app.use(ver1 + "/service", serviceRoute)
}