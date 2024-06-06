import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage})

import { detailAct, updateAct, deleteAct } from '../../controllers/client/user.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail', authToken, detailAct)

router.patch('/update', authToken, upload.single('image'), updateAct)

router.delete('/delete', authToken, deleteAct)

export default router