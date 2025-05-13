const express = require('express')
const router = express.Router();
const { signup } = require('../controllers/signupController');

// 회원가입 라우트
router.post('/signup', signup);

module.exports = router;
