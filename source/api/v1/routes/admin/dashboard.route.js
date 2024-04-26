import express from 'express'
const router = express.Router()

import {indexDashboard} from '../../controllers/admin/dashboard.controller.js'

router.get('/', indexDashboard)

export default router