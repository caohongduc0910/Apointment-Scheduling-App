import express from 'express'
const router = express.Router()

import { detailAct } from '../../controllers/admin/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:id', authToken, detailAct)

export default router

