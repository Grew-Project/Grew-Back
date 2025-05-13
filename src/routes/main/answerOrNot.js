const express = require('express')
const Answer = require('../../models/Answer.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query // req.params 대신 req.query로 수정

    if (!nickname) {
      return res.status(400).json({ error: 'nickname이 필요합니다.' })
    }

    // 오늘 자정 (UTC 기준) 계산
    const now = new Date()
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

    console.log('오늘 자정 (UTC):', todayStart)

    // 오늘 자정 이후 작성된 답변이 있는지 확인
    const hasAnswered = await Answer.exists({
      nickname,
      created_at: { $gte: todayStart },
    })

    res.json({ answered: !!hasAnswered }) // true/false로 반환
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '답변 여부 확인 실패' })
  }
})

module.exports = router
