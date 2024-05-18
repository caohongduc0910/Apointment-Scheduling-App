import express from 'express'
const router = express.Router()

import authRouter from './auth.route.js'
import accountRouter from './account.route.js'
import categoyRouter from './category.route.js'
import {prefixProvider} from '../../../../config/prefix.js'

const v1 = `/api/v1/${prefixProvider}`

router.use(v1 + "/auth", authRouter)

router.use(v1 + "/account", accountRouter)

router.use(v1 + "/category", categoyRouter)

export default router
