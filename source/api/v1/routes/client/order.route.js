import express from 'express'
const router = express.Router()

import { 
    createAct, checkoutAct
} from '../../controllers/client/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/:uuid', authToken, createAct)

router.post('/:uuid', authToken, checkoutAct)

export default router


