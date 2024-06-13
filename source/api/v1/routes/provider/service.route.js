import express from 'express'
const router = express.Router()

import multer from 'multer'
// import storage from '../../../../helper/upload.js'
// const upload = multer({ storage: storage})
const upload = multer()
import uploadToCloudinary from '../../middlewares/cloudinary.middleware.js'

import { createAct, 
    detailAct, 
    updateAct, 
    deleteAct,
    listServiceAct
} from '../../controllers/provider/service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, upload.single('image'), uploadToCloudinary, createAct)

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', authToken, upload.single('image'), uploadToCloudinary, updateAct)

router.delete('/:uuid', authToken, deleteAct)

router.get('/', authToken, listServiceAct)

export default router