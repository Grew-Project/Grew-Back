const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  question_id: { type: Number, required: true }, 
  content: { type: String, required: true },
  is_public: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Answer', answerSchema)
