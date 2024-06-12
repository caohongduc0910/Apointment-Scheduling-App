import express from 'express'
const router = express.Router()

import { detailAct, listServiceAct } from '../../controllers/client/service.controller.js'

import { createAct } from '../../controllers/client/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/:uuid/appointments', authToken, createAct)

router.get('/:uuid', authToken, detailAct)

router.get('/', authToken, listServiceAct)

export default router
