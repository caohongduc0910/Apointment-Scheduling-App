import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage})

import { createAct } from '../../controllers/provider/service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, upload.single('image'), createAct)

export default router
