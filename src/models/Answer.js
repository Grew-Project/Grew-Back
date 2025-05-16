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

// pre-save 미들웨어로 answer_id 자동 증가
answerSchema.pre('save', async function (next) {
  if (!this.isNew) return next() // 새 문서가 아닌 경우 건너뜀

  try {
    // Counter 컬렉션에서 nickname별로 seq 값을 증가
    const counter = await Counter.findOneAndUpdate(
      { nickname: this.nickname }, // nickname별로 관리
      { $inc: { seq: 1 } }, // seq 값을 1 증가
      { new: true, upsert: true } // 없으면 생성
    )

    this.answer_id = counter.seq // 증가된 seq 값을 answer_id로 설정
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Answer', answerSchema)
