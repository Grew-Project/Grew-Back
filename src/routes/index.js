const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// 현재 디렉토리의 모든 파일을 읽어서 라우트로 등록
fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const route = require(path.join(__dirname, file))
    const routeName = file.replace('.js', '')
    router.use(`/${routeName}`, route)
  }
})

module.exports = router
