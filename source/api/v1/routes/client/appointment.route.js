import express from 'express'
const router = express.Router()

import { createAct, detailAct } from '../../controllers/client/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, createAct)

router.get('/:uuid', authToken, detailAct)

export default router


