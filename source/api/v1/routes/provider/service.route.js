import express from 'express'
const router = express.Router()

import multer from 'multer'
import storage from '../../../../helper/upload.js'
const upload = multer({ storage: storage})

import { createAct, 
    detailAct, 
    updateAct, 
    deleteAct, 
} from '../../controllers/provider/service.controller.js'

import authToken from '../../middlewares/auth.middleware.js'

router.post('/', authToken, upload.single('image'), createAct)

router.get('/:uuid', authToken, detailAct)

router.patch('/:uuid', upload.single('image'), authToken, updateAct)

router.delete('/:uuid', authToken, deleteAct)

export default router
