import express from 'express'
const router = express.Router()

import { createAct, detailAct, updateAct, deleteAct, getAllAct } from '../../controllers/admin/category.controller.js'

import multer from 'multer'
const upload = multer()
import uploadToCloudinary from '../../middlewares/cloudinary.middleware.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/create', authToken, upload.single('image'), uploadToCloudinary, createAct)

router.get('/detail/:id', authToken, detailAct)

router.patch('/update/:id', authToken, upload.single('image'), uploadToCloudinary, updateAct)

router.delete('/delete/:id', authToken, deleteAct)

router.get('/all', authToken, getAllAct)

export default router
