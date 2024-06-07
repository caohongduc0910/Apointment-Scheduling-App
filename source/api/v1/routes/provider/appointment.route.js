import express from 'express'
const router = express.Router()

import { detailAct } from '../../controllers/provider/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:uuid', authToken, detailAct)

export default router


