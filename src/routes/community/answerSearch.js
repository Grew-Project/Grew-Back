const express = require('express')
const Answer = require('../../models/Answer.js')
const router = express.Router()

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
      .select(
        'nickname question_id question_content answer_content is_public created_at emotion_type'
      )
      .sort({ created_at: -1 })
      .exec()

    if (answers.length === 0) {
      return res.status(404).json({ message: '해당 감정의 답변이 없습니다.' })
    }

    res.json(answers)
  } catch (error) {
    console.error('Error occurred:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
