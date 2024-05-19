import express from 'express'
const router = express.Router()

import { createAct } from '../../controllers/client/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create/:uuid', authToken, createAct)

export default router


