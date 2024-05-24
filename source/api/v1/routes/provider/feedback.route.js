import express from 'express'
const router = express.Router()

import { detailAct, listFeedbackAct } from '../../controllers/provider/feedback.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:uuid', authToken, detailAct)

router.get('/all-feedback', authToken, listFeedbackAct)

export default router


