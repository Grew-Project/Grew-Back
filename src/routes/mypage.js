const express = require('express')
const router = express.Router()

const myAnswerRoutes = require('./mypage/myAnswerList')
const myAnswerSearchRoutes = require('./mypage/myAnswerSearch')
const myAnswerUpdateRoutes = require('./mypage/myAnswerUpdate')
const myPasswordUpdateRoutes = require('./mypage/myPasswordUpdate')

router.use('/my-answer-list', myAnswerRoutes)
router.use('/my-answer-search', myAnswerSearchRoutes)
router.use('/my-answer-update', myAnswerUpdateRoutes)
router.use('/my-password-update', myPasswordUpdateRoutes)

module.exports = router
