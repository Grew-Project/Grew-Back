const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const bodyParser = require('body-parser')
const routes = require('./src/routes')

require('dotenv').config()

const app = express()

connectDB()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(bodyParser.json())
app.use('/api', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('프로젝트 그루의 백엔드 서버입니다.')
})
