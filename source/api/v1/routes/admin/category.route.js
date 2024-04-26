import express from 'express'
const router = express.Router()

import {indexCategory} from '../../controllers/admin/category.controller.js'

router.get('/', indexCategory)

export default router

