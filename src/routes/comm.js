const express = require('express')
const router = express.Router()

const answerSearchRoutes = require('./community/answerSearch')
const sendFlowerRoutes = require('./community/sendFlower')
const sendLeafRoutes = require('./community/sendLeaf')

router.use('/answer-search', answerSearchRoutes)
router.use('/send-flower', sendFlowerRoutes)
router.use('/send-leaf', sendLeafRoutes)
module.exports = router
