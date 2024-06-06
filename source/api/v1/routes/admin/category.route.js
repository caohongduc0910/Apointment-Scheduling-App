import express from 'express'
const router = express.Router()

import { createAct, detailAct, updateAct, deleteAct } from '../../controllers/admin/category.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, createAct)

router.get('/:id', authToken, detailAct)

router.patch('/:id', authToken, updateAct)

router.delete('/:id', authToken, deleteAct)

export default router
