import express from 'express'
const router = express.Router()

import authRouter from './auth.route.js'
import accountRouter from './account.route.js'
import categoryRouter from './category.route.js'
import serviceRouter from './service.route.js'
import appointmentRouter from './appointment.route.js'
import discountRouter from './discount.route.js'
import orderRouter from './order.route.js'

import {prefixAdmin} from '../../../../config/prefix.js'

const v1 = `/api/v1/${prefixAdmin}`

router.use(v1 + "/auth", authRouter)

router.use(v1 + "/account", accountRouter)

router.use(v1 + "/category", categoryRouter)

router.use(v1 + "/service", serviceRouter)

router.use(v1 + "/appointment", appointmentRouter)

router.use(v1 + "/discount", discountRouter)

router.use(v1 + "/order", orderRouter)

export default router
