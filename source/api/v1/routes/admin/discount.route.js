import express from 'express'
const router = express.Router()

import { 
    detailAct, listDiscountAct
} from '../../controllers/admin/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:id', authToken, detailAct)

router.get('/all-discount', authToken, listDiscountAct)

export default router


