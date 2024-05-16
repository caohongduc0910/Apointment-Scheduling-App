import express from 'express'
const router = express.Router()

import {
    registerCtr,
    loginCtr, logoutCtr,
    confirmCtr,
} from '../../controllers/client/auth.controller.js'
import verifyToken from '../../middlewares/auth.middleware.js'

router.post('/register', registerCtr)

router.post('/login', loginCtr)

router.post('/logout', verifyToken, logoutCtr)

router.post('/confirm', confirmCtr)

export default router

