const express = require('express')
const router = express.Router()

const myAnswerRoutes = require('./mypage/myAnswer')

router.use('/my-answer', myAnswerRoutes)

module.exports = router
