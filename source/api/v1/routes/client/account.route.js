import express from 'express'
const router = express.Router()

import multer from 'multer'
const upload = multer()
import uploadToCloudinary from '../../middlewares/cloudinary.middleware.js'

import { detailAct, updateAct, changePasswordAct, deleteAct } from '../../controllers/common/account.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail', authToken, detailAct)

router.patch('/update', authToken, upload.single('image'), uploadToCloudinary, updateAct)

router.patch('/change-password', authToken, changePasswordAct)

router.delete('/delete', authToken, deleteAct)

export default router


