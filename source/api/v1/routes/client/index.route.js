import express from 'express'
const router = express.Router()

import authRouter from './auth.route.js'
import accountRouter from './account.route.js'
import serviceRouter from './service.route.js'

const v1 = `/api/v1`

router.use(v1 + "/auth", authRouter)

router.use(v1 + "/account", accountRouter)

router.use(v1 + "/service", serviceRouter)

export default router
