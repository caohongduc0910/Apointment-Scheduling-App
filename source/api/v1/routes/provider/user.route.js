import express from 'express'
const router = express.Router()

import multer from 'multer'
const upload = multer()
import uploadToCloudinary from '../../middlewares/cloudinary.middleware.js'

import { detailAct, updateAct, deleteAct } from '../../controllers/provider/user.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, upload.single('image'), uploadToCloudinary, updateAct)

router.delete('/:uuid', authToken, deleteAct)

export default router

