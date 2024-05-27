import express from 'express'
const router = express.Router()

import { detailAct, deleteAct, listNotificationAct } from '../../controllers/provider/notification.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:uuid', authToken, detailAct)

router.delete('/delete/:uuid', authToken, deleteAct)

router.get('/all-notification', authToken, listNotificationAct)

export default router


