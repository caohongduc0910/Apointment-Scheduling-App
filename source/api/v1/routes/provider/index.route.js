import express from 'express'
const router = express.Router()

import authRouter from './auth.route.js'
import userRouter from './user.route.js'
import {prefixProvider} from '../../../../config/prefix.js'

const v1 = `/api/v1/${prefixProvider}`

router.use(v1 + "/auth", authRouter)

router.use(v1 + "/users", userRouter)

export default router
