import express from 'express'
const router = express.Router()

import { detailAct, listServiceAct } from '../../controllers/client/service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:uuid', authToken, detailAct)

router.get('/all-service', authToken, listServiceAct)

export default router
