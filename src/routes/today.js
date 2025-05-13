const express = require('express')
const router = express.Router()

const questionSearchRoutes = require('./today/questionSearch')
const answerWriteRoutes = require('./today/answerWrite')

router.use('/question-search', questionSearchRoutes)
router.use('/answer-write', answerWriteRoutes)
module.exports = router
