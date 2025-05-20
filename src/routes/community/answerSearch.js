const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer.js')
const Question = require('../../models/Question.js')

router.get('/', async (req, res) => {
  try {
    const { emotion } = req.query

    const validEmotions = ['Anger', 'Happiness', 'Love', 'Sadness', 'Confusion']
    if (emotion && !validEmotions.includes(emotion)) {
      return res.status(400).json({ message: '유효하지 않은 감정입니다.' })
    }

    let query = { is_public: true }
    if (emotion) {
      query.emotion_type = emotion
    }

    const answers = await Answer.find(query)
      .select('nickname question_id answer_content is_public created_at emotion_type')
      .sort({ created_at: -1 })
      .exec()

    if (answers.length === 0) {
      return res.status(404).json({ message: '해당 감정의 답변이 없습니다.' })
    }

    // 각 answer의 question_id를 기반으로 question_content 병합
    const enrichedAnswers = await Promise.all(
      answers.map(async answer => {
        const question = await Question.findOne({ question_id: answer.question_id })
        return {
          ...answer.toObject(),
          question_content: question ? question.question_content : '질문 내용을 찾을 수 없습니다.',
        }
      })
    )

    res.json(enrichedAnswers)
  } catch (error) {
    console.error('Error occurred:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
