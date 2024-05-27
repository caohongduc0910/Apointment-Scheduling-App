import express from 'express'
const router = express.Router()

import { detailAct, deleteAct } from '../../controllers/client/notification.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:uuid', authToken, detailAct)

router.delete('/delete/:uuid', authToken, deleteAct)

export default router


