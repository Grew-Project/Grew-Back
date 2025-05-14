const express = require('express')
const router = express.Router()

const forestRoutes = require('./forest/completetree')

router.use('/forest', forestRoutes)

module.exports = router
