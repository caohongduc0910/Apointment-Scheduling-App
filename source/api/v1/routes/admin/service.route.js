import express from 'express'
const router = express.Router()

import {indexService} from '../../controllers/admin/service.controller.js'

router.get('/', indexService)

export default router

