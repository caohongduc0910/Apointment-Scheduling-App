import serviceRouter from './service.route.js'

import {prefixProvider} from '../../../../config/prefix.js'

export default function routeProviderV1(app) {
  const v1 = `/api/v1/${prefixProvider}`

  app.use(v1 + "/service", serviceRouter)
}
