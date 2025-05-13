const express = require('express')
const connectDB = require('./src/config/db')
const bodyParser = require('body-parser')
const routes = require('./src/routes')

require('dotenv').config()

const app = express()

connectDB()

app.use(bodyParser.json())
app.use('/api', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
