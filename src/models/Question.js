const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question_id: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  emotion_type: { type: String, required: true },
})

module.exports = mongoose.model('Question', questionSchema)
