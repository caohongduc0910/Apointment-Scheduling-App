import express from 'express'
const router = express.Router()

import { createAct, deleteAct } from '../../controllers/client/favorite-service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create/:uuid', authToken, createAct)

router.delete('/delete/:uuid', authToken, deleteAct)

export default router


