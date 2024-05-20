import express from 'express'
const router = express.Router()

import { 
    createAct, 
    detailAct,
    updateAct,
    deleteAct
} from '../../controllers/provider/discount.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create', authToken, createAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, updateAct)

router.delete('/delete/:uuid', authToken, deleteAct)

export default router


