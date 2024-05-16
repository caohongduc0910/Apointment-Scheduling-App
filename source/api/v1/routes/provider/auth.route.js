import express from 'express'
const router = express.Router()

import {
    registerAct,
    confirmAct,
} from '../../controllers/provider/auth.controller.js'

router.post('/register', registerAct)

router.post('/confirm', confirmAct)

export default router

