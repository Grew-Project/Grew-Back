const express = require('express')
const router = express.Router()

const myAnswerRoutes = require('./mypage/myAnswerList')
const myAnswerSearchRoutes = require('./mypage/myAnswerSearch')

router.use('/my-answer-list', myAnswerRoutes)
router.use('/my-answer-search', myAnswerSearchRoutes)
// const myAnswerWriteRoutes = require('./mypage/myAnswerWrite')
module.exports = router
