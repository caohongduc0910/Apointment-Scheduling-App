import express from 'express'
const router = express.Router()

import { createAct, detailAct, getAllAct } from '../../controllers/client/category.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create', authToken, createAct)

router.get('/detail/:uuid', authToken, detailAct)

router.get('/all', authToken, getAllAct)

export default router
