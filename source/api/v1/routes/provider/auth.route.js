import express from 'express'
const router = express.Router()

import {
    registerCtr,
    loginCtr, logoutCtr,
    confirmCtr,
} from '../../controllers/provider/auth.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.post('/register', registerCtr)

router.post('/login', loginCtr)

router.post('/logout', authToken, logoutCtr)

router.post('/confirm', confirmCtr)

export default router

