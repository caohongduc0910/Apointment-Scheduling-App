import express from 'express'
const router = express.Router()

import {
    loginCtr, 
    logoutCtr,
} from '../../controllers/admin/auth.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.post('/login', loginCtr)

router.post('/logout', authToken, logoutCtr)

export default router

