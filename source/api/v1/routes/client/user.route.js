import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage })

import { detailAct, updateAct, deleteAct } from '../../controllers/client/user.controller.js'
import authToken from '../../middlewares/auth.middleware.js'

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, upload.single('image'), updateAct)

router.delete('/:uuid', authToken, deleteAct)

export default router


