import express from 'express'
const router = express.Router()

import { detailAct, getAllAct } from '../../controllers/client/category.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:uuid', authToken, detailAct)

router.get('/all', authToken, getAllAct)

export default router
