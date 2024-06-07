import express from 'express'
const router = express.Router()

import { 
    createAct, 
    detailAct,
    updateAct,
    deleteAct,
    listDiscountAct
} from '../../controllers/provider/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, createAct)

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, updateAct)

router.delete(':uuid', authToken, deleteAct)

router.get('/', authToken, listDiscountAct)

export default router


