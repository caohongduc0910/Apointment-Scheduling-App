import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage})

import { detailAct, updateAct, changePasswordAct } from '../../controllers/provider/account.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail', authToken, detailAct)

router.patch('/update', authToken, upload.single('image'), updateAct)

router.patch('/change-password', authToken, changePasswordAct)


export default router

