import express from 'express'
const router = express.Router()

import { detailAct, getAllAct } from '../../controllers/provider/category.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:uuid', authToken, detailAct)

router.get('/', authToken, getAllAct)

export default router
