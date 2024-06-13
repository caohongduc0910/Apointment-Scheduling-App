import express from 'express'
const router = express.Router()

import { 
    detailAct, listDiscountAct
} from '../../controllers/client/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:uuid', authToken, detailAct)

router.get('/', authToken, listDiscountAct)

export default router


