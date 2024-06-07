import express from 'express'
const router = express.Router()

import { 
    detailAct, listDiscountAct
} from '../../controllers/admin/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:id', authToken, detailAct)

router.get('/', authToken, listDiscountAct)

export default router


