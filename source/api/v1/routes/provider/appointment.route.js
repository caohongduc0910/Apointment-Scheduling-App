import express from 'express'
const router = express.Router()

import { detailAct, updateAct } from '../../controllers/provider/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, updateAct)


export default router


