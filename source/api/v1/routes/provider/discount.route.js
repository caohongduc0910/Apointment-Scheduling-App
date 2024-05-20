import express from 'express'
const router = express.Router()

import { 
    createAct, 
} from '../../controllers/provider/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create', authToken, createAct)

export default router


