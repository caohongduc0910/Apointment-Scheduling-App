import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage })

import { detailAct, updateAct, listUserAct } from '../../controllers/admin/user.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.get('/:id', authToken, detailAct)

router.patch('/:id', authToken, upload.single('image'), updateAct)

router.get('/', authToken, listUserAct)

export default router

