import express from 'express'
const router = express.Router()

import {
    registerAct,
    loginAct, logoutAct,
    confirmAct,
} from '../../controllers/client/auth.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.post('/register', registerAct)

router.post('/login', loginAct)

router.post('/logout', authToken, logoutAct)

router.post('/confirm', confirmAct)

export default router

