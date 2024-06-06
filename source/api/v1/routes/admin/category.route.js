import express from 'express'
const router = express.Router()

import { createAct, detailAct } from '../../controllers/admin/category.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, createAct)

router.get('/:id', authToken, detailAct)

export default router
