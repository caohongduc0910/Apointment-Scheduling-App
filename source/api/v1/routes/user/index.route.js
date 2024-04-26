import serviceRouter from './service.route.js'

export default function routeUserV1(app) {
  const v1 = `/api/v1`

  app.use(v1 + "/service", serviceRouter)
}
