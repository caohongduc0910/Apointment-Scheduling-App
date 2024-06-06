import express from 'express'
const router = express.Router()

import {
    loginAct, 
    logoutAct,
    changePasswordAct
} from '../../controllers/admin/auth.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.post('/login', loginAct)

router.post('/logout', authToken, logoutAct)

router.patch('/change-password', authToken, changePasswordAct)

export default router

