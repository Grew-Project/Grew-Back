const express = require('express')
const connectDB = require('./src/config/db')
const bodyParser = require('body-parser')
const authRoutes = require('./src/routes/signup')
const mainRoutes = require('./src/routes/main')
require('dotenv').config()

const app = express()

connectDB()

// 미들웨어 설정
app.use(bodyParser.json())

// 라우터 설정
app.use('/api/auth', authRoutes)
app.use('/api/main', mainRoutes)

// 서버 시작
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
