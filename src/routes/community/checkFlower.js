const express = require('express')
const router = express.Router()
const Flower = require('../../models/Flower.js')

router.get('/', async (req, res) => {
  try {
    const { receiver_nickname, sender_nickname } = req.query

    if (!receiver_nickname || !sender_nickname) {
      return res.status(400).json({ message: '닉네임 정보가 필요합니다.' })
    }

    const todayMidnight = new Date()
    todayMidnight.setHours(0, 0, 0, 0)

    const tomorrowMidnight = new Date(todayMidnight)
    tomorrowMidnight.setDate(todayMidnight.getDate() + 1)

    const alreadySent = await Flower.findOne({
      receiver_nickname,
      sender_nickname,
      createdAt: { $gte: todayMidnight, $lt: tomorrowMidnight },
      flower_ok: true,
    })

    return res.status(200).json({
      alreadySent: !!alreadySent, // true/false 로 리턴
    })
  } catch (error) {
    console.error('Error in checkFlower:', error)
    res.status(500).json({ message: '서버 오류 발생', error: error.message })
  }
})

module.exports = router
