import express from 'express'
const router = express.Router()

import {indexService} from '../../controllers/user/service.controller.js'

router.get('/', indexService)

export default router

