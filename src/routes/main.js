const express = require('express')
const router = express.Router()

const treeInfoRoutes = require('./main/treeInfo')
const answerCountRoutes = require('./main/answerCount')

router.use('/tree-info', treeInfoRoutes) 
router.use('/answer-count', answerCountRoutes) 

module.exports = router
