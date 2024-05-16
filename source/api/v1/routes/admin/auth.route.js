import express from 'express'
const router = express.Router()

import {
    loginCtr, 
    logoutCtr,
} from '../../controllers/admin/auth.controller.js'
import verifyToken from '../../middlewares/auth.middleware.js'

router.post('/login', loginCtr)

router.post('/logout', verifyToken, logoutCtr)

export default router

