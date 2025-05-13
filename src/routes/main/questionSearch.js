const express = require('express')
const Question = require('../../models/Question.js')

const router = express.Router()
const validEmotions = ['Anger', 'Happiness', 'Love', 'Sadness', 'Confusion']

router.get('/', async (req, res) => {
  try {
    const { emotion_type, limit = 1 } = req.query

    if (!emotion_type || !validEmotions.includes(emotion_type)) {
      return res.status(400).json({ error: '올바른 emotion_type이 필요합니다.' })
    }

    const questions = await Question.aggregate([
      { $match: { emotion_type } },
      { $sample: { size: parseInt(limit) } },
    ])

    res.json(questions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '질문 조회 실패' })
  }
})

module.exports = router
