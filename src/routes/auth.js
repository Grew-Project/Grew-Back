const express = require('express')
const router = express.Router()
const { signup } = require('../controllers/signupController')
const loginController = require('../controllers/loginController')

//회원가입 라우트
router.post('/signup', signup)
//로그인 라우트
router.post('/login', loginController.loginUser)

module.exports = router
