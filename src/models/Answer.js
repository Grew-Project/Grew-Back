const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  question_id: { type: Number, required: true },
  question_content: { type: String, required: true },
  answer_content: { type: String, required: true },
  is_public: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  emotion_type: { type: String, required: true },
})

module.exports = mongoose.model('Answer', answerSchema)
