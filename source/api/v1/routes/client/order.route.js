import express from 'express'
const router = express.Router()

import { 
    createAct, checkoutAct, detailAct, updateAct, deleteAct, listOrderAct
} from '../../controllers/client/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create/:uuid', authToken, createAct)

router.post('/checkout/:uuid', authToken, checkoutAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, updateAct)

router.delete('/delete/:uuid', authToken, deleteAct)

router.get('/all-order', authToken, listOrderAct)

export default router