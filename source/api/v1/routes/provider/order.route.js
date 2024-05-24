import express from 'express'
const router = express.Router()

import { 
    detailAct, listOrderAct
} from '../../controllers/provider/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:uuid', authToken, detailAct)

router.get('/all-order', authToken, listOrderAct)

export default router


