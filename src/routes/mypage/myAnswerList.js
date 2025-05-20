const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer')
const Question = require('../../models/Question')

router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query

    if (!nickname) {
      return res.status(400).json({ error: 'nickname이 필요합니다.' })
    }

    const answers = await Answer.find({ nickname })
      .select('-_id question_id is_public created_at') // 필요한 필드만 선택
      .sort({ created_at: -1 })

    // question_id를 기반으로 Question 컬렉션에서 content를 가져옴
    const results = await Promise.all(
      answers.map(async answer => {
        const question = await Question.findOne({ question_id: answer.question_id }).select(
          'content -_id'
        )
        return {
          question_id: answer.question_id,
          created_at: answer.created_at,
          question_content: question ? question.content : null, // question이 없으면 null
          is_public: answer.is_public,
        }
      })
    )

    res.json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '내 답변 조회 실패' })
  }
})

module.exports = router
