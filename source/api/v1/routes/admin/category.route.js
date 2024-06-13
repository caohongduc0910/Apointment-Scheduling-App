import express from 'express'
const router = express.Router()

import { createAct, detailAct, updateAct, deleteAct, getAllAct } from '../../controllers/admin/category.controller.js'

import multer from 'multer'
const upload = multer()
import uploadToCloudinary from '../../middlewares/cloudinary.middleware.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, upload.single('image'), uploadToCloudinary, createAct)

router.get('/:id', authToken, detailAct)

router.patch('/:id', authToken, upload.single('image'), uploadToCloudinary, updateAct)

router.delete('/:id', authToken, deleteAct)

router.get('/', authToken, getAllAct)

export default router
