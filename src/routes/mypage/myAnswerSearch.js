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

    // Answer 컬렉션에서 데이터를 가져옴
    const answers = await Answer.find({ nickname })
      .select('-_id question_id is_public content created_at') // 필요한 필드만 선택
      .sort({ created_at: -1 })

    // Question 컬렉션에서 content와 emotion_type을 가져옴
    const results = await Promise.all(
      answers.map(async answer => {
        const question = await Question.findOne({ question_id: answer.question_id }).select(
          'content emotion_type -_id'
        )
        return {
          question_id: answer.question_id,
          created_at: answer.created_at,
          is_public: answer.is_public,
          emotion_type: question ? question.emotion_type : null, // emotion_type 추가
          question_content: question ? question.content : null, // content 추가
          answer_content: answer.content,
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
