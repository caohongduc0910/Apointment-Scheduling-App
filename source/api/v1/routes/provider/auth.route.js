import express from 'express'
const router = express.Router()

import {
    registerCtr,
    confirmCtr,
} from '../../controllers/provider/auth.controller.js'

router.post('/register', registerCtr)

router.post('/confirm', confirmCtr)

export default router

