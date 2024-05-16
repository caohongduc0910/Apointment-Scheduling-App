import express from 'express'
const router = express.Router()

import { detailAct } from '../../controllers/provider/account.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail', authToken, detailAct)


export default router   

