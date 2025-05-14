const express = require('express')
const router = express.Router()
const User = require('../../models/User.js')

router.post('/', async (req, res) => {
  try {
    const { nickname } = req.body

    if (!nickname) {
      return res.status(400).json({ message: 'nickname이 필요합니다.' })
    }
    
    const updatedUser = await User.findOneAndUpdate(
      { nickname },
      { $inc: { flower_count: 1 } },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: '해당 닉네임의 유저를 찾을 수 없습니다.' })
    }

    res.status(200).json({
      message: '응원꽃이 성공적으로 보내졌습니다.',
      nickname: updatedUser.nickname,
      flower_count: updatedUser.flower_count,
    })
  } catch (error) {
    console.error('Error in sendFlower:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
