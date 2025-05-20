const express = require('express')
const router = express.Router()

const treeInfoRoutes = require('./main/treeInfo')
const answerCountRoutes = require('./main/answerCount')
const flowerCountRoutes = require('./main/flowerCount')
const leafCountRoutes = require('./main/leafCount')
const treeNameRoutes = require('./main/treeName')
const treeNameUpdateRoutes = require('./main/treeNameUpdate')
const leafContentRoutes = require('./main/leafContent')
const answerOrNotRoutes = require('./main/answerOrNot')
const questionSearchRoutes = require('./today/questionSearch')

router.use('/tree-info', treeInfoRoutes)
router.use('/answer-count', answerCountRoutes)
router.use('/flower-count', flowerCountRoutes)
router.use('/leaf-count', leafCountRoutes)
router.use('/tree-name', treeNameRoutes)
router.use('/tree-name-update', treeNameUpdateRoutes)
router.use('/leaf-content', leafContentRoutes)
router.use('/answer-or-not', answerOrNotRoutes)
router.use('/question-search', questionSearchRoutes)

module.exports = router
