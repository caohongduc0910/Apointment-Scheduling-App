import express from 'express'
const router = express.Router()

import { 
    createAct, checkoutAct, detailAct, updateAct
} from '../../controllers/client/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create/:uuid', authToken, createAct)

router.post('/checkout/:uuid', authToken, checkoutAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, updateAct)

export default router


