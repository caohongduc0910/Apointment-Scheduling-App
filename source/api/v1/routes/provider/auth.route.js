import express from 'express'
const router = express.Router()

import {
    registerAct,
    loginAct, logoutAct,
    confirmAct,
    forgetPasswordAct,
    resetPasswordAct
} from '../../controllers/provider/auth.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.post('/register', registerAct)

router.post('/login', loginAct)

router.post('/logout', authToken, logoutAct)

router.post('/confirm', confirmAct)

router.post('/forget', forgetPasswordAct)

router.post('/reset', resetPasswordAct)

export default router

