const express = require('express')
const router = express.Router()

const treeInfoRoutes = require('./main/treeInfo')
const answerCountRoutes = require('./main/answerCount')
const answerSearchRoutes = require('./main/answerSearch')

router.use('/tree-info', treeInfoRoutes)
router.use('/answer-count', answerCountRoutes)
router.use('/answer-search', answerSearchRoutes)
const flowerCountRoutes = require('./main/flowerCount')
const leafCountRoutes = require('./main/leafCount')
const treeNameRoutes = require('./main/treeName')
const treeNameUpdateRoutes = require('./main/treeNameUpdate')
const leafContentRoutes = require('./main/leafContent')

router.use('/tree-info', treeInfoRoutes)
router.use('/answer-count', answerCountRoutes)
router.use('/flower-count', flowerCountRoutes)
router.use('/leaf-count', leafCountRoutes)
router.use('/tree-name', treeNameRoutes)
router.use('/tree-name-update', treeNameUpdateRoutes)
router.use('/leaf-content', leafContentRoutes)

module.exports = router
