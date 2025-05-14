const express = require('express')
const router = express.Router()

const forestRoutes = require('./forest/completeTree')
const reportRoutes = require('./forest/report')

router.use('/forest', forestRoutes)
router.use('/report', reportRoutes)

module.exports = router
