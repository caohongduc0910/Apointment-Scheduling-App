import express from 'express'
const router = express.Router()

import { detailAct, deleteAct } from '../../controllers/admin/notification.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:id', authToken, detailAct)

router.delete('/delete/:id', authToken, deleteAct)

export default router


