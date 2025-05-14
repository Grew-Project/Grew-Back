const express = require('express')
const router = express.Router()

const answerSearchRoutes = require('./community/answerSearch')
const sendFlowerRoutes = require('./community/sendFlower')

router.use('/answer-search', answerSearchRoutes)
router.use('/send-flower', sendFlowerRoutes)
module.exports = router
