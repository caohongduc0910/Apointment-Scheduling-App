import express from 'express'
const router = express.Router()

import { detailAct, getAllAct } from '../../controllers/admin/appointment.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:id', authToken, detailAct)

router.get('/', authToken, getAllAct)

export default router