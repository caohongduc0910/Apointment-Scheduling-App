import express from 'express'
const router = express.Router()

import { detailAct, listServiceAct } from '../../controllers/admin/service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:id', authToken, detailAct)

router.get('/all-service', authToken, listServiceAct)

export default router
