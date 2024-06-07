import express from 'express'
const router = express.Router()

import { 
    createAct, checkoutAct, detailAct, updateAct
} from '../../controllers/client/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/:uuid', authToken, createAct)

router.post('/:uuid', authToken, checkoutAct)

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, updateAct)

export default router