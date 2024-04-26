import dashBoardRouter from './dashboard.route.js'
import serviceRouter from './service.route.js'
import categoryRouter from './category.route.js'

import {prefixAdmin} from '../../../../config/prefix.js'

export default function routeAdminV1(app) {
  const v1 = `/api/v1/${prefixAdmin}`

  app.use(v1 + "/dashboard", dashBoardRouter)

  app.use(v1 + "/service", serviceRouter)

  app.use(v1 + "/category", categoryRouter)
}
