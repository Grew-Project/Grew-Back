import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
const port = process.env.PORT || 4000

import cors from 'cors'
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // true로 설정하면 쿠키를 포함한 요청을 허용합니다.
  })
)
app.use(express.json())

import cookieParser from 'cookie-parser'
app.use(cookieParser())

import mongoose from 'mongoose'
mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME }) //
  .then(() => {
    console.log('MongoDB 연결됨')
  })
  .catch(err => {
    console.log('MongoDB 연결 안됨', err)
  })

app.listen(port, () => {
  console.log(`${port} 포트에서 돌고있음`)
})
