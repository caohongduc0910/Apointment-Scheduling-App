import express from 'express'
const router = express.Router()

import { detailAct, listServiceAct } from '../../controllers/admin/service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:id', authToken, detailAct)

router.get('/', authToken, listServiceAct)

export default router
