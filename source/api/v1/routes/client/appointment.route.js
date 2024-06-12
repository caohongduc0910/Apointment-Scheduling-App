import express from 'express'
const router = express.Router()

import {
    detailAct, 
    updateAct, 
    deleteAct, 
    getAllAct, 
} from '../../controllers/client/appointment.controller.js'

import { createAct } from '../../controllers/client/order.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/:uuid/orders', authToken, createAct)

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, updateAct)

router.delete('/:uuid', authToken, deleteAct)

router.get('/', authToken, getAllAct)

export default router