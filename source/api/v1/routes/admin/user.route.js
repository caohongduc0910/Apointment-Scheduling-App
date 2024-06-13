import express from 'express'
const router = express.Router()

import multer from 'multer'
const upload = multer()
import uploadToCloudinary from '../../middlewares/cloudinary.middleware.js'

import { detailAct, updateAct, listUserAct } from '../../controllers/admin/user.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:id', authToken, detailAct)

router.patch('/:id', authToken, upload.single('image'), uploadToCloudinary, updateAct)

router.get('/', authToken, listUserAct)

export default router

