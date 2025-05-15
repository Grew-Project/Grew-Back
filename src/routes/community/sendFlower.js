const express = require('express')
const router = express.Router()
const User = require('../../models/User.js')
const Flower = require('../../models/Flower.js')

router.post('/', async (req, res) => {
  try {
    const { receiver_nickname, sender_nickname } = req.body

    if (!receiver_nickname || !sender_nickname) {
      return res
        .status(400)
        .json({ message: 'receiver_nickname과 sender_nickname 모두 필요합니다.' })
    }

    // 오늘 자정 00:00:00
    const todayMidnight = new Date()
    todayMidnight.setHours(0, 0, 0, 0) // 오늘 자정으로 설정

    // 내일 자정 00:00:00
    const tomorrowMidnight = new Date(todayMidnight)
    tomorrowMidnight.setDate(todayMidnight.getDate() + 1)

    // 오늘 자정부터 내일 자정까지 보낸 기록이 있는지 확인
    const alreadySent = await Flower.findOne({
      receiver_nickname,
      sender_nickname,
      createdAt: { $gte: todayMidnight, $lt: tomorrowMidnight }, // 자정 기준
      flower_ok: true,
    })

    if (alreadySent) {
      return res.status(429).json({ message: '오늘 이미 응원꽃을 보냈습니다.' })
    }

    const updatedUser = await User.findOneAndUpdate(
      { nickname: receiver_nickname },
      { $inc: { flower_count: 1 } },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: '받는 유저를 찾을 수 없습니다.' })
    }

    const flowerDoc = await Flower.create({
      sender_nickname,
      receiver_nickname,
      flower_ok: true,
    })

    res.status(200).json({
      message: '응원꽃이 성공적으로 보내졌습니다.',
      nickname: updatedUser.nickname,
      flower_count: updatedUser.flower_count,
      flower_ok: flowerDoc.flower_ok,
    })
  } catch (error) {
    console.error('Error in sendFlower:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
