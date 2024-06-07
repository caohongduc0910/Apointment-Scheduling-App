import express from 'express'
const router = express.Router()

import { createAct } from '../../controllers/client/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, createAct)

export default router


