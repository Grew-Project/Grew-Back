const express = require('express')
const router = express.Router()

const treeInfoRoutes = require('./main/treeInfo')
const answerCountRoutes = require('./main/answerCount')
const answerSearchRoutes = require('./main/answerSearch')

router.use('/tree-info', treeInfoRoutes)
router.use('/answer-count', answerCountRoutes)
router.use('/answer-search', answerSearchRoutes)

module.exports = router
