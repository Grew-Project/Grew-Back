const express = require('express')
const router = express.Router()

const treeInfoRoutes = require('./main/treeInfo')
const answerCountRoutes = require('./main/answerCount')
const flowerCountRoutes = require('./main/flowerCount')
const leafCountRoutes = require('./main/leafCount')

router.use('/tree-info', treeInfoRoutes)
router.use('/answer-count', answerCountRoutes)
router.use('/flower-count', flowerCountRoutes)
router.use('/leaf-count', leafCountRoutes)

module.exports = router
