import express from 'express'
const router = express.Router()

import { detailAct, deleteAct, listNotificationAct } from '../../controllers/admin/notification.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:id', authToken, detailAct)

router.delete('/delete/:id', authToken, deleteAct)

router.get('/all-notification', authToken, listNotificationAct)

export default router


