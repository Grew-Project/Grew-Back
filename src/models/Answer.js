const mongoose = require('mongoose')
const Counter = require('./Counter') // Counter 모델 추가

const answerSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  question_id: { type: Number, required: true },
  answer_content: { type: String, required: true },
  is_public: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  emotion_type: { type: String, required: true },
  answer_id: { type: Number }, // 자동 증가값
})

answerSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  try {
    const counter = await Counter.findOneAndUpdate(
      { nickname: this.nickname },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )

    this.answer_id = counter.seq
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Answer', answerSchema)
