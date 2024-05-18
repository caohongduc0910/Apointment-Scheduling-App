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

router.post('/create', authToken, upload.single('image'), createAct)

router.get('/detail/:uuid', authToken, detailAct)

router.patch('/update/:uuid', authToken, updateAct)

router.delete('/delete/:uuid', authToken, deleteAct)

export default router
