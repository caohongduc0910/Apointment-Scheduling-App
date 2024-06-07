import express from 'express'
const router = express.Router()

import authRouter from './auth.route.js'
import userRouter from './user.route.js'
import categoryRouter from './category.route.js'
import serviceRouter from './service.route.js'
import appointmentRouter from './appointment.route.js'
import discountRouter from './discount.route.js'
import {prefixProvider} from '../../../../config/prefix.js'


const v1 = `/api/v1/${prefixProvider}`

router.use(v1 + "/auth", authRouter)

router.use(v1 + "/users", userRouter)

router.use(v1 + "/categories", categoryRouter)

router.use(v1 + "/services", serviceRouter)

router.use(v1 + "/appointments", appointmentRouter)

router.use(v1 + "/discounts", discountRouter)

export default router
