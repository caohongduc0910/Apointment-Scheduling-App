import express from 'express'
const router = express.Router()

import { 
    createAct, 
    detailAct,
    updateAct
} from '../../controllers/provider/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create', authToken, createAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, updateAct)

export default router


