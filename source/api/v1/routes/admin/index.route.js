import express from 'express'
const router = express.Router()

import authRouter from './auth.route.js'
import userRouter from './user.route.js'
import {prefixAdmin} from '../../../../config/prefix.js'

const v1 = `/api/v1/${prefixAdmin}`

router.use(v1 + "/auth", authRouter)

router.use(v1 + "/users", userRouter)

export default router
