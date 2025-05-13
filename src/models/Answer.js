const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  nickname: String,
  question_id: Number,
  content: String,
  emotion_type: String,
  created_at: { type: Date, default: Date.now },
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
