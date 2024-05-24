import express from 'express'
const router = express.Router()

import { detailAct, listFeedbackAct } from '../../controllers/admin/feedback.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail/:id', authToken, detailAct)

router.get('/all-feedback', authToken, listFeedbackAct)

export default router