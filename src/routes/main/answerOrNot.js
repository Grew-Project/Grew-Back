const express = require('express')
const Answer = require('../../models/Answer.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query 

    if (!nickname) {
      return res.status(400).json({ error: 'nickname이 필요합니다.' })
    }

    const now = new Date()
    const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

    console.log('오늘 자정 (UTC):', todayStart)
 
    const hasAnswered = await Answer.exists({
      nickname,
      created_at: { $gte: todayStart },
    })

    res.json({ answered: !!hasAnswered }) 
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '답변 여부 확인 실패' })
  }
})

module.exports = router
