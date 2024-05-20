import express from 'express'
const router = express.Router()

import { createAct, 
    detailAct, 
    updateAct, 
    deleteAct, 
    getAllAct, 
} from '../../controllers/client/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create/:uuid', authToken, createAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, updateAct)

router.delete('/delete/:uuid', authToken, deleteAct)

router.get('/get-all-appointment', authToken, getAllAct)

export default router


