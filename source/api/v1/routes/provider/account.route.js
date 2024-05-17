import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage})

import { detailAct, updateAct, changePasswordAct, deleteAct } from '../../controllers/common/account.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.get('/detail', authToken, detailAct)

router.patch('/update', authToken, upload.single('image'), updateAct)

router.patch('/change-password', authToken, changePasswordAct)

router.delete('/delete', authToken, deleteAct)

export default router

