import express from 'express'
const router = express.Router()

import { 
    detailAct, listOrderAct
} from '../../controllers/admin/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:id', authToken, detailAct)

router.get('/all-order', authToken, listOrderAct)

export default router


