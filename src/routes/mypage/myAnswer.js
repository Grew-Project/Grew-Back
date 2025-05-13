const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer')

router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query

    const answers = await Answer.find({ nickname })
      .select('-_id question_id content is_public created_at') // _id 제외
      .sort({ created_at: -1 })

    res.json(answers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '내 답변 조회 실패' })
  }
})

module.exports = router
