import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage})

import { createAct, detailAct, updateAct, deleteAct } from '../../controllers/client/feedback.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create/:uuid', authToken, upload.single('image_url'), createAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, upload.single('image_url'), updateAct)

router.delete('/delete/:uuid', authToken, deleteAct)

export default router


