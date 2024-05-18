import express from 'express'
const router = express.Router()

import { createAct, detailAct } from '../../controllers/provider/category.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create', authToken, createAct)

router.get('/detail/:uuid', authToken, detailAct)

export default router
