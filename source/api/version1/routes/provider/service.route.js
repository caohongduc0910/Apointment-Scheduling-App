const express = require('express')
const router = express.Router()

const controller = require('../../controllers/provider/service.controller')

router.get('/', controller.index)

module.exports = router

